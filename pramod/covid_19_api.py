from flask import Flask,Response,jsonify
import requests 
import json
from elasticsearch import Elasticsearch
from flask_cors import CORS
import jsonpickle
import traceback
app = Flask(__name__)

CORS(app)

@app.route('/covid/<city>/<state>')
def covid_case(city, state):

    try:
        print("Got requests")
        e = Elasticsearch()
        res = e.search(index="cities_to_county",body={"query":{"bool":{"must":[{"match":{"city":city}},{"match":{"state":state}}]}}})
        county = res['hits']['hits'][0]['_source']['county']

        res = e.search(index="covid_19",body={"query":{"bool":{"must":[{"match":{"county":county}},{"match":{"state":state}}]}}})
        print(res)
        result = res['hits']['hits'][0]['_source']
    except Exception as e:

        print("The Covid Api have exception ")
        traceback.print_exc()
        result = {"county":"",   "state":"",   "dates":[], "cases":[], "deaths":[], "total_cases":0, "total_deaths":0}

    return Response(response=jsonpickle.encode(result), status=200, mimetype="application/json")

if __name__ == '__main__':
    app.debug = True
    app.run(port=9000)
	

