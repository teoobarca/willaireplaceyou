FROM python:3.11-slim

# Install system dependencies including nodejs and npm for mermaid-cli
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    git \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    libcairo2 \
    && rm -rf /var/lib/apt/lists/*

# Install mermaid-cli globally
# We need a puppeteer config to run in docker without sandbox
RUN npm install -g @mermaid-js/mermaid-cli

# Create a puppeteer config file
RUN echo '{"args": ["--no-sandbox", "--disable-setuid-sandbox"]}' > /puppeteer-config.json

# Install poetry
RUN pip install poetry

WORKDIR /app

# Copy poetry files
COPY pyproject.toml poetry.lock ./

# Install python dependencies
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "8"]
