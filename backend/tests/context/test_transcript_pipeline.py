import pytest

from app.core.context.providers.youtube import get_transcript


def test_get_transcript_english_known_video():
    url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    text = get_transcript(url, languages=["en"])

    assert isinstance(text, str)
    assert len(text) > 100


def test_get_transcript_dutch_video():
    # NOS Journaal clip (Dutch, usually auto-generated)
    url = "https://www.youtube.com/watch?v=Ir9QYpHeRAc"
    text = get_transcript(url, languages=["nl", "nl-NL"])

    assert isinstance(text, str)
    assert len(text) > 100


def test_get_transcript_german_video():
    # Deutsche Welle German video
    url = "https://www.youtube.com/watch?v=zfLHTsPhBO0"
    text = get_transcript(url, languages=["de", "de-DE"])

    assert isinstance(text, str)
    assert len(text) > 100


def test_get_transcript_french_video():
    # France 24 French video
    url = "https://www.youtube.com/watch?v=X1BEiUeE53c"
    text = get_transcript(url, languages=["fr", "fr-FR"])

    assert isinstance(text, str)
    assert len(text) > 100


def test_get_transcript_explicit_content_check():
    """
    Explicit semantic sanity check:
    Rick Astley lyrics are extremely stable.
    """
    url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    text = get_transcript(url, languages=["en"]).lower()

    assert "never gonna give you up" in text


def test_get_transcript_invalid_url_raises():
    with pytest.raises(ValueError):
        get_transcript("https://example.com/watch?v=dQw4w9WgXcQ", languages=["en"])


def test_get_transcript_unavailable_language_raises():
    url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

    with pytest.raises(ValueError):
        get_transcript(url, languages=["xx-XX"])
        
def test_get_transcript_video_unavailable():
    # Previously used link, now unavailable
    url = "https://www.youtube.com/watch?v=H0xZ8pWZzXg"

    with pytest.raises(ValueError, match="Video unavailable"):
        get_transcript(url, languages=["fr", "fr-FR"])