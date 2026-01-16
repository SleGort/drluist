import requests
import os
from dotenv import load_dotenv

def request_socialkit_transcript(url, key):
    # TODO implement a function that calls SocialKit and prints the raw JSON
    
    response = requests.get(f'https://api.socialkit.dev/youtube/transcript?access_key={key}&url={url}')
    print(response.text)
    ...
    
def main():
    test_url = "https://www.youtube.com/watch?v=Ir9QYpHeRAc&t=2s"
    load_dotenv()
    access_key = os.getenv("SOCIALKIT_API_KEY")
    
    if not access_key:
        raise RuntimeError("SOCIALKIT_API_KEY is not set!")
    
    result = request_socialkit_transcript(test_url, access_key)
    print(result)
    
if __name__ == "__main__":
    main()