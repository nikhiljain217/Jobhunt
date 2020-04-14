import React, { Component } from 'react';

import logo from './logo.svg';
import { MdWork, MdHome} from 'react-icons/md';
import {FaBriefcase} from 'react-icons/fa'
import {IoIosBriefcase} from 'react-icons/io'
import Place from './Place/place.js';
import './App.css';
export default class App extends React.Component {
  render() {
  return (
    <div>
      <div className="search-bar">
        </div>
        <div className="tab-container">
          <center>
        <div className="icon-line.css"><IoIosBriefcase size="50px" /></div>
        <div className="icon-line"><IoIosBriefcase size="50px" /></div>
        </center>
        </div>
        <div className="main-window">
        <Place />
        
     </div>
      
     </div>
  );
  }
}

