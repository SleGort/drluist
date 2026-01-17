from youtube_transcript_api import YouTubeTranscriptApi
import re

def extract_video_id(youtube_url: str) -> str:
    """
    TODO:
    - Support common formats:
        - https://www.youtube.com/watch?v=VIDEO_ID
        - https://youtu.be/VIDEO_ID
    - Strip extra parameters (e.g., &t=123, &list=...)
    - Validate result:
        - If you cannot extract a plausible ID, raise ValueError with a clear message
    """
    
    pattern_long = r"https\://www\.youtube\.com/watch\?v=([A-Za-z0-9\-\_]{11})"
    pattern_short = r"youtu\.be/([A-Za-z0-9\-\_]{11})"
    
    match_long = re.search(pattern_long, youtube_url)
    match_short = re.search(pattern_short, youtube_url)
    
    long_url: bool = bool(match_long)
    short_url: bool = bool(match_short)
    
    # usually 11 characters
    if long_url:
        id = match_long.group(1)
    elif short_url:
        id = match_short.group(1)   
    else:
        raise ValueError("Can not find video id! Check the YT link.")
    
    return id


def fetch_transcript(video_id: str, languages: list[str]) -> list[dict]:
    """
    TODO:
    - Call youtube-transcript-api to fetch transcript for `video_id`
      with preferred `languages` (Dutch first, then fallback)
    - If transcript is unavailable/disabled/video not found:
        - raise ValueError (or a custom exception later) with a clear message
    - Return the raw transcript list of dicts (items contain at least "text")
    """
    ytt_api = YouTubeTranscriptApi()
    fetched_transcript = ytt_api.fetch(video_id, languages=[languages])


def transcript_to_text(transcript: list[dict]) -> str:
    """
    TODO:
    - Convert raw transcript (list of dicts) into one clean string:
        - concatenate item["text"] with spaces or newlines
        - remove extra whitespace
    - Return the cleaned transcript text
    """
    ...


def get_transcript(youtube_url: str, languages: list[str] | None = None) -> str:
    """
    TODO:
    - If languages is None, default to:
        ["nl", "nl-NL", "en"]
    - Extract video_id from youtube_url
    - Fetch transcript using language preference
    - Convert transcript to clean text
    - Return transcript text
    """
    ...


def main() -> None:
    """
    TODO:
    - Set a test YouTube URL (ideally a Dutch video with Dutch captions)
    - Call get_transcript(url)
    - Print the first ~500-1000 characters to verify:
        - transcript is returned
        - language looks correct
    """
    
    language = 'nl'
    
    video_url = "https://www.youtube.com/watch?v=Ir9QYpHeRAc" 
    video_id = extract_video_id(video_url)

    ytt_api = YouTubeTranscriptApi()
    fetched_transcript = ytt_api.fetch(video_id, languages=[languages])

    # is iterable
    for snippet in fetched_transcript:
        print(snippet.text)


if __name__ == "__main__":
    main()