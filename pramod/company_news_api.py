from flask import Flask
import requests 
import json
from google_news_key import *
app = Flask(__name__)

@app.route('/company/<name>')

def company_news(name):
	
	url = "http://newsapi.org/v2/everything?q="+ name + api_key
	response = requests.get(url)
	response = response.json()
	articles = response['articles']

	number_articles = 0
	top_articles = []
	while number_articles<10:
		article = articles[number_articles]
		d = {}
		d['author'] = article['author']
		d['url'] = article['url']
		d['title'] = article['title']
		d['description'] = article['description']
		d['urlToImage'] = article['urlToImage']
		d['source'] = article['source']['name']
		top_articles.append(d)
		number_articles+=1
	return {'articles':top_articles}