from flask import Flask, request, Response
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS
from urllib.parse import quote
from pprint import pprint

import csv
import tweepy
import jsonpickle
import requests

from twitter_keys import *
from adzuna_keys import *

# init server
twitter_api = None
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')


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
    
    return resp

@app.route('/getjobs/<searchstring>/<location>', methods=['GET'])
def get_jobs(searchstring, location):

    # make request to adzuna api
    escaped_string = quote(searchstring)
    escaped_location = quote(location)
    whereParam = "" if location == "United States" else "&where={0}".format(escaped_location)
    apiUrl = "http://api.adzuna.com/v1/api/jobs/us/search/1?app_id={0}&app_key={1}&results_per_page=20&what={2}{3}&content-type=application/json"
    requestUrl = apiUrl.format(adzuna_app_id,adzuna_app_secret,escaped_string,whereParam)
    response = clean_and_process_response(requests.get(requestUrl).json())

    pprint(response)

    # return response
    return Response(response=jsonpickle.encode(response), status=200, mimetype="application/json")


@app.route('/getlocationinfo/<raw_location>', methods=['GET'])
def get_location_info(raw_location):

    city_name = ""
    urban_area = ""
    state_name = ""
    latlong = {}
    #query teleport api for city and urban area information
    try:
        #add location data
        apiUrl = "https://api.teleport.org/api/cities"

        response = requests.get(apiUrl, params= {'search': raw_location, 'limit': 1})
        results = response.json()
        city_name = results['_embedded']['city:search-results'][0]['matching_alternate_names'][0]['name']
        cityResourceUrl = results['_embedded']['city:search-results'][0]['_links']['city:item']['href']

        #get corresponding urban area url, state and latitude longitude
        response = requests.get(cityResourceUrl)
        result = response.json()
        urban_area = result["_links"]["city:urban_area"]
        state_name = result["_links"]["city:admin1_division"]["name"]
        latlong = result["location"]["latlon"]

    except Exception as e:
        print("Exception occurred : {0}".format(e))

    resp = {'city_name': city_name, 'urban_area': urban_area, 'state_name': state_name, 'latlong': latlong}
    return Response(response = jsonpickle.encode(resp), status=200, mimetype="application/json")


class TweetStreamListener(tweepy.StreamListener):

    def __init__(self):
        self.backoff_timeout = 1
        super(TweetStreamListener,self).__init__()

    def on_status(self, status):
        global socketio

        #reset timeout
        self.backoff_timeout = 1

        #send message on namespace
        socketio.emit('tweet', jsonpickle.encode(status), namespace='/company_tweets')

    def on_error(self, status_code):

        # exp back-off if rate limit error
        if status_code == 420:
            time.sleep(self.backoff_timeout)
            self.backoff_timeout *= 2
            return True
        else:
            print("Error {0} occurred".format(status_code))
            return False

tweet_stream = None

@socketio.on('connect', namespace='/company_tweets')
def company_tweet_connect():
    global tweet_stream
    global twitter_api

    #create listener to listen for company tweets
    listener = TweetStreamListener()
    tweet_stream = tweepy.Stream(auth = twitter_api.auth, listener=listener)


@socketio.on('disconnect', namespace='/company_tweets')
def company_tweet_disconnect():
    global tweet_stream

    print("Client disconnected")

    #stop stream
    tweet_stream.disconnect()
    tweet_stream = None


@socketio.on('start', namespace='/company_tweets')
def start_tweet_streaming(company):
    #start stream to listen to company tweets
    global tweet_stream

    tweet_stream.filter(track=[company])

"""
@socketio.on_error_default
def default_error_handler(e):
    print("error occurred")
    print(request.event["message"])
    print(request.event["args"])
"""

def get_sentiment_analysis(company):
    #search for tweets for this company in the last 7 days

    #run sentiment analysis model day by day

    #results current day results back to caller
    return


def get_hobby_tweets(location):
    #use hard coded list of hobbies

    #search tweets
    return


def get_twitter_connection():

    api = None
    try:
        auth = tweepy.OAuthHandler(tw_consumer_key, tw_consumer_secret)
        auth.set_access_token(tw_access_token, tw_access_token_secret)
        api = tweepy.API(auth)
    except Exception as e:
        print("Exception occurred : {0}".format(e))
    
    return api


if __name__=="__main__":

    #init twitter connection
    twitter_api = get_twitter_connection()

    socketio.run(app, host="0.0.0.0",port=5000)
