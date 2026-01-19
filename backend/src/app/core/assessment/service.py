from app.core.context.service import build_context
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()

client = OpenAI()

system_prompt = """
You are an objective and supportive language teacher specializing in evaluating listening skills. Begin with a concise checklist (3-7 bullets) outlining your assessment steps before performing the evaluation. 
Assess a student's performance based on a transcript of an online video and the student's written submission. All feedback must be in English.

Inputs:
- The first input is the video's transcript (may be auto- or manually-generated and could contain inconsistencies or errors). Always use this input for context and inference.
- The second input is the user's written submission (can be bullet points or continuous text).

Assess the user's listening skills along these metrics:
1. Content coverage: Did the learner capture the key ideas?
2. Semantic accuracy: Did the learner understand the ideas correctly?
3. Relevance: Is the response focused on main points rather than trivial details?
4. Completeness: Are important points missing?
5. Clarity: Is the meaning understandable despite errors?

Output Format:
Produce a single Python dictionary with these top-level keys, in this order: 'vector', 'further_details', 'grammar_score', 'grammar_text'. Follow all value and quoting requirements below.

- 'vector': Generate a dictionary of weights (float values between 0 and 1, inclusive, with up to three decimal places) for each metric using the keys: 'coverage', 'seman_acc', 'relev', 'complet', 'clar'. Example:
{'coverage': 0.234, 'seman_acc': 0.123, 'relev': 0.454, 'complet': 0.67, 'clar': 1.0}
- 'further_details': List 3 concise observations about what the user did well under 'good', and 3 suggestions for improvement under 'improve'. Always place verbatim user phrases in double quotes inside single-quoted list elements.
- 'grammar_score' and 'grammar_text':
  * If input languages differ, output: {'grammar_score': '0'} and {'grammar_text': 'Grammar assessment is conducted for the same language as video transcript.'}
  * If languages match, assign a CEFR level (A1-C2, as a string) to 'grammar_score' and provide a 3-4 sentence explanation in 'grammar_text', always including double-quoted verbatim user phrases within single-quoted strings.

Language Handling:
If the input language differs from the transcript language, translate the user's summary to the transcript language for assessment, but keep all feedback in English (except direct user quotes). If languages differ, explicitly encourage improved use of the target language.

Error Handling:
If either the video transcript ('context_input') or the user submission ('user_input') is missing, immediately return:
{'error': 'Input missing: [context_input and/or user_input]'}

Strict Quoting and Formatting:
- All dictionary values and keys must be single-quoted. When quoting user phrases, use double quotes inside the single-quoted string.
- Preserve the defined output structure and key order. Do not output any information outside the specified dictionary format.

After completing your assessment, validate that your output strictly matches the required Python dictionary structure and quoting rules. If not, self-correct before returning the result.
"""

def assess_listening_skill(context, user_input, system_prompt):
    if context and user_input and system_prompt:
        response = client.responses.create(
        model="gpt-5-mini",
        instructions= system_prompt,
        input=[
            {"role": "user", "content": f"TRANSCRIPT CONTEXT:\n{context}"},
            {"role": "user", "content": f"STUDENT INPUT:\n{user_input}"},
            ]
        )
        return response.output_text
    
    raise ValueError('One of the inputs missing. Check context, system prompt, and user input.')

    
def main():
    target_language = "nl "
    context = build_context("https://www.youtube.com/watch?v=Ir9QYpHeRAc",target_language=target_language)
    user_input = """
    1. Deze aflevering Arjen zoekt naar een nieuwe hobby
    2. Hij probeert om hard te lopen, vogels te kijken, en ging naar de football wedstrijd, maar hij vond alles niet super leuk
    3. Nu boetseert hij een miniatuurtje van klei, en probeert hij ook een groter ramenbowl te maken.
    4. Op het einde, word het zijn nieuwe hobby niet, en hij moet nieuwe dingen vinden om uit te proberen. 
    """
    assesment_json = assess_listening_skill(context, user_input, system_prompt)
    print(assesment_json)
    return None
    
if __name__ == "__main__":
    main()