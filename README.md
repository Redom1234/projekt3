# Projekt 3 – Fullstack Dashboard

Fullstack-exempel som visar kommunikationen mellan en FastAPI-backend, MongoDB Atlas och en React/Tailwind-dashboard.

## 1. Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env   # redigera dina MongoDB-uppgifter
uvicorn app.main:app --reload --port 8001
```

Endpoints:

- `GET /api/data` – hämtar alla poster
- `POST /api/data` – skapar ny post
- `GET /health` – enkel status

## 2. Frontend

```bash
cd frontend
npm install
cp env.example .env.local
npm run dev
```

Frontend använder Chart.js för trender, Tailwind för UI och Axios för API-anrop. Miljövariabeln `VITE_API_BASE_URL` pekar mot backend (`http://localhost:8000/api` som standard).

## 3. Database

Importera exempeldatan:

```bash
cd database
mongoimport --uri "$MONGODB_URI" --db projekt3 --collection entries --file seed_data.json --jsonArray
```

## Testflöde

1. Starta backend (`uvicorn ...`).
2. Starta frontend (`npm run dev`).
3. Öppna http://localhost:5173, lägg till data via formuläret.
4. Verifiera i Postman eller `fetch` att `GET /api/data` uppdateras.

## Fler idéer

- Lägg till JWT-autentisering (t.ex. `fastapi-jwt-auth` eller `PyJWT`).
- Bygg filter/sök i frontend.
- Schemalägg bakgrundsjobb för automatiska dataposter.
