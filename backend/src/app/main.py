# definitions for fast api and main entry point for the app requests
from pydantic import BaseModel, Field
from app.assessment_model import Assessment

from fastapi import FastAPI, HTTPException
from app.context import build_context
from app.assessment import compute_results

class AssessRequest(BaseModel):
    url: str
    target_language: str
    user_input: str = Field(min_length=1, max_length=3000)

class AssessResponse(BaseModel):
    overall_score: float
    assessment: Assessment

app = FastAPI()

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
