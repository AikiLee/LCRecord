# Use official lightweight Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies (needed for compiling some python libs)
# For slim images sometimes we need build-essential, but for fastapi/uvicorn usually standard is ok.
# If pydantic-core fails, we might need rust, but standard wheels usually exist for linux/amd64.

# Copy requirements first to leverage cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
# We copy the 'study_tracker' directory into '/app/study_tracker'
COPY . /app/study_tracker

# Expose port
EXPOSE 8000

# Command to run the application
# Note: We run from /app, and module is study_tracker.main
CMD ["uvicorn", "study_tracker.main:app", "--host", "0.0.0.0", "--port", "8000"]
