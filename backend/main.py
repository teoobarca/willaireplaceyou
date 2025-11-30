import asyncio
import json
import re
import tempfile
import os
import subprocess
import traceback
from contextlib import asynccontextmanager
from typing import List, Dict, Any, Union, Literal, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator, ValidationError
import uvicorn
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent
from langchain.agents.structured_output import ProviderStrategy
from langchain_core.messages import SystemMessage, HumanMessage, BaseMessage
from prompts import (
    TASKS_DECOMPOSITION_SYSTEM_PROMPT, 
    TASKS_REPLACABILITY_SYSTEM_PROMPT,
    SKILLS_DECOMPOSITION_SYSTEM_PROMPT,
    SKILLS_REPLACABILITY_SYSTEM_PROMPT,
    SCENARIO_GENERATION_SYSTEM_PROMPT,
    CAREER_RECOMMENDATIONS_SYSTEM_PROMPT,
    ROADMAP_GENERATION_PROMPT
)

load_dotenv()

# --- Helper Functions for Content Blocks ---
def get_text_content(message: BaseMessage) -> str:
    """
    Extracts text content from a message using standard content blocks.
    """
    if hasattr(message, "content_blocks"):
        return "".join([content_block.get("text", "") for content_block in message.content_blocks if content_block.get("type") == "text"])
    return message.content if isinstance(message.content, str) else ""

# --- Local Validation Function using Mermaid CLI ---
async def validate_mermaid_code_local(code: str) -> tuple[bool, str]:
    """
    Validates Mermaid code using the locally installed Mermaid CLI (mmdc).
    Returns (is_valid, error_message).
    """
    code = code.strip()
    if not code:
        return False, "Code is empty."
    
    # Basic Structure Check
    if not code.startswith("flowchart TD"):
        return False, "Diagram must start strictly with 'flowchart TD'."
        
    if "```" in code:
        return False, "Code contains markdown fences (```). Please output ONLY the raw code."

    try:
        # Run mmdc with stdin input and stdout output to avoid temporary files
        process = await asyncio.create_subprocess_exec(
            "mmdc", "-i", "-", "-o", "-",
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        
        # Pass code via stdin
        stdout, stderr = await process.communicate(input=code.encode())
        
        if process.returncode == 0:
            return True, ""
        else:
            error_msg = stderr.decode().strip()
            return False, f"Mermaid Compiler Error:\n{error_msg}"

    except FileNotFoundError:
        return False, "Mermaid CLI (mmdc) not found. Please ensure it is installed globally via 'npm install -g @mermaid-js/mermaid-cli'."
    except Exception as e:
        return False, f"Unexpected error running validation: {str(e)}"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserProfile(BaseModel):
    age: str
    gender: str
    job_title: str
    job_description: str
    daily_routine: str
    location: str
    education: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "age": "25 rokov",
                    "gender": "muz",
                    "job_title": "psycholog",
                    "job_description": "Pomaham klientom s ich mentalnym stavom na zaklade medziludskej komunikacie.",
                    "daily_routine": "Skoro rano pridem do prace, citam si diar, pride klient, s ktorym prekonzultujem ich problemy, zanalyzujem ich situaciu, pinpointujem nihc zivotne problemy a postupne casom sa snazim ezlepsit ich mentalny stav",
                    "location": "kancelaria v Kosiciach",
                    "education": "univerzita komenskeho v Bratislave, psychologia"
                }
            ]
        }
    }

# Renamed models for clarity
class Task(BaseModel):
    task_name: str = Field(description="Name of the specific task performed in the job")
    time_share: float = Field(description="Fraction of total work time spent on this task (must verify all tasks sum to 1.0)")

class Skill(BaseModel):
    skill_name: str = Field(description="Name of the specific skill required for the job")
    importance: float = Field(description="Importance weight of this skill (must verify all skills sum to 1.0)")

class AutomationScore(BaseModel):
    score: float = Field(description="Automation score 0.0-1.0 (1.0 being fully automatable)")

