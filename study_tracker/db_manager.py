import sqlite3
import datetime
import os


class DBManager:
    def __init__(self, db_path=None):
        if db_path is None:
            # sensitive to where this file is
            self.db_path = os.path.join(
                os.path.dirname(os.path.abspath(__file__)), "study_data.db"
            )
        else:
            self.db_path = db_path
        self._init_db()

    def _init_db(self):
        """Initialize the database schema if it doesn't exist."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS problems (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                category TEXT,
                link TEXT,
                solution TEXT,
                explanation TEXT,
                notes TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                image BLOB
            )
        """
        )
        conn.commit()
        conn.close()

    def add_problem(
        self, title, category, link, solution, explanation="", notes="", image=None
    ):
        """Add a new problem record."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        current_time = datetime.datetime.now()

        cursor.execute(
            """
            INSERT INTO problems (title, category, link, solution, explanation, notes, created_at, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
            (title, category, link, solution, explanation, notes, current_time, image),
        )

        conn.commit()
        last_row_id = cursor.lastrowid
        conn.close()
        return last_row_id

    def get_problems_by_date(self, date_str=None):
        """
        Get problems for a specific date (YYYY-MM-DD).
        Defaults to today if not provided.
        """
        if date_str is None:
            date_str = datetime.date.today().strftime("%Y-%m-%d")

        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row  # To access columns by name
        cursor = conn.cursor()

        # Filter where created_at string starts with the date_str
        cursor.execute(
            """
            SELECT * FROM problems 
            WHERE date(created_at) = ?
        """,
            (date_str,),
        )

        rows = cursor.fetchall()
        problems = [dict(row) for row in rows]
        conn.close()
        return problems

    def get_all_problems(self):
        """Get all stored problems."""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM problems ORDER BY created_at DESC")
        rows = cursor.fetchall()
        problems = [dict(row) for row in rows]
        conn.close()
        return problems
