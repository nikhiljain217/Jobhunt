import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Place from './Place/place.js';
import Company from './Company/company.js';
import JobDetail from './JobDetails/jobdetails.js';
import SearchBar from './SearchBar';
import SideTab from './side-tab.js'
import './App.css';



export default class App extends React.Component {
  
  render() {
    const Home = () =>
    {
      return(
        <div><h1>Home Page</h1></div>


      );
    }
  return (
    <div>
        <SearchBar />
        
        <Router>
        < SideTab />
          <div className="main-window">
          <Route path ='/' exact component ={Home} />
          <Route path = "/place" component={Place} />
          <Route path = "/company" component={Company} />
          <Route path = "/jobdetails" component={JobDetail} />
          </div> 
        </Router>
      
     </div>
  );
  }
}

