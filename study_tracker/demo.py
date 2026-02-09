import sys
import os

# Add parent directory to path so we can import study_tracker
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from study_tracker.db_manager import DBManager
from study_tracker.ai_reviewer import AIReviewer


def main():
    print("Initializing Study Tracker Demo...")

    # 1. Initialize DB
    db = DBManager("study_tracker/study_data.db")

    # 2. Add sample data (Simulating user input)
    print("Adding sample problems...")

    p1_id = db.add_problem(
        title="131. Palindrome Partitioning",
        category="Backtracking",
        link="https://leetcode.com/problems/palindrome-partitioning/",
        solution="def partition(self, s: str) -> List[List[str]]: ...",
        notes="Had trouble with the index handling in the recursive step.",
    )
    print(f"Added Problem ID {p1_id}: 131. Palindrome Partitioning")

    p2_id = db.add_problem(
        title="52. N-Queens II",
        category="Backtracking",
        link="https://leetcode.com/problems/n-queens-ii/",
        solution="def totalNQueens(self, n: int) -> int: ...",
        notes="Used a set to track columns and diagonals. Need to optimize space.",
    )
    print(f"Added Problem ID {p2_id}: 52. N-Queens II")

    # 3. Use AI Reviewer
    print("\n--- Generating Daily AI Review ---")
    reviewer = AIReviewer(db)
    prompt = reviewer.generate_daily_report_prompt()

    print("\nGenerated Prompt for AI:")
    print("-" * 40)
    print(prompt)
    print("-" * 40)

    # 4. Mock Output
    print("\n[Simulating AI Response...]")
    response = reviewer.mock_ai_response(prompt)
    print(response)


if __name__ == "__main__":
    main()
