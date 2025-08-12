# Backend for AI Update Awareness System

## Setup

1.  Install dependencies: `npm install`
2.  Create a `.env` file with the following variables:

    ```
    PORT=3000
    # Add API keys for fallback summarization if needed
    ```
3.  Run the backend: `npm start` or `npm run dev` for development mode

## API Endpoints

*   `GET /api/articles`: List articles with optional filters (date, category)
*   `POST /api/fetch-now`: Trigger manual fetch and summarization (admin only)

## Cron Job

The backend uses `node-cron` to schedule news fetching and summarization every 6 hours.

## Database

The MVP uses SQLite. The database file will be created automatically when the server starts.

## Docker (Optional)

1.  Build the Docker image: `docker build -t backend .`
2.  Run the Docker container: `docker run -p 3000:3000 backend`