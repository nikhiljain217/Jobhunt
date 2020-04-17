from flask import Flask, request, Response
from flask_cors import CORS
from urllib.parse import quote
import jsonpickle
import io
import requests

# init server
app = Flask(__name__)
CORS(app)
appid = ""
appsecret = ""

with open('appid.secret','r') as f:
    appid = f.read().rstrip()

with open('appkey.secret','r') as f:
    appsecret = f.read().rstrip()


def clean_response(resp):

    for item in resp['results']:
        desc = item['description']
        title = item['title']
        desc = desc.replace('<strong>','')
        desc = desc.replace('</strong>','')
        title = title.replace('<strong>','')
        title = title.replace('</strong>','')
        item['description'] = desc
        item['title'] = title
    
    return resp

@app.route('/getjobs/<searchstring>/<location>', methods=['GET'])
def get_jobs(searchstring, location):
    global appid
    global appsecret

    # make request to adzuna api
    escaped_string = quote(searchstring)
    escaped_location = quote(location)
    apiUrl = "http://api.adzuna.com/v1/api/jobs/us/search/1?app_id={0}&app_key={1}&results_per_page=20&what={2}&where={3}&content-type=application/json"
    requestUrl = apiUrl.format(appid,appsecret,escaped_string,escaped_location)
    response = clean_response(requests.get(requestUrl).json())

    # return response
    return Response(response=jsonpickle.encode(response), status=200, mimetype="application/json")

app.run(host="0.0.0.0", port=5000)