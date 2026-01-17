from youtube_transcript_api import YouTubeTranscriptApi
from urllib import parse
import re

def extract_video_id(youtube_url: str) -> str:
    """
    Extract a YouTube video ID from common URL formats:
    - https://www.youtube.com/watch?v=VIDEO_ID
    - https://youtu.be/VIDEO_ID
    - https://www.youtube.com/embed/VIDEO_ID
    - https://www.youtube.com/shorts/VIDEO_ID

    Raises ValueError if no plausible video ID can be found.
    """
    
    if not youtube_url or not isinstance(youtube_url, str):
        raise ValueError("No ID found")

    parsed = parse.urlparse(youtube_url)
    host = (parsed.netloc or "").lower()
    path = parsed.path or ""

    # Accept common YouTube hosts (keep strict to avoid example.com/watch?v=...)
    allowed_hosts = {
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "youtu.be",
        "www.youtu.be",
    }
    if host not in allowed_hosts:
        raise ValueError("No ID found")

    def _validate(video_id: str) -> str:
        if re.fullmatch(r"[A-Za-z0-9_-]{11}", video_id):
            return video_id
        raise ValueError("No ID found")

    # 1) Long URLs: /watch?v=...
    if host in {"youtube.com", "www.youtube.com", "m.youtube.com"}:
        qs = parse.parse_qs(parsed.query)
        v = qs.get("v", [None])[0]
        if v:
            return _validate(v)

        # 2) Path-based formats: /embed/ID, /shorts/ID
        parts = [p for p in path.split("/") if p]
        if len(parts) >= 2 and parts[0] in {"embed", "shorts"}:
            return _validate(parts[1])

    # 3) Short URLs: youtu.be/ID
    if host in {"youtu.be", "www.youtu.be"}:
        parts = [p for p in path.split("/") if p]
        if parts:
            return _validate(parts[0])

    raise ValueError("No ID found")


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
    print(video_id)


if __name__ == "__main__":
    main()