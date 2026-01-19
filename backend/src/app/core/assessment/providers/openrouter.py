# here we will pass the built contex to the LLM model
"""
OpenRouter Provider

TODO:
1) Define a single public function:
   call_llm(prompt: str, model: str) -> str
   - Returns ONLY the assistant text content.
   - No business logic here.

2) Read API key from environment:
   - OPENROUTER_API_KEY
   - If missing, raise ValueError with a clear message.

3) Implement HTTP call (requests):
   - POST to OpenRouter chat completions endpoint
   - Send prompt as a user message
   - Include model parameter
   - Set timeout (important)

4) Handle errors robustly:
   - Non-200 response -> raise ValueError with status code + brief response text
   - Network errors/timeouts -> raise ValueError("OpenRouter request failed: ...")

5) Keep provider isolated:
   - NO scoring logic here
   - NO parsing user bullets here
   - Just “prompt in -> text out”

6) Add a minimal `main()`:
   - hardcode a tiny prompt
   - print first 200 chars of response
   - guarded by if __name__ == "__main__"
"""