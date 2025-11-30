<div align="center">
  <a href="https://willaireplace.you/">
    <img src="assets/banner.png" alt="willaireplace.you Banner" style="border-radius: 15px; width: 70%;" />
  </a>
</div>

<br />

<div align="center">

  **The future demands preparation, not panic.**

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
  [![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688.svg)](https://fastapi.tiangolo.com/)

</div>

## 📖 About The Project

[**willaireplace.you**](https://willaireplace.you) is your career compass for the future of work. In an age where job markets shift in months and skills become obsolete overnight, we provide clarity and strategy.

By leveraging state-of-the-art Large Language Models (LLMs) and complex agentic workflows, we decompose job roles into their fundamental atomic units—tasks and skills—to provide a granular automation risk assessment.

**We help you navigate the transition from "Will AI replace me?" to "How can I become unreplaceable?"**

### Key Features

*   **🔍 Real Analysis of Your Position**: Instant analysis of how AI will impact your specific profession by 2030.
*   **🤖 Task Breakdown & AI Potential**: Our engine breaks down your role into tasks and evaluates current AI capabilities against them.
*   **🔮 Future Scenarios**: Discover your career's future with best, worst, and most likely case scenarios.
*   **🧭 Strategic Upskilling**: Receive a personalized roadmap with risk scores and actionable recommendations to future-proof your career.

---

## 🛠️ Tech Stack

Built with a modern, high-performance stack designed for scalability, real-time analysis, and a premium user experience.

### Backend
*   **Python 3.11+**: Core logic and data processing.
*   **FastAPI**: High-performance async web framework.
*   **LangChain & LangGraph**: Orchestration of complex AI agent workflows.
*   **OpenAI GPT-5.1**: The underlying intelligence engine.

### Frontend
*   **Next.js 16**: React framework for production-grade applications.
*   **React 19**: Leveraging the latest React features.
*   **Tailwind CSS 4**: Utility-first CSS framework for rapid, modern UI development.
*   **Framer Motion**: Production-ready motion library for immersive animations.
*   **OGL**: Minimal WebGL library for stunning visual effects.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   **Python 3.11** or higher
*   **Node.js 18** or higher
*   **Poetry** (Python dependency management)
*   **npm** or **yarn**

### Installation

#### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
poetry install
```

Create a `.env` file in the `backend` directory and add your API keys:

```env
OPENAI_API_KEY=your_api_key_here
```

Start the development server:

```bash
poetry run python main.py
```
The backend API will be available at `http://localhost:8000`.

#### 2. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

---

## 💡 Usage

1.  Open the application at `http://localhost:3000`.
2.  **Enter Your Profession**: Type in your current job title.
3.  **AI Analysis Engine**: Watch as our agents decompose your role.
4.  **Get Your Strategy**: Review your Automation Score and explore your personalized upskilling roadmap.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
