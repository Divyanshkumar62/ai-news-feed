# Testing the AI Update Awareness System

This document provides basic testing instructions for the AI Update Awareness System.

## Backend Testing

1.  **Check if the server is running:**

    - Make sure the backend server is running without errors. Check the console output for any error messages.

2.  **Test the API endpoints:**

    - Use a tool like `curl` or Postman to test the API endpoints.
    - `GET /api/articles`: This endpoint should return a list of articles (even if it's an empty list initially).

      ```bash
      curl http://localhost:3000/api/articles
      ```

    - `POST /api/fetch-now`: This endpoint should trigger a manual fetch and summarization. Check the backend logs to see if the fetching and summarization process is running.

      ```bash
      curl -X POST http://localhost:3000/api/fetch-now
      ```

3.  **Check the cron job:**

    - Check the backend logs to see if the cron job is running periodically (every 6 hours by default).
    - After the cron job runs, check if new articles have been added to the database.

## Frontend Testing

1.  **Check if the development server is running:**

    - Make sure the frontend development server is running without errors. Check the console output for any error messages.

2.  **Access the frontend in your browser:**

    - Open your browser and navigate to the URL where the frontend is running (usually `http://localhost:5173`).

3.  **Check if the UI is displaying correctly:**

    - Make sure the UI is displaying correctly without any broken elements or styling issues.

4.  **Check if the articles are being displayed:**

    - If there are articles in the database, they should be displayed in the UI.
    - If there are no articles, the "No news available" message should be displayed.

5.  **Test the filter bar:**

    - Try using the date picker and category dropdown to filter the articles. (Note: filtering won't work fully until the backend is implemented)

## Ensuring Functionality

- **Check for Errors**: Monitor both frontend and backend consoles for errors.
- **Basic Data Flow**: Ensure data is being fetched from the backend to the frontend.
- **Cron and API**: Verify that the cron job runs and API calls are successful.
