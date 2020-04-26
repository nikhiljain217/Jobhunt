from flask import Flask, Response
import requests
import json
import jsonpickle
from pprint import pprint
from flask_cors import CORS
from news_key import *
import traceback

uaDict ={}
app=Flask(__name__)
CORS(app)



@app.route('/company/<name>')
def company_news(name):
    try:

        url = "http://newsapi.org/v2/everything?q={0}&page=1&pageSize=20{1}&sortBy=popularity".format(name,api_key)
        print(url)
        response = requests.get(url).json()
        #pprint(response)
        articles = response['articles']
    except Exception as e:
        articles = []
        print("The News Api have exception ")
        traceback.print_exc()
    return Response(response=jsonpickle.encode(articles), status=200, mimetype="application/json")


@app.route('/place/image/<name>')
def image_api(name):
    try:
        global uaDict
        url = "{}images/".format(str(uaDict[name.title()]))
        print(url)
        response = requests.get(url).json()
        #pprint(response)
        image = {}
        image['url'] = str(response['photos'][0]['image']['web'])
    except Exception as e:
        image = {"url":""}
        print("The Place Image Api have exception ")
        traceback.print_exc()
    return Response(response=jsonpickle.encode(image), status=200, mimetype="application/json")

@app.route('/place/scores/<name>')
def place_score_api(name):
    try:
        url = "{}scores/".format(str(uaDict[name.title()]))
        result=requests.get(url)
        response = result.json()
        #pprint(response)
        score={}
        score['Cost of Living'] = 10.0 - round(response['categories'][1]['score_out_of_10'],2)
        score['Commute'] = round(response['categories'][5]['score_out_of_10'],2)
        score['Safety'] = round(response['categories'][7]['score_out_of_10'],2)
        score['Environmental Quality'] = round(response['categories'][10]['score_out_of_10'],2)
        score['Taxation'] =10.0- round(response['categories'][12]['score_out_of_10'],2)
        print(score)
    except Exception as e:
        score = {'Cost of Living':0,
        'Commute':0,
        'Safety':0,
        'Environmental Quality':0,
        'Taxation':0}
        print("The Place Score Api have exception")
        traceback.print_exc()
    return Response(response=jsonpickle.encode(score), status=200, mimetype="application/json")

@app.route('/description/<name>')
def description_api(name):
    try:
        if(name=='New York'):
            name = "New York City"
        url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=1&explaintext=1&titles={}".format(name)
        response=requests.get(url).json()
        #pprint(response)
        Page_id = list(response['query']['pages'].keys())[0]
        result = {}
        result['description'] = response['query']['pages'][Page_id]['extract']
        result['url'] = 'https://en.wikipedia.org/wiki/'+name.replace(" ","_")
    except Exception as e:
        result = {"description":"","url":""}
        print("The wikipedia Api have exception ")
        traceback.print_exc()
    return Response(response=jsonpickle.encode(result), status=200, mimetype="application/json")

@app.route('/job/<keyword>/<place>/<max_results>')
def job_api(keyword,place,max_results):
    link=str('https://api.adzuna.com/v1/api/jobs/us/search/1?app_id={APP_ID}&app_key={APP_KEY}}&results_per_page='+max_results+'&where='+place+'&what='+keyword+'&content-type=application/json')
    result=requests.get(link)
    python_obj = json.loads(result.text)
    result={}
    no_results=len(python_obj['results'])
    for i in range(no_results):
        temp=python_obj['results'][i]['title']
        temp=temp.replace('<strong>','')
        temp=temp.replace('</strong>','')       # Title of the job
        temp1=python_obj['results'][i]['created']  # Ad creation date and time
        temp2=python_obj['results'][i]['location']['display_name']    # Place Information
        temp3=python_obj['results'][i]['redirect_url']  # Redirect URL
        temp4 =python_obj['results'][i]['description']  # Brief intro abt the job
        temp5 =python_obj['results'][i]['company']['display_name']  # Company name
        result[i]={'title':temp,'date':temp1,'place':temp2,'url':temp3,'description':temp4,'company':temp5}
    return flask.jsonify(result)

def getUAValues():
    global uaDict
    url = "https://api.teleport.org/api/urban_areas/"
    response = requests.get(url).json()

    response = response['_links']['ua:item']

    for item in response:
        uaDict[item['name']]=item['href']
    

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
    getUAValues()
    app.run(port=8000)