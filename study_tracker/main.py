from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.staticfiles import StaticFiles
from typing import List
from datetime import date
from schemas import Problem, ProblemCreate, AIReviewRequest
from db_manager import DBManager
from ai_reviewer import AIReviewer

from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

app = FastAPI(title="Coding Study Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Authentication Configuration ---
ADMIN_USER = "admin"
ADMIN_PASS = "@Leeburn"
FAKE_TOKEN = "secret-token-for-leeburn"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_current_user(token: str = Depends(oauth2_scheme)):
    if token != FAKE_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return "admin"


@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username == ADMIN_USER and form_data.password == ADMIN_PASS:
        return {"access_token": FAKE_TOKEN, "token_type": "bearer"}
    raise HTTPException(status_code=400, detail="Incorrect username or password")


# ------------------------------------


# Dependency
def get_db():
    return DBManager()


# Dependency
def get_ai_reviewer():
    return AIReviewer()


@app.post("/problems/", response_model=Problem)
def create_problem(
    problem: ProblemCreate,
    db: DBManager = Depends(get_db),
    user: str = Depends(get_current_user),
):
    """
    Create a new problem record.
    """
    problem_id = db.add_problem(
        title=problem.title,
        category=problem.category,
        link=str(problem.link) if problem.link else None,
        solution=problem.solution,
        explanation=problem.explanation,
        notes=problem.notes,
    )

    # Fetch back the created problem to return it specifically
    # Efficiently we could just construct the object, but let's query to be safe
    # But dbManager.get_all_problems is inefficient for this.
    # For now, let's mock the return object or rely on a new get_problem method.
    # Since we didn't add get_problem(id), let's just return what we have with the ID.

    return {
        **problem.dict(),
        "id": problem_id,
        "created_at": date.today(),  # approximate
    }


@app.get("/problems/", response_model=List[Problem])
def list_problems(
    date_filter: str = None,
    db: DBManager = Depends(get_db),
    user: str = Depends(get_current_user),
):
    """
    Get all problems, optionally filtered by date (YYYY-MM-DD).
    """
    if date_filter:
        return db.get_problems_by_date(date_filter)
    return db.get_all_problems()


@app.post("/review/", response_model=str)
def generate_review(
    request: AIReviewRequest,
    db: DBManager = Depends(get_db),
    ai: AIReviewer = Depends(get_ai_reviewer),
    user: str = Depends(get_current_user),
):
    """
    Generate an AI review for a specific date.
    """
    target_date = request.date_str or date.today().strftime("%Y-%m-%d")
    problems = db.get_problems_by_date(target_date)

    if not problems:
        raise HTTPException(
            status_code=404, detail=f"No problems found for {target_date}"
        )

    prompt = ai.generate_prompt_from_problems(problems, target_date)
    response = ai.mock_ai_response(prompt)
    return response


# Mount static files
import os

static_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")
app.mount("/static", StaticFiles(directory=static_path), name="static")


@app.get("/")
def read_root():
    # Redirect to the static index page
    from fastapi.responses import FileResponse

    return FileResponse(os.path.join(static_path, "index.html"))
