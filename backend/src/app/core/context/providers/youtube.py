from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import NoTranscriptFound, VideoUnavailable
from urllib import parse
import re

def extract_video_id(youtube_url: str) -> str:
    """
    Extracts a YouTube video ID from common URL formats.

    Supported formats
    -----------------
    - https://www.youtube.com/watch?v=VIDEO_ID
    - https://youtu.be/VIDEO_ID
    - https://www.youtube.com/embed/VIDEO_ID
    - https://www.youtube.com/shorts/VIDEO_ID

    Parameters
    ----------
    youtube_url : str
        The YouTube URL from which to extract the video ID.

    Returns
    -------
    str
        The extracted 11-character YouTube video ID.

    Raises
    ------
    ValueError
        Raised if no plausible video ID can be found in the provided URL.
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
    Fetches the manually created transcript, reverts to auto-generated transcript 
    if the manual is unavailable

    Parameters
    ----------
    video_id : str
        String of video id
    languages : list[str]
        A list of languages to be used

    Returns
    -------
    list[dict]
        FetchedTranscript object

    Raises
    ------
    ValueError
        Raises an error if no transcript is available.
    """
    
    # Get a list of available transcripts
    
    ytt = YouTubeTranscriptApi()
    try: 
        transcript_list = ytt.list(video_id)
    except VideoUnavailable:
        raise ValueError("Video unavailable")
    # Try to find a manually created one
    try:
        transcript = transcript_list.find_manually_created_transcript(languages)
    # If that fails try to find auto generated one in the same language
    except NoTranscriptFound:
        # Try auto-generated
        try:
            transcript = transcript_list.find_generated_transcript(languages)
        except NoTranscriptFound:
            # Both manual AND auto-generated transcripts failed
            raise ValueError("Transcript unavailable for the given video ID and languages.")

    return transcript.fetch()

def transcript_to_text(transcript):
    
    text =[]
    for snippet in transcript:
        text.append(snippet.text)
    full_text = " ".join(text)
    return full_text
    
    


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
    if languages is None:
        languages = ["nl", "nl-NL","en-US", "en"]
        
    video_id = extract_video_id(youtube_url)
    
    transcript = fetch_transcript(video_id, languages)
    
    context = transcript_to_text(transcript)
    
    return context

def main() -> None:
    """
    TODO:
    - Set a test YouTube URL (ideally a Dutch video with Dutch captions)
    - Call get_transcript(url)
    - Print the first ~500-1000 characters to verify:
        - transcript is returned
        - language looks correct
    """
    # de-DE, fr-FR, nl-Nl, en-US, de, fr, nl, en
    language = ['nl-NL', 'nl', 'en']
    
    video_url = "https://www.youtube.com/watch?v=Ir9QYpHeRAc" 
    auto_subtitles = "https://www.youtube.com/watch?v=XZ1nymJClQc"
    short_vid = "https://www.youtube.com/watch?v=m1cbmZhuxMM&list=PL9sr-h7F8RHol58xIFLN6-cQzoO8aj2E0&index=11"
    
    video_id = extract_video_id(video_url)
    
    transcript = fetch_transcript(video_id, language)
    
    context = transcript_to_text(transcript=transcript)
    print(context)
    
    # formatter = JSONFormatter()
    # json_formatted = formatter.format_transcript(transcript)
    
    # print(json_formatted)
    


if __name__ == "__main__":
    main()