class TaskDecomposition(BaseModel):
    tasks: List[Task] = Field(description="List of decomposed tasks that make up the job profile", min_length=3, max_length=20)

class SkillDecomposition(BaseModel):
    skills: List[Skill] = Field(description="List of decomposed skills that make up the job profile", min_length=3, max_length=15)

class FutureScenario(BaseModel):
    title: str = Field(description="Title of the scenario")
    description: str = Field(description="Description of how the job role evolves in this scenario")
    likelihood: Literal["low", "medium", "high"] = Field(description="Estimated likelihood: Low, Medium, High")

class FutureScenarios(BaseModel):
    scenarios: List[FutureScenario] = Field(description="List of 1 to 5 different future scenarios", min_length=1, max_length=5)

# --- New Models for Two-Step Process ---
class CareerOptionInitial(BaseModel):
    job_title: str = Field(description="Title of the recommended alternative career")
    reason: str = Field(description="Explanation of why this is a good fit")
    transferable_skills: List[str] = Field(description="List of skills the user already possesses that are relevant")
    new_skills_needed: List[str] = Field(description="List of new skills the user needs to acquire")
    ease_of_transition: Literal["Low", "Medium", "High"] = Field(description="Estimated difficulty of transitioning to this role")

class CareerRecommendationsInitial(BaseModel):
    recommendations: List[CareerOptionInitial] = Field(description="List of 3 to 5 recommended career options", min_length=3, max_length=5)

class CareerOption(CareerOptionInitial):
    roadmap: str = Field(description="Mermaid diagram code for a roadmap to approach this role")

class CareerRecommendations(BaseModel):
    recommendations: List[CareerOption] = Field(description="List of 3 to 5 recommended career options", min_length=3, max_length=5)
# ---------------------------------------

llm = ChatOpenAI(
    model="gpt-5.1",
    # temperature=1
)

async def generate_roadmap_with_local_loop(job_title: str, job_context: str) -> str:
    """
    Generates a Mermaid roadmap using a local validation loop (inspired by the Typst compiler workflow).
    """
    
    MAX_ATTEMPTS = 3
    
    # Initial conversation
    messages = [
        SystemMessage(content=ROADMAP_GENERATION_PROMPT),
        HumanMessage(content=f"Create a career roadmap for: {job_title}\nContext: {job_context}")
    ]
    
    for attempt in range(1, MAX_ATTEMPTS + 1):
        print(f"🔄 Attempt {attempt}/{MAX_ATTEMPTS} for {job_title}")
        
        # Invoke LLM
        response = await llm.ainvoke(messages, config={"run_name": f"RoadmapGen_Attempt_{attempt}"})
        content = get_text_content(response).strip()
        
        # --- CLEANUP: Handle JSON-wrapped output or fences ---
        mermaid_code = content
        
        # 1. Check if it's a JSON string (common artifact when models get confused about tools/formats)
        if content.startswith("{") and "mermaid_text" in content:
            try:
                data = json.loads(content)
                if "mermaid_text" in data:
                    mermaid_code = data["mermaid_text"]
            except json.JSONDecodeError:
                pass # Not valid JSON, proceed with raw content
        
        # 2. Check for markdown fences
        if "```" in mermaid_code:
            pattern = r"```(?:mermaid)?\n?(.*?)```"
            match = re.search(pattern, mermaid_code, re.DOTALL)
            if match:
                mermaid_code = match.group(1).strip()
        
        # Ensure we strip whitespace again
        mermaid_code = mermaid_code.strip()
        
        # Add the raw response to history so the LLM knows what it generated
        messages.append(response) 
        
        # Validate Locally using mmdc
        is_valid, error_msg = await validate_mermaid_code_local(mermaid_code)
        
        if is_valid:
            print(f"✅ Valid diagram generated for {job_title}")
            return mermaid_code
        else:
            print(f"❌ Failed attempt {attempt} for {job_title}: {error_msg}")
            # Feedback for next turn
            feedback_msg = (
                f"The Mermaid compiler raised an error on attempt {attempt}:\n\n"
                f"{error_msg}\n\n"
                "Please return the ENTIRE corrected Mermaid diagram code again. "
                "Ensure STRICT adherence to the syntax.\n"
                "DO NOT wrap the output in JSON. DO NOT wrap the output in markdown fences (```). Just return the raw code starting with 'flowchart TD'."
            )
            messages.append(HumanMessage(content=feedback_msg))
    
    print(f"⚠️ All attempts failed for {job_title}")
    return "flowchart TD\nA[Error] --> B[Could not generate valid diagram]"


