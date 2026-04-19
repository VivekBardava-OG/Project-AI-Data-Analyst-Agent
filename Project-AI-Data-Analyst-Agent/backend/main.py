from fastapi import FastAPI, UploadFile, File
import pandas as pd
import numpy as np
import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

app = FastAPI()

def get_ai_insights(summary):
    try:
        url = "https://openrouter.ai/api/v1/chat/completions"

        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",  # optional but recommended
            "X-Title": "AI Data Analyst"
        }

        data = {
            "model": "nvidia/nemotron-3-super-120b-a12b:free",
            "messages": [
                {
                    "role": "user",
                    "content": f"""
                    You are a professional data analyst.

                    Analyze the dataset and return:

                    ### Key Insights\n- ...
                    - Bullet points

                    ### Patterns
                    - Bullet points

                    ### Recommendations
                    - Bullet points

                    Keep it:
                    - Very short
                    - Easy to read
                    - No long paragraphs

                    Dataset:
                    {summary}
                    """
                }
            ]
        }

        res = requests.post(url, headers=headers, json=data)

        if res.status_code != 200:
            return f"AI Error: {res.text}"

        response_json = res.json()

        return response_json["choices"][0]["message"]["content"]

    except Exception as e:
        return f"AI failed: {str(e)}"
    
@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)

    summary = df.describe().to_string()

    basic_insights = generate_basic_insights(df)
    ai_insights = get_ai_insights(summary)

    return {
        "columns": list(df.columns),
        "rows": len(df),
        "basic_insights": basic_insights,
        "ai_insights": ai_insights
    }

def generate_basic_insights(df):
    insights = []

    if df.isnull().sum().sum() > 0:
        insights.append("Dataset contains missing values.")

    numeric_cols = df.select_dtypes(include='number').columns

    for col in numeric_cols:
        if df[col].std() > df[col].mean():
            insights.append(f"{col} has high variation.")

    return insights