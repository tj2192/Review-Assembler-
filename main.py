import scraper
import pandas as pd
import logging
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def main():
    app_id = "com.spotify.music"
    target_count = 100
    
    logging.info(f"Initializing Spotify Review Crawler for app: {app_id}")
    
    try:
        logging.info(f"Fetching up to {target_count} reviews...")
        reviews, continuation_token = scraper.fetch_reviews(app_id, count=target_count)
        
        logging.info(f"Successfully fetched {len(reviews)} reviews.")
        
        if reviews:
            df = pd.DataFrame(reviews)
            csv_filename = "spotify_reviews.csv"
            df.to_csv(csv_filename, index=False)
            logging.info(f"Saved reviews to {csv_filename}")
        else:
            logging.warning("No reviews found.")
            
    except Exception as e:
        logging.error(f"An error occurred while fetching/saving reviews: {e}")

if __name__ == "__main__":
    main()
