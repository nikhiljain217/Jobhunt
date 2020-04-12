from flask import Flask
import requests
import json

app=Flask(__name__)

@app.route('/image/<name>')
def index(name):
    link=str('https://api.teleport.org/api/urban_areas/slug:')+name+str('/images/')
    result=requests.get(link)
    python_obj = json.loads(result.text)
    temp=result.json()['photos']
    temp1=temp[0]['image']
    image_link=str(temp1['web'])
    return image_link

@app.route('/photo/<name>')
def index_new(name):
    link=str('https://api.teleport.org/api/urban_areas/slug:')+name+str('/images/')
    result=requests.get(link)
    python_obj = json.loads(result.text)
    temp=result.json()['photos']
    temp1=temp[0]['image']
    image_link=str(temp1['web'])
    return image_link