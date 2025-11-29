import asyncio
from typing import List, Dict, Any
from fastapi import FastAPI
from pydantic import BaseModel, Field
import uvicorn
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent
from langchain.agents.structured_output import ProviderStrategy
from dotenv import load_dotenv
from prompts import (
    TASKS_DECOMPOSITION_SYSTEM_PROMPT, 
    TASKS_REPLACABILITY_SYSTEM_PROMPT,
    SKILLS_DECOMPOSITION_SYSTEM_PROMPT,
    SKILLS_REPLACABILITY_SYSTEM_PROMPT
)

load_dotenv()

app = FastAPI()

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

class JobTask(BaseModel):
    task_name: str = Field(description="Name of the specific task performed in the job")
    time_share: float = Field(description="Fraction of total work time spent on this task (must verify all tasks sum to 1.0)")

class JobSkill(BaseModel):
    skill_name: str = Field(description="Name of the specific skill required for the job")
    importance: float = Field(description="Importance weight of this skill (must verify all skills sum to 1.0)")

class ReplacabilityAnalysis(BaseModel):
    score: float = Field(description="Automation score 0.0-1.0 (1.0 being fully automatable)")

class AnalyzedJobTask(JobTask):
    replacability: ReplacabilityAnalysis

class AnalyzedJobSkill(JobSkill):
    replacability: ReplacabilityAnalysis

class JobDecomposition(BaseModel):
    tasks: List[JobTask] = Field(description="List of decomposed tasks that make up the job profile", min_length=3, max_length=20)

class JobSkillsDecomposition(BaseModel):
    skills: List[JobSkill] = Field(description="List of decomposed skills that make up the job profile", min_length=3, max_length=15)

class FinalJobAnalysis(BaseModel):
    tasks: List[AnalyzedJobTask]
    skills: List[AnalyzedJobSkill]

llm = ChatOpenAI(
    model="gpt-5.1",
    # temperature=1
)

async def analyze_task_replacability(task: JobTask, job_context: str, semaphore: asyncio.Semaphore) -> AnalyzedJobTask:
    async with semaphore:
        llm_task = ChatOpenAI(
            model="gpt-5.1",
            reasoning={
                "effort": "high"
            }
        )
        structured_llm = llm_task.with_structured_output(ReplacabilityAnalysis)
        
        prompt = f"""
        Job Context: {job_context}
        
        Task to Analyze:
        Name: {task.task_name}
        Time Share: {task.time_share}
        
        Judge the automation potential of this specific task by AI in the future.
        """
        
        messages = [
            ("system", TASKS_REPLACABILITY_SYSTEM_PROMPT),
            ("human", prompt)
        ]
        
        analysis = await structured_llm.ainvoke(messages)
        
        return AnalyzedJobTask(
            **task.model_dump(),
            replacability=analysis
        )

async def analyze_skill_replacability(skill: JobSkill, job_context: str, semaphore: asyncio.Semaphore) -> AnalyzedJobSkill:
    async with semaphore:
        llm_skill = ChatOpenAI(
            model="gpt-5.1",
            reasoning={
                "effort": "high"
            }
        )
        structured_llm = llm_skill.with_structured_output(ReplacabilityAnalysis)
        
        prompt = f"""
        Job Context: {job_context}
        
        Skill to Analyze:
        Name: {skill.skill_name}
        Importance: {skill.importance}
        
        Judge the automation potential of this specific skill by AI in the future.
        """
        
        messages = [
            ("system", SKILLS_REPLACABILITY_SYSTEM_PROMPT),
            ("human", prompt)
        ]
        
        analysis = await structured_llm.ainvoke(messages)
        
        return AnalyzedJobSkill(
            **skill.model_dump(),
            replacability=analysis
        )

@app.post("/analyze")
async def analyze_profile(profile: UserProfile):
    # 1. Job Decomposition (Tasks)
    agent_tasks = create_agent(
        llm,
        response_format=ProviderStrategy(JobDecomposition),
        tools=[{"type": "web_search_preview"}]
    )
    
    job_context = f"""Age: {profile.age}
Gender: {profile.gender}
Job Title: {profile.job_title}
Job Description: {profile.job_description}
Daily Routine: {profile.daily_routine}
Location: {profile.location}
Education: {profile.education}"""
    
    conversation_tasks = [
        ("system", TASKS_DECOMPOSITION_SYSTEM_PROMPT),
        ("human", f"User Profile:\n{job_context}")
    ]
    
    # 2. Job Decomposition (Skills) - Run in parallel with Task Decomposition ideally, but agents might need separate calls.
    # We can use asyncio.gather for the agent calls too if we want.
    
    agent_skills = create_agent(
        llm,
        response_format=ProviderStrategy(JobSkillsDecomposition),
        tools=[{"type": "web_search_preview"}]
    )
    
    conversation_skills = [
        ("system", SKILLS_DECOMPOSITION_SYSTEM_PROMPT),
        ("human", f"User Profile:\n{job_context}")
    ]

    # Run decompositions in parallel
    task_future = agent_tasks.ainvoke({"messages": conversation_tasks})
    skill_future = agent_skills.ainvoke({"messages": conversation_skills})
    
    result_tasks, result_skills = await asyncio.gather(task_future, skill_future)
    
    tasks = result_tasks["structured_response"].tasks
    skills = result_skills["structured_response"].skills
    
    # 3. Analyze Replacability (Tasks & Skills)
    semaphore = asyncio.Semaphore(10) # Increased semaphore for both lists
    
    analyzed_tasks_future = asyncio.gather(*[
        analyze_task_replacability(task, job_context, semaphore) 
        for task in tasks
    ])
    
    analyzed_skills_future = asyncio.gather(*[
        analyze_skill_replacability(skill, job_context, semaphore) 
        for skill in skills
    ])
    
    analyzed_tasks, analyzed_skills = await asyncio.gather(analyzed_tasks_future, analyzed_skills_future)
    
    # 4. Calculate Scores
    
    # Tasks Calculation
    replacibility_score_tasks = 0
    replacibility_array_tasks = {}
    for analyzed_task in analyzed_tasks:
        score = analyzed_task.time_share * analyzed_task.replacability.score
        replacibility_array_tasks[analyzed_task.task_name] = score
        replacibility_score_tasks += score

    # Skills Calculation
    replacibility_score_skills = 0
    replacibility_array_skills = {}
    for analyzed_skill in analyzed_skills:
        score = analyzed_skill.importance * analyzed_skill.replacability.score
        replacibility_array_skills[analyzed_skill.skill_name] = score
        replacibility_score_skills += score
        
        
    weighted_replacibility_score = replacibility_score_tasks * 0.4 + replacibility_score_skills * 0.6
    
    return {
        "replacibility_array_tasks": replacibility_array_tasks,
        "replacibility_score_tasks": replacibility_score_tasks,
        "replacibility_array_skills": replacibility_array_skills,
        "replacibility_score_skills": replacibility_score_skills
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
