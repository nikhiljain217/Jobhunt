import numpy as np
import pandas as pd
import re
import math
import tweepy
import datetime as dt
import matplotlib.pyplot as plt
import json

import yfinance as yf
from sklearn import preprocessing
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

import auth_key as key

class Stock:

	def __init__(self, symbol=None, from_date=None, to_date=None):
		self.num_tweets = 1000
		self.symbol = symbol
		self.from_date = from_date
		self.to_date = to_date

	def load_Dates(self):
		actual_date = dt.date.today()
		past_date = actual_date - dt.timedelta(days=100)

		actual_date = actual_date.strftime("%Y-%m-%d")
		past_date = past_date.strftime("%Y-%m-%d")

		self.from_date = past_date
		self.to_date = actual_date

	def get_Stock(self):
		stock = yf.download(self.symbol, self.from_date, self.to_date)
		stock = pd.DataFrame(data=stock)

		stock = stock[['Open', 'High', 'Low', 'Close', 'Volume']]
		stock['HighLoad'] = (stock['High'] - stock['Close']) / stock['Close'] * 100.0
		stock['Change'] = (stock['Close'] - stock['Open']) / stock['Open'] * 100.0
		stock = stock[['Close', 'HighLoad', 'Change', 'Volume']]

		self.stock = stock

	def stock_Forcast(self):
		f_out = int(math.ceil(0.1 * len(self.stock)))
		self.stock['Label'] = self.stock[['Close']].shift(-f_out)

		X = np.array(self.stock.drop(['Label'], axis=1))
		X = preprocessing.scale(X)
		X_forecast =  X[-f_out:]
		X = X[:-int(math.ceil(0.1 * len(self.stock)))]
		
		self.stock.dropna(inplace=True)
		y = np.array(self.stock['Label'])

		X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5)

		clf = LinearRegression(n_jobs=-1)
		clf.fit(X_train, y_train)
		accuracy = clf.score(X_test, y_test)
		forcast = clf.predict(X_forecast)

		self.stock['Prediction'] = np.nan

		last_date = self.stock.iloc[-1].name
		last_date = dt.datetime.strptime(str(last_date), "%Y-%m-%d %H:%M:%S")\

		for pred in forcast:
			last_date += dt.timedelta(days=1)
			self.stock.loc[last_date.strftime("%Y-%m-%d")] = [np.nan for _ in range(len(self.stock.columns) - 1)] + [pred]

	def plot_Stock(self):
		self.stock['Close'].plot(color='black')
		self.stock['Prediction'].plot(color='red')
		plt.legend(loc=4)
		plt.xlabel('Date')
		plt.ylabel('Price')
		plt.xticks(fontsize=5, rotation=45)
		plt.show()

	def save_Predictions(self):
		data = {}
		data['Stock'] = []

		close = np.array(self.stock['Close'])
		pred = np.array(self.stock['Prediction'])

		for ind in range(len(self.stock)):
			data['Stock'].append({
				'Date': str(self.stock.iloc[ind].name),
				'Close': float(close[ind]),
				'Prediction': float(pred[ind])
				})

		with open('result.json', 'w') as file:
			json.dump(data, file)

		self.data_json = data

	def driver(self):
		self.load_Dates()
		self.get_Stock()
		self.stock_Forcast()
		self.plot_Stock()
		self.save_Predictions()

		return(self.data_json)

# if __name__ == "__main__":
# 	st = Stock("vnet")
# 	st.driver()