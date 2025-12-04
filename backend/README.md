# Projekt 3 – Backend

FastAPI + MongoDB backend that exposes a minimal REST API used by the dashboard frontend.

## Requirements

- Python 3.11+
- MongoDB Atlas cluster (or a local MongoDB instance)

## Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

Create a `.env` file (or provide real env vars) with:

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.example.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=projekt3
MONGODB_COLLECTION=entries
CORS_ALLOW_ORIGINS=http://localhost:5173
```

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

## API

- `GET /api/data` – returns the latest dashboard entries
- `POST /api/data` – stores a new entry
- `GET /health` – health probe

