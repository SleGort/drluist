# Entry point for building the context from a URL

from .youtube import get_transcript
def build_context(url: str, target_language: str):
    
    if not target_language:
        target_language = ['en-US', 'en']
    else:
        target_language = target_language.strip().upper()
        if target_language == 'NL':
            target_language = ['nl-NL', 'nl']
        elif target_language == 'FR':
            target_language = ['fr-FR', 'fr']
        elif target_language == 'DE':
            target_language = ['de-DE', 'de']
        elif target_language == 'EN':
            target_language = ['en-US', 'en']
        else:
            target_language = ['en-US', 'en']
        
    response = get_transcript(url, target_language)
    return response