# definitions for fast api and main entry point for the app requests
from pydantic import BaseModel, Field

from app.assessment_model import Assessment
from app.context import build_context
from app.assessment import compute_results
from app.youtube import extract_video_id

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import os
from dotenv import load_dotenv

class AssessRequest(BaseModel):
    url: str
    target_language: str
    user_input: str = Field(min_length=1, max_length=3000)

class AssessResponse(BaseModel):
    overall_score: float
    assessment: Assessment
    
class VideoIDRequest(BaseModel):
    url: str

app = FastAPI()

load_dotenv()
frontend_origin = os.getenv("FRONTEND_ORIGIN")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/healthz")
def health():
    return {"status": "ok"}

@app.post("/assess", response_model=AssessResponse)
def post_assess(payload: AssessRequest):
    try:
        context_text = build_context(payload.url, payload.target_language)
        overall_score, assessment = compute_results(context_text, payload.user_input)
        return {"overall_score": overall_score, "assessment": assessment}

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Assessment failed.")
    


@app.post("/video_id")
def post_video_id(payload: VideoIDRequest):
    try:
        video_id = extract_video_id(payload.url)
        return {"video_id": video_id}

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Request for video ID failed.")
