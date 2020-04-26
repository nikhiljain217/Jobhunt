import re
import tweepy
import yfinance as yf
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import unicodedata

class Sentiment:

	def __init__(self, data=None):
		self.data = data

	def process_Tweets(self):
		self.pro_data = []

		for body in self.data:
			body = re.sub("[^ a-zA-Z0-9]", "", body)
			self.pro_data.append(body)

	def compute_Sentiment(self):
		analyzer = SentimentIntensityAnalyzer()
		sentiment = {}
		sentiment['Values'] = []

		for ind in range(len(self.pro_data)):
			text = unicodedata.normalize('NFKD', self.pro_data[ind])
			text_sentiment = analyzer.polarity_scores(text)

			sentiment['Values'].append({
				'positive': text_sentiment['pos'],
				'negative': text_sentiment['neg'],
				'neutral': text_sentiment['neu']
				})

		self.sentiment = sentiment

	def driver(self):
		self.process_Tweets()
		self.compute_Sentiment()

		return(self.sentiment)


# if __name__ == "__main__":
# 	senti = Sentiment(["I am Happy", "I am SAD", "Wonderful"])
# 	print(senti.driver())
