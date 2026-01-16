import requests

def request_socialkit_transcript(url, key):
    # TODO implement a function that calls SocialKit and prints the raw JSON
    
    response = requests.get(f'https://api.socialkit.dev/youtube/transcript?access_key={key}&url={url}')
    print(response.text)
    ...
    
def main():
    test_url = "https://www.youtube.com/watch?v=Ir9QYpHeRAc&t=2s"
    result = request_socialkit_transcript(test_url)
    print(result)
    
if __name__ == "__main__":
    main()