from flask import Flask
import requests
import json

app=Flask(__name__)

@app.route('/place/image/<name>')
def index(name):
    link=str('https://api.teleport.org/api/urban_areas/slug:')+name+str('/images/')
    result=requests.get(link)
    python_obj = json.loads(result.text)
    temp=result.json()['photos']
    temp1=temp[0]['image']
    image_link=str(temp1['web'])
    return image_link

@app.route('/place/scores/<name>')
def index_new(name):
    link=str('https://api.teleport.org/api/urban_areas/slug:')+name+str('/scores/')
    result=requests.get(link)
    python_obj = json.loads(result.text)
    temp=result.json()['categories']
    result={}
    result['Cost_of_Living']=round(temp[1]['score_out_of_10'],2)
    result['Commute']=round(temp[5]['score_out_of_10'],2)
    result['Safety']=round(temp[7]['score_out_of_10'],2)
    result['Environmental_Quality']=round(temp[10]['score_out_of_10'],2)
    result['Taxation']=round(temp[12]['score_out_of_10'],2)
    return flask.jsonify(result)

@app.route('/description/<name>')
def index_2(name):
    link=str('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=1&explaintext=1&titles=')+name
    result=requests.get(link)
    python_obj = json.loads(result.text)
    temp=result.json()['query']['pages']
    for key,value in temp.items():
        temp=value
    temp=temp['extract']
    result={}
    result['description']=temp
    result['url']='https://en.wikipedia.org/wiki/'+name
    return flask.jsonify(result)