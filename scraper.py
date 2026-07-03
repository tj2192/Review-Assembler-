from google_play_scraper import Sort, reviews

def fetch_reviews(app_id: str, lang: str = 'en', country: str = 'us', count: int = 100):
    """
    Fetches reviews for a given app ID from the Google Play Store.
    """
    result, continuation_token = reviews(
        app_id,
        lang=lang,
        country=country,
        sort=Sort.NEWEST,
        count=count
    )
    return result, continuation_token

def fetch_more_reviews(app_id: str, continuation_token):
    """
    Fetches more reviews using a continuation token.
    """
    result, new_continuation_token = reviews(
        app_id,
        continuation_token=continuation_token
    )
    return result, new_continuation_token
