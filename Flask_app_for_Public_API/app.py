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
    t=result.json()['summary']
    temp=result.json()['categories']
    result1=[0 for i in range(0,5)]
    result1[0]='Cost of Living : '+str(round(temp[1]['score_out_of_10'],2))+' '
    result1[1]='Commute : '+str(round(temp[5]['score_out_of_10'],2))+' '
    result1[2]='Safety : '+str(round(temp[7]['score_out_of_10'],2))+' '
    result1[3]='Environmental Quality : '+str(round(temp[10]['score_out_of_10'],2))+' '
    result1[4]='Taxation : '+str(round(temp[12]['score_out_of_10'],2))+' '
    result_temp=''
    for i in range(0,5):
        result_temp+=result1[i]
    return result_temp