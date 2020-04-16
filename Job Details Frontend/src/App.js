import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, useRouteMatch, Link} from 'react-router-dom'
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
    <Router>
      <div>
        <SearchBar />
        <Route path='/' exact component={Home} />
        <Route path='/jobs' component={Listings} />
        <Route path="/details" component={Details} />
      </div>
    </Router>
  );
  }
}

function Details() {

  let match = useRouteMatch();
  console.log(match.path);

  return (
    <div>
      <SideTab />
      <Switch>
        <Route path={`${match.path}/company`} component={Company} />
        <Route path={`${match.path}/place`} component={Place} />
        <Route path={`${match.path}/jobdetails`} component={JobDetail} />
      </Switch>
    </div>
  );
}

function Listings() {
  return (
    <div>
      <h1>This is the listings page</h1>
      <Link to='/details'>
        <p>Lotta Money!</p>
      </Link>
    </div>
  );
}

