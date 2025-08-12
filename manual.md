# Manual Setup for AI Update Awareness System

This document provides step-by-step instructions to set up and run the AI Update Awareness System.

## Prerequisites

*   Node.js (v16 or later)
*   npm or yarn
*   Ollama (for local summarization - optional)
*   SQLite

## Backend Setup

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3.  **Set up the database:**

    *   The application uses SQLite for the MVP. The database file will be created automatically when the server starts.
    *   To create the database manually or migrate to another database like PostgreSQL, you will need to install `sqlite3` (or the appropriate database driver) and run migrations.  This is beyond the scope of the basic manual.

4.  **Configure environment variables:**

    *   Create a `.env` file in the `backend` directory.
    *   Add the following environment variables to the `.env` file:

        ```
        PORT=3000
        # API key for fallback summarization (e.g., Groq API)
        GROQ_API_KEY=<YOUR_GROQ_API_KEY>
        ```

5.  **Start the backend server:**

    ```bash
    npm start
    ```

    or

    ```bash
    yarn start
    ```

    or for development:

    ```bash
    npm run dev
    ```

    or

    ```bash
    yarn dev
    ```

    The server will start listening on port 3000 (or the port specified in your `.env` file).

## Frontend Setup

1.  **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3.  **Configure environment variables (if needed):**

    *   Create a `.env` file in the `frontend` directory if you need to configure any frontend-specific environment variables (e.g., API endpoint).  For the basic setup, this might not be required.

4.  **Start the frontend development server:**

    ```bash
    npm run dev
    ```

    or

    ```bash
    yarn dev
    ```

    The development server will start, and you can access the frontend in your browser (usually at `http://localhost:5173`).

## Other Actions

*   **Ollama Setup (Optional):**
    *   If you want to use local summarization, you need to install Ollama and download a model (e.g., LLaMA 3). Refer to the Ollama documentation for installation instructions.
    *   Configure the backend to use Ollama for summarization (update `summarizationService.js`).
*   **Cron Job:**
    *   The backend uses `node-cron` to schedule news fetching and summarization. Make sure the cron job is running correctly.  You can check the backend logs to see if the job is being executed.
*   **API Keys:**
    *   If you are using an API fallback for summarization, make sure to obtain the necessary API keys and configure them in the `.env` file.

## .env-example

```
PORT=3000
GROQ_API_KEY=
```

## Docker (Optional)

1.  Build the Docker image: `docker build -t backend .`
2.  Run the Docker container: `docker run -p 3000:3000 backend`