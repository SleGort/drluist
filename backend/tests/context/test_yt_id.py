import pytest

from app.core.context.providers.youtube import extract_video_id


VALID_ID = "dQw4w9WgXcQ"  # 11 chars


@pytest.mark.parametrize(
    "url,expected",
    [
        # Standard watch URL
        (f"https://www.youtube.com/watch?v={VALID_ID}", VALID_ID),
        (f"http://www.youtube.com/watch?v={VALID_ID}", VALID_ID),

        # Watch URL with extra params
        (f"https://www.youtube.com/watch?v={VALID_ID}&t=42", VALID_ID),
        (f"https://www.youtube.com/watch?v={VALID_ID}&list=PL123&index=2", VALID_ID),
        (f"https://www.youtube.com/watch?v={VALID_ID}&feature=youtu.be", VALID_ID),

        # youtu.be short URL
        (f"https://youtu.be/{VALID_ID}", VALID_ID),
        (f"https://youtu.be/{VALID_ID}?t=10", VALID_ID),

        # Embed URL
        (f"https://www.youtube.com/embed/{VALID_ID}", VALID_ID),

        # Shorts URL
        (f"https://www.youtube.com/shorts/{VALID_ID}", VALID_ID),

        # v= not first query param
        (f"https://www.youtube.com/watch?time_continue=1&v={VALID_ID}", VALID_ID),

        # Mobile domain
        (f"https://m.youtube.com/watch?v={VALID_ID}", VALID_ID),

        # With trailing slash after id (some embeds)
        (f"https://www.youtube.com/embed/{VALID_ID}/", VALID_ID),
        
        # Long URL but with weird ordering of parameters
        (f"https://www.youtube.com/watch?feature=share&v={VALID_ID}", VALID_ID),

        # Full mobile YouTube watch URL
        (f"https://m.youtube.com/watch?v={VALID_ID}", VALID_ID),

        # Long URL with fragments (#)
        (f"https://www.youtube.com/watch?v={VALID_ID}#t=10", VALID_ID),

        # youtu.be with extra path segments (seen in social shares)
        (f"https://youtu.be/{VALID_ID}/?si=XYZ123", VALID_ID),
    ],
)
def test_extract_video_id_valid_urls(url: str, expected: str) -> None:
    assert extract_video_id(url) == expected


@pytest.mark.parametrize(
    "url",
    [
        "",  # empty
        "not a url",
        "https://www.google.com",
        "https://www.youtube.com/watch",  # missing v
        "https://www.youtube.com/watch?v=",  # empty v
        "https://youtu.be/",  # missing id
        "https://www.youtube.com/embed/",  # missing id
        "https://www.youtube.com/shorts/",  # missing id
        # Wrong-length IDs (YouTube video ids are typically 11 chars)
        "https://www.youtube.com/watch?v=too_short",
        "https://www.youtube.com/watch?v=waytoolong123456",
        # Non-YouTube domain containing v= pattern (should NOT match)
        "https://example.com/watch?v=dQw4w9WgXcQ",

        # Long YouTube base URL but missing the watch component
        "https://www.youtube.com/v=dQw4w9WgXcQ",

        # Random domain mimicking youtu.be
        "https://notyoutu.be/dQw4w9WgXcQ",

        # Long URL where v= exists but includes a non-allowed character
        "https://www.youtube.com/watch?v=dQw4w9WgXc#",

        # Long URL with ID but less than 11 chars in URL after url-encoding attempt
        "https://www.youtube.com/watch?v=dQw4w9WgXc%20",
    ],
)
def test_extract_video_id_invalid_urls_raise(url: str) -> None:
    with pytest.raises(ValueError):
        extract_video_id(url)