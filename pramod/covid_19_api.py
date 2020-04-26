from flask import Flask,Response,jsonify
import requests 
import json
from elasticsearch import Elasticsearch
app = Flask(__name__)

@app.route('/covid_city_state/<city>/<state>')
def company_news(city, state):
	e = Elasticsearch()
	res = e.search(index="cities_to_county",body={"query":{"bool":{"must":[{"match":{"city":city}},{"match":{"state":state}}]}}})
	county = res['hits']['hits'][0]['_source']['county']

	res = e.search(index="covid_19",body={"query":{"bool":{"must":[{"match":{"county":county}},{"match":{"state":state}}]}}})

	result = res['hits']['hits'][0]['_source']

	return jsonify(result)
	

