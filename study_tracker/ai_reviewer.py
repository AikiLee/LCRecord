import datetime
from typing import List, Dict


class AIReviewer:
    """
    Service for generating AI reviews.
    State is minimal, but we keep it as a class for potential future configuration.
    """

    def __init__(self):
        pass

    def generate_prompt_from_problems(self, problems: List[Dict], date_str: str) -> str:
        """
        Pure function to generate prompt from a list of problem dictionaries.
        """
        if not problems:
            return f"No problems found for date: {date_str}. No review generation possible."

        prompt = f"Here is a summary of the coding problems I studied on {date_str}. Please review them and provide a learning assessment.\n\n"

        for p in problems:
            # Helper to safely access keys whether p is a dict or an object (like sqlite3.Row)
            title = p["title"] if isinstance(p, dict) else p.title
            category = p["category"] if isinstance(p, dict) else p.category
            link = p["link"] if isinstance(p, dict) else p.link
            notes = p["notes"] if isinstance(p, dict) else p.notes

            prompt += f"--- Problem: {title} ---\n"
            prompt += f"Category: {category}\n"
            prompt += f"Link: {link}\n"
            if notes:
                prompt += f"My Notes: {notes}\n"
            prompt += "\n"

        prompt += """
Based on the above, please provide:
1. A summary of the key concepts covered today.
2. Identification of any potential gaps based on the categories or my notes.
3. Recommendations for what I should review next or related topics to explore.
"""
        return prompt

    def mock_ai_response(self, prompt: str) -> str:
        """
        Simulates an AI response.
        """
        count = prompt.count("--- Problem:")
        return f"""
[AI Assistant Simulation]
Based on your study log:
You covered {count} problems today.
Analysis: Good variety of topics.
Suggestion: Continue practicing similar patterns to reinforce memory.
        """
