import pytest
from pydantic import ValidationError

from app.assessment_model import Assessment


def _valid_payload():
    return {
        "metrics": {
            "coverage": 0.8,
            "semantic_acc": 0.7,
            "relevance": 0.9,
            "completeness": 0.6,
            "clarity": 0.85,
        },
        "details": {
            "good_points": [
                "Captured the main topic correctly.",
                "Included key supporting detail.",
                "Response remained on topic.",
            ],
            "improvement_points": [
                "Add one more concrete detail.",
                "Avoid broad paraphrases.",
                "Clarify one ambiguous phrase.",
            ],
            "grammar_score": "B1",
            "grammar_text": "Main issue is subject-verb agreement. This appears repeatedly in your text. Apply the rule consistently in singular subjects.",
            "grammar_feedback": {
                "common_error": "Frequent subject-verb agreement errors in present tense.",
                "mistake_examples": [
                    '"He go to school every day."',
                    '"She have a new idea."',
                ],
                "rule_with_example": "Rule: In present simple, third-person singular takes -s. Example: 'He goes to school every day.'",
            },
        },
    }


def test_assessment_model_accepts_structured_grammar_feedback():
    payload = _valid_payload()
    model = Assessment.model_validate(payload)

    assert model.details.grammar_feedback.common_error
    assert len(model.details.grammar_feedback.mistake_examples) == 2


def test_assessment_model_rejects_invalid_grammar_score():
    payload = _valid_payload()
    payload["details"]["grammar_score"] = "B3"

    with pytest.raises(ValidationError):
        Assessment.model_validate(payload)


def test_assessment_model_rejects_too_many_mistake_examples():
    payload = _valid_payload()
    payload["details"]["grammar_feedback"]["mistake_examples"] = [
        '"Example 1"',
        '"Example 2"',
        '"Example 3"',
        '"Example 4"',
        '"Example 5"',
    ]

    with pytest.raises(ValidationError):
        Assessment.model_validate(payload)


def test_assessment_model_accepts_language_mismatch_fallback_structure():
    payload = _valid_payload()
    payload["details"]["grammar_score"] = "0"
    payload["details"]["grammar_text"] = "Grammar assessment is conducted only when your summary is in the transcript language."
    payload["details"]["grammar_feedback"] = {
        "common_error": "Grammar assessment unavailable due to language mismatch.",
        "mistake_examples": [],
        "rule_with_example": "Provide your response in the transcript language to receive grammar feedback.",
    }

    model = Assessment.model_validate(payload)
    assert model.details.grammar_feedback.mistake_examples == []
