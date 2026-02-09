# Coding Study Tracker API

A FastAPI-based application to track coding problems and generate AI reviews.

## Prerequisites

- **uv**: The project uses `uv` for dependency management.

## Setup & Run

1. Navigate to the `study_tracker` directory.

2. Run the server:

    ```bash
    uv run uvicorn study_tracker.main:app --reload
    ```

## API Documentation

Once running, open your browser to:

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

## Endpoints

- `POST /problems/`: Add a new problem.
- `GET /problems/`: List all problems (supports `?date_filter=YYYY-MM-DD`).
- `POST /review/`: Generate an AI review for the day's problems.
