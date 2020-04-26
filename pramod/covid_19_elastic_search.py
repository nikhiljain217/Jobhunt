import csv
from elasticsearch import Elasticsearch
county_to_deaths = {}
county_to_cases = {}
county_to_dates = {}
total_cases = {}
total_deaths = {}

with open('us-counties.csv') as csv_file:
	csv_reader = csv.reader(csv_file,delimiter=',')
	for row in csv_reader:

		date = row[0]
		county = row[1]
		state = row[2]
		cases = row[4]
		deaths=row[5]
		if cases=='cases':
			continue
		county_state = county +" " +state
		dates_list = county_to_dates.get(county_state,[])
		dates_list.append(date)
		county_to_dates[county_state] = dates_list

		
		cases_list = county_to_cases.get(county_state,[])
		cases_list.append(int(cases))
		county_to_cases[county_state] = cases_list
		
		
		deaths_list = county_to_deaths.get(county_state,[])
		deaths_list.append(int(deaths))
		county_to_deaths[county_state] = deaths_list




#change from cumulative to everyday basis
counties = list(county_to_cases.keys())
for county in counties:
	deaths = county_to_deaths[county]
	cases = county_to_cases[county]
	n = len(deaths)
	for i in range(n-1,0,-1):
		deaths[i] = deaths[i] - deaths[i-1]
		cases[i] = cases[i] - cases[i-1]
	total_cases[county] = sum(cases)
	total_deaths[county] = sum(deaths)

#read and map city to county
city_to_county = {}
with open('uscities.csv') as csv_file:
	csv_reader = csv.reader(csv_file,delimiter=',')
	for row in csv_reader:
		city = row[1]
		county = row[5]
		state = row[3]
		city_to_county[city+" " +state] = county



es = Elasticsearch()

global_id = 1
for county in counties:
	county_ = county.split(' ')
	e = {"county":county_[0],"state":county_[1], "dates":county_to_dates[county], "deaths":county_to_deaths[county], "cases":county_to_cases[county], "total_cases":total_cases[county], "total_deaths":total_deaths[county]}
	result = es.index(index='covid_19', doc_type='county_to_everything_mapping', id = global_id, body = e)
	global_id+=1

cities = list(city_to_county.keys())

global_id = 1
for city in cities:
	city_ = city.split(' ')
	e = {"city":city_[0],"state":city_[1], "county":city_to_county[city]}
	result = es.index(index='cities_to_county', doc_type='city_to_county_mapping', id = global_id, body = e)
	global_id+=1


