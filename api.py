import os
import json
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai

app = FastAPI()

# Allow CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.environ.get("GEMINI_API_KEY", "YOUR_API_KEY_HERE")
client = genai.Client(api_key=API_KEY)

class QueryRequest(BaseModel):
    query: str

@app.post("/api/analyze")
def analyze(req: QueryRequest):
    # Read the scraped CSV data
    try:
        df = pd.read_csv("spotify_reviews.csv")
        # We sample the first 200 reviews to fit into context nicely for this prototype
        sample_reviews = df['content'].dropna().head(200).tolist()
    except Exception as e:
        print(f"Error reading CSV: {e}")
        sample_reviews = ["I love spotify", "The discovery is broken, keeps playing same songs."]

    context = "\n".join(f"- {r}" for r in sample_reviews)

    prompt = f"""
    You are an expert AI research assistant analyzing Spotify app reviews for a product team.
    The researcher is asking the following query: "{req.query}"
    
    Here is a sample of recent app reviews extracted from our crawler:
    {context}
    
    Based ONLY on these reviews and the query, analyze the data and generate a JSON response with the following exact structure:
    {{
      "themes": [
        {{
          "id": 1,
          "title": "Theme title answering the query",
          "frequency": "XX%",
          "count": 1234,
          "sentiment": "Negative/Positive/Mixed",
          "trend": "+X% in 30d",
          "trendDirection": "up/down/flat",
          "segment": "Affected user segments",
          "why": "Detailed explanation of why this happens based on the reviews",
          "evidence": [
             {{ "quote": "Exact quote from the reviews provided above", "source": "App Store" }}
          ]
        }}
      ],
      "segments": [
        {{
          "name": "Segment name (e.g. Passive Listener)",
          "goal": "What they are trying to achieve",
          "problem": "Their main frustration",
          "challenge": "Their core need"
        }}
      ],
      "opportunities": [
        {{
          "id": 1,
          "title": "Opportunity title",
          "signal": "Signal from data",
          "need": "User need",
          "direction": "Possible product direction",
          "risk": "Potential risk"
        }}
      ]
    }}
    
    Return ONLY valid JSON. Do not include markdown code blocks like ```json. Make sure the insights are highly relevant to the query "{req.query}".
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config={"temperature": 0.2}
        )
        
        text = response.text.strip()
        # Clean up any potential markdown formatting the LLM might still include
        if text.startswith("```json"):
            text = text[7:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
            
        return json.loads(text.strip())
        
    except Exception as e:
        print(f"Error calling LLM: {e}")
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
