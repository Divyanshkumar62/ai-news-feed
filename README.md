# AI Update Awareness System

## Description

This project is an MVP for an AI Update Awareness System that fetches the latest AI-related news, summarizes it, and displays it in a web app.

## Project Structure

```
feed-updates/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── sources.js
│   │   ├── controllers/
│   │   │   └── articleController.js
│   │   ├── models/
│   │   │   └── articleModel.js
│   │   ├── routes/
│   │   │   └── articleRoutes.js
│   │   ├── services/
│   │   │   ├── crawlerService.js
│   │   │   ├── summarizationService.js
│   │   │   └── databaseService.js
│   │   ├── utils/
│   │   │   └── errorHandler.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NewsCard.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   │   └── vite.svg
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Instructions

1.  Clone the repository.
2.  Navigate to the `backend` folder and follow the instructions in `backend/README.md` to set up the backend.
3.  Navigate to the `frontend` folder and follow the instructions in `frontend/README.md` to set up the frontend.

## Next Steps

*   Implement the missing TODOs in the code.
*   Set up a database (SQLite for MVP, PostgreSQL for production).
*   Implement local summarization using Ollama.
*   Implement API fallback for summarization.
*   Deploy the backend to Railway.app or Render.com.
*   Deploy the frontend to Vercel.