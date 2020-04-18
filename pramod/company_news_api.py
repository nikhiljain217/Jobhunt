from flask import Flask,Response
import requests 
import json
import time
from google_news_key import *
app = Flask(__name__)

@app.route('/company/<name>')

def company_news(name):
	
	url = "http://newsapi.org/v2/everything?q="+ name + "&page=1" +"&pageSize=100"+ api_key 
	response = requests.get(url)
	response = response.json()
	company_news.articles = response['articles']
	company_news.total_articles = len(company_news.articles)
	company_news.i = 0
	print(company_news.total_articles)
	def generate():
		try:
			while True:
				number_articles = 0
				top_articles = []
				while number_articles < 10 and company_news.i < company_news.total_articles:
					article = company_news.articles[company_news.i]
					d = {}
					d['author'] = article['author']
					d['url'] = article['url']
					d['title'] = article['title']
					d['description'] = article['description']
					d['urlToImage'] = article['urlToImage']
					d['source'] = article['source']['name']
					top_articles.append(d)
					number_articles+=1
					company_news.i+=1
				if not len(top_articles):
					break
				yield "{}\n".format(top_articles)
				time.sleep(5)
		except GeneratorExit:
			print('closed')
	return Response(generate(), mimetype = 'application/json')