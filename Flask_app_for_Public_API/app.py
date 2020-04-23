from flask import Flask
import requests
import json

app=Flask(__name__)

@app.route('/place/image/<name>')
def image_api(name):
    link=str('https://api.teleport.org/api/urban_areas/slug:')+name+str('/images/')
    result=requests.get(link)
    python_obj = json.loads(result.text)
    temp=result.json()['photos']
    temp1=temp[0]['image']
    image_link=str(temp1['web'])
    return image_link

@app.route('/place/scores/<name>')
def place_score_api(name):
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
def description_api(name):
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