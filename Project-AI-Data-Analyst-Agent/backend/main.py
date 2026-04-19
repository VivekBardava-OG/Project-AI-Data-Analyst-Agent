from fastapi import FastAPI, UploadFile, File
import pandas as pd
import numpy as np
import requests

app = FastAPI()

API_KEY = "YOUR_OPENROUTER_KEY"

def get_ai_insights(summary):
    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    prompt = f"""
    Analyze this dataset summary and give insights:
    {summary}
    """

    data = {
        "model": "mistralai/mistral-7b-instruct",
        "messages": [{"role": "user", "content": prompt}]
    }

    res = requests.post(url, headers=headers, json=data)

    return res.json()["choices"][0]["message"]["content"]

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)

    summary = df.describe().to_string()

    insights = get_ai_insights(summary)

    return {
        "columns": list(df.columns),
        "rows": len(df),
        "insights": insights
    }