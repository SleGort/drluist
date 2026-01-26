from pydantic import BaseModel, Field

class Metrics(BaseModel):
    coverage: float = Field(ge=0, le=1)
    semantic_acc: float = Field(ge=0, le=1)
    relevance: float = Field(ge=0, le=1)
    completeness: float = Field(ge=0, le=1)
    clarity: float = Field(ge=0, le=1)
    
class Details(BaseModel):
    good_points: list[str] = Field(min_length=3, max_length=3)
    improvement_points: list[str] = Field(min_length=3, max_length=3)
    grammar_score: str = Field(pattern=r"^(0|A1|A2|B1|B2|C1|C2)$") # CEFR level (A1-C2, as a string).
    grammar_text: str # 3-4 sentence explanation in 'grammar_text'for the provided score.

class Assessment(BaseModel):
    metrics: Metrics
    details: Details 
    
