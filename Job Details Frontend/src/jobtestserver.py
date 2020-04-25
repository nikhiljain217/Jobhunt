from flask import Flask, request, Response
from flask_cors import CORS
from urllib.parse import quote
import csv
import jsonpickle
import io
import requests

# init server
app = Flask(__name__)
CORS(app)
appid = ""
appsecret = ""
location_data = {}

with open('appid.secret','r') as f:
    appid = f.read().rstrip()

with open('appkey.secret','r') as f:
    appsecret = f.read().rstrip()

def load_csv():
    global location_data

    with open('locations.csv','r') as f:
        reader = csv.reader(f)

        # csv schema is city, studio apartment price, 1br, 2br, 3br, 4br
        for row in reader:
            #skip headings
            if row[0] == 'City':
                continue
            location_data[row[0]] = row[1:]




def clean_and_process_response(resp):

    for item in resp['results']:
        #remove html tags
        desc = item['description']
        title = item['title']
        desc = desc.replace('<strong>','')
        desc = desc.replace('</strong>','')
        title = title.replace('<strong>','')
        title = title.replace('</strong>','')
        item['description'] = desc
        item['title'] = title

        try:
            #add location data
            apiUrl = "https://api.teleport.org/api/cities"

            #city information is last element of location area attribute
            response = requests.get(apiUrl, params= {'search': item['location']['area'][-1], 'limit': 10})
            results = response.json()
            item['city'] = results['_embedded']['city:search-results'][0]['matching_alternate_names'][0]['name']

        except Exception as e:
            pass
    
    return resp

@app.route('/getjobs/<searchstring>/<location>', methods=['GET'])
def get_jobs(searchstring, location):
    global appid
    global appsecret

    # make request to adzuna api
    escaped_string = quote(searchstring)
    escaped_location = quote(location)
    whereParam = "" if location == "United States" else "&where={0}".format(escaped_location)
    apiUrl = "http://api.adzuna.com/v1/api/jobs/us/search/1?app_id={0}&app_key={1}&results_per_page=20&what={2}{3}&content-type=application/json"
    requestUrl = apiUrl.format(appid,appsecret,escaped_string,whereParam)
    response = clean_and_process_response(requests.get(requestUrl).json())

    # return response
    return Response(response=jsonpickle.encode(response), status=200, mimetype="application/json")

app.run(host="0.0.0.0", port=5000)