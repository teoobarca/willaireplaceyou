## Inspiration
The anxiety surrounding AI replacing jobs is palpable, but often paralyzed by a lack of data. We wanted to flip the narrative from panic to preparation. We realized that the question "Will AI replace me?" is too broad. The real question is: "Which *parts* of my job will AI replace, and what can I do about it?" We were inspired to build a tool that acts not as a crystal ball of doom, but as a strategic compass for the future of work.

## What it does
**willaireplace.you** is a career resilience engine.
1.  **Analyzes:** Users enter their profession.
2.  **Decomposes:** Our agentic workflow breaks the role down into its atomic tasks and skills.
3.  **Evaluates:** It assesses each task against the current capabilities of SOTA AI models.
4.  **Strategizes:** It calculates a granular "Automation Risk Score" and, most importantly, generates a personalized "Survival Strategy"—a roadmap of high-value, human-centric skills to learn to become irreplaceable.

## How we built it
We built **willaireplace.you** with a focus on speed, intelligence, and a premium user experience.
*   **The Brain (Backend):** Python 3.11+ and **FastAPI** power the API. We used **LangChain** and **LangGraph** to orchestrate complex, multi-step agent workflows. **OpenAI GPT-5.1** serves as the core intelligence for reasoning and task decomposition.
*   **The Face (Frontend):** **Next.js 16** and **React 19** for a cutting-edge, reactive UI. We used **Tailwind CSS 4** for rapid styling and **Framer Motion** + **OGL** to create a cinematic, immersive experience that feels like it belongs in the future.

## Challenges we ran into
*   **Balancing "Doom" and "Hope":** It was a challenge to design the UX so that a high risk score didn't feel discouraging, but rather empowering. We iterated on the copy and visual feedback to focus on *actionability*.
*   **Agent Orchestration:** Getting the agents to consistently break down jobs into meaningful, granular tasks (without hallucinating) required significant prompt engineering and strict validation loops in our LangGraph workflow.
*   **Latency vs. Experience:** Deep analysis takes time. We had to design the UI to keep the user engaged with fluid animations and status updates while the backend crunched the numbers.

## Accomplishments that we're proud of
*   **The "Wow" Factor:** We achieved a visual aesthetic that feels genuinely premium and "sci-fi" without being clichéd.
*   **Granularity of Analysis:** We're proud that the tool doesn't just give a generic "90% chance" but explains *why* specific tasks are at risk.
*   **Cutting-Edge Stack:** Successfully deploying a project with Next.js 16 and Tailwind 4 (alpha/beta versions) was a risk that paid off in performance and developer experience.

## What we learned
*   **AI replaces tasks, not jobs:** This nuance is key to understanding the future economy.
*   **Human-in-the-loop is vital:** Even with advanced agents, the final strategy needs to feel human and empathetic.
*   **LangGraph is powerful:** It allowed us to build cyclic, stateful workflows that were impossible with simple chains.

## What's next for willaireplace.you
*   **Resume Integration:** Allowing users to upload their CV for a hyper-personalized gap analysis.
*   **Course Integration:** Partnering with learning platforms to link directly to courses for the recommended skills.
*   **Enterprise Dashboard:** A version for companies to analyze the AI-resilience of their entire workforce and plan training budgets accordingly.
