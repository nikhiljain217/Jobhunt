import React, { Component } from 'react';
import { MdLocationOn, MdHome} from 'react-icons/md';
import {FaBriefcase} from 'react-icons/fa'
import {IoIosBriefcase} from 'react-icons/io'
import './App.css';
import {NavLink,Link} from 'react-router-dom'

const SideTab = () =>
{
    const linkStyle=
    {
        color:'#CACCCE'
    }
    
    const aStyle=
    {
        color:'#0077B5'
    }
    ;
    return(
    <div className="tab-container">
          <center>
              
        <NavLink style={linkStyle} to="/jobdetails" activeStyle={aStyle}>
        <div className="icon-line"><IoIosBriefcase size="50px" /></div>
        </NavLink>
        
        <NavLink style={linkStyle} to="/company" activeStyle={aStyle}>
        <div className="icon-line"><IoIosBriefcase size="50px" /></div>
        </NavLink>
        
        
        <NavLink style={linkStyle} to="/place" activeStyle={aStyle}>
        <div className="icon-line"><MdLocationOn size="50px" /></div>
        </NavLink>
        
        </center>
        </div>)
}

export default SideTab;