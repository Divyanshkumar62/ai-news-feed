# Testing the AI Update Awareness System

This document provides testing instructions for the AI Update Awareness System.

## Backend Testing

1.  **Set Environment Variables:**
    *   Ensure that `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set in the `.env` file in the `backend` directory.

2.  **Run the Backend:**
    *   Start the backend server using `npm start` or `npm run dev` from the `backend` directory.

3.  **Test API Endpoints:**
    *   Use a tool like `curl`, Postman, or Insomnia to send HTTP requests to your backend endpoints.
    *   `GET /api/articles`: This endpoint should return all articles from the Supabase database.

        ```bash
        curl http://localhost:3000/api/articles
        ```
    *   `GET /api/articles/most-popular`: This endpoint should return the most popular articles, sorted by popularity.

        ```bash
        curl http://localhost:3000/api/articles/most-popular
        ```
    *   `GET /api/articles/most-shared`: This endpoint should return the most shared articles, sorted by share count.

        ```bash
        curl http://localhost:3000/api/articles/most-shared
        ```
    *   `POST /api/fetch-now`: This endpoint should trigger the crawler to fetch new articles from the RSS feeds and save them to the Supabase database. Check the backend console logs to confirm that the crawler is running and articles are being inserted.

        ```bash
        curl -X POST http://localhost:3000/api/fetch-now
        ```
    *   `POST /api/clear-database`: This endpoint should clear all articles from the Supabase database. Be cautious when using this endpoint.

        ```bash
        curl -X POST http://localhost:3000/api/clear-database
        ```
    *   `POST /api/articles/:id/increment-view-count`: This endpoint should increment the view count for a specific article. Replace `:id` with the actual article ID.

        ```bash
        curl -X POST http://localhost:3000/api/articles/1/increment-view-count
        ```
    *   `POST /api/articles/:id/increment-share-count`: This endpoint should increment the share count for a specific article. Replace `:id` with the actual article ID.

        ```bash
        curl -X POST http://localhost:3000/api/articles/1/increment-share-count
        ```

4.  **Check Supabase Database:**
    *   After performing these tests, verify that the data in your Supabase database has been updated correctly.

## Frontend Testing

1.  **Check if the development server is running:**
    *   Make sure the frontend development server is running without errors. Check the console output for any error messages.

2.  **Access the frontend in your browser:**
    *   Open your browser and navigate to the URL where the frontend is running (usually `http://localhost:5173`).

3.  **Check if the UI is displaying correctly:**
    *   Make sure the UI is displaying correctly without any broken elements or styling issues.

4.  **Check if the articles are being displayed:**
    *   If there are articles in the database, they should be displayed in the UI.
    *   If there are no articles, the "No news available" message should be displayed.

5.  **Test the filter bar:**
    *   Try using the date picker and category dropdown to filter the articles. (Note: filtering won't work fully until the backend is implemented)

## Ensuring Functionality

*   **Check for Errors:** Monitor both frontend and backend consoles for errors.
*   **Basic Data Flow:** Ensure data is being fetched from the backend to the frontend.
*   **Cron and API:** Verify that the cron job runs and API calls are successful.
