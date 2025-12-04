# Projekt 3 – Frontend

React + Vite dashboard that communicates with the FastAPI backend.

## Setup

```bash
cd frontend
npm install
cp env.example .env.local # edit API url if needed
npm run dev
```

The app expects the backend to run on `http://localhost:8000/api`. Adjust `VITE_API_BASE_URL` otherwise.

## Features

- Tailwind CSS styling with glassmorphism-inspired UI
- Axios client with error handling + refresh polling
- Realtime stats cards, interactive chart (Chart.js) and table view
- Form to post new data points straight to MongoDB via the API