async def evaluate_automation_potential(
    item: Union[Task, Skill], 
    job_context: str, 
    item_type: str, 
    semaphore: asyncio.Semaphore
) -> float:
    """
    Generic function to evaluate automation potential for either a Task or a Skill.
    """
    async with semaphore:
        llm_evaluator = ChatOpenAI(
            model="gpt-5.1",
            reasoning={
                "effort": "high"
            }
        )
        structured_llm = llm_evaluator.with_structured_output(AutomationScore)
        
        if item_type == "task":
            system_prompt = TASKS_REPLACABILITY_SYSTEM_PROMPT
            user_prompt = f"""
            Job Context: {job_context}
            
            Task to Analyze:
            Name: {item.task_name}
            Time Share: {item.time_share}
            
            Judge the automation potential of this specific task by AI in the future.
            """
        else: # skill
            system_prompt = SKILLS_REPLACABILITY_SYSTEM_PROMPT
            user_prompt = f"""
            Job Context: {job_context}
            
            Skill to Analyze:
            Name: {item.skill_name}
            Importance: {item.importance}
            
            Judge the automation potential of this specific skill by AI in the future.
            """
        
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=user_prompt)
        ]
        
        analysis = await structured_llm.ainvoke(messages, config={"run_name": f"{item_type.capitalize()}AutomationEvaluator"})
        return analysis.score


@app.post("/analyze")
async def analyze_profile(profile: UserProfile):
    job_context = f"""Age: {profile.age}
Gender: {profile.gender}
Job Title: {profile.job_title}
Job Description: {profile.job_description}
Daily Routine: {profile.daily_routine}
Location: {profile.location}
Education: {profile.education}"""

    # 1. Decomposition Agents (Parallel)
    agent_tasks = create_agent(
        llm,
        response_format=ProviderStrategy(TaskDecomposition),
        tools=[{"type": "web_search_preview"}]
    )
    
    agent_skills = create_agent(
        llm,
        response_format=ProviderStrategy(SkillDecomposition),
        tools=[{"type": "web_search_preview"}]
    )
    
    task_future = agent_tasks.ainvoke({
        "messages": [
            SystemMessage(content=TASKS_DECOMPOSITION_SYSTEM_PROMPT),
            HumanMessage(content=f"User Profile:\n{job_context}")
        ]
    }, config={"run_name": "TaskDecompositionAgent"})
    
    skill_future = agent_skills.ainvoke({
        "messages": [
            SystemMessage(content=SKILLS_DECOMPOSITION_SYSTEM_PROMPT),
            HumanMessage(content=f"User Profile:\n{job_context}")
        ]
    }, config={"run_name": "SkillDecompositionAgent"})
    
    try:
        result_tasks, result_skills = await asyncio.gather(task_future, skill_future)
        
        tasks: List[Task] = result_tasks["structured_response"].tasks
        skills: List[Skill] = result_skills["structured_response"].skills
    except (ValidationError, Exception) as e:
        print(f"Validation Error during extraction: {e}")
        raise HTTPException(
            status_code=400,
            detail={
                "error_code": "INVALID_INPUT_CONTENT",
                "message": "Could not extract meaningful tasks or skills from the provided input. Please ensure the job description and routine are detailed and relevant."
            }
        )
    
    # 2. Automation Analysis (Parallel)
    semaphore = asyncio.Semaphore(10)
    
    # We gather scores directly instead of creating Analyzed objects
    task_scores_future = asyncio.gather(*[
        evaluate_automation_potential(task, job_context, "task", semaphore) 
        for task in tasks
    ])
    
    skill_scores_future = asyncio.gather(*[
        evaluate_automation_potential(skill, job_context, "skill", semaphore) 
        for skill in skills
    ])
    
    task_scores_list, skill_scores_list = await asyncio.gather(task_scores_future, skill_scores_future)
    
    # 3. Calculate Results
    
    # Tasks
    task_automation_breakdown = {}
    total_task_automation = 0.0
    
    for task, score in zip(tasks, task_scores_list):
        weighted_val = task.time_share * score
        task_automation_breakdown[task.task_name] = {
            "score": score,
            "weighted_score": weighted_val,
            "time_share": task.time_share
        }
        total_task_automation += weighted_val

    # Skills
    skill_automation_breakdown = {}
    total_skill_automation = 0.0
    
    for skill, score in zip(skills, skill_scores_list):
        weighted_val = skill.importance * score
        skill_automation_breakdown[skill.skill_name] = {
            "score": score,
            "weighted_score": weighted_val,
            "importance": skill.importance
        }
        total_skill_automation += weighted_val
    
    weighted_final_score = (total_task_automation * 0.4) + (total_skill_automation * 0.6)
    
    # 4. Generate Future Scenarios & Career Recommendations (Concurrent)
    
    # Prepare detailed data for generation
    analysis_summary = {
        "job_context": job_context,
        "tasks_analysis": task_automation_breakdown,
        "skills_analysis": skill_automation_breakdown,
        "total_automation_score": weighted_final_score
    }
    analysis_summary_json = json.dumps(analysis_summary, indent=2)
    
    # Scenario Agent
    agent_scenarios = create_agent(
        llm,
        response_format=ProviderStrategy(FutureScenarios),
        tools=[{"type": "web_search_preview"}]
    )
    
    # Career Recommendation Agent (Initial - No Roadmap)
    agent_careers_initial = create_agent(
        llm,
        response_format=ProviderStrategy(CareerRecommendationsInitial),
        tools=[{"type": "web_search_preview"}]
    )
    
    # Launch scenarios and initial careers concurrently
    scenarios_future = agent_scenarios.ainvoke({
        "messages": [
            SystemMessage(content=SCENARIO_GENERATION_SYSTEM_PROMPT),
            HumanMessage(content=f"Full Job Analysis Data:\n{analysis_summary_json}")
        ]
    }, config={"run_name": "FutureScenariosAgent"})
    
    careers_initial_future = agent_careers_initial.ainvoke({
        "messages": [
            SystemMessage(content=CAREER_RECOMMENDATIONS_SYSTEM_PROMPT),
            HumanMessage(content=f"Full Job Analysis Data:\n{analysis_summary_json}")
        ]
    }, config={"run_name": "CareerRecommendationsAgent"})
    
    result_scenarios, result_careers_initial = await asyncio.gather(scenarios_future, careers_initial_future)
    
    initial_recommendations: List[CareerOptionInitial] = result_careers_initial["structured_response"].recommendations
    
    # 5. Generate Roadmaps for each recommendation (Sequential or Parallel)
    # We'll do parallel for speed
    
    async def process_career_option(option: CareerOptionInitial) -> CareerOption:
        # Use the new local loop based function with mmdc
        roadmap_code = await generate_roadmap_with_local_loop(option.job_title, job_context)
        return CareerOption(
            **option.model_dump(),
            roadmap=roadmap_code
        )

    final_recommendations = await asyncio.gather(*[
        process_career_option(opt) for opt in initial_recommendations
    ])
    
    return {
        "task_automation_breakdown": task_automation_breakdown,
        "total_task_automation": total_task_automation,
        "skill_automation_breakdown": skill_automation_breakdown,
        "total_skill_automation": total_skill_automation,
        "weighted_final_score": weighted_final_score,
        "future_scenarios": result_scenarios["structured_response"].scenarios,
        "career_recommendations": final_recommendations
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
