import React, { Component } from 'react';
import { MdLocationOn, MdHome} from 'react-icons/md';
import {FaBriefcase} from 'react-icons/fa'
import {IoIosBriefcase} from 'react-icons/io'
import './App.css';
import {NavLink, useRouteMatch} from 'react-router-dom'

const SideTab = () =>
{
    let match = useRouteMatch();
    const linkStyle=
    {
        color:'#CACCCE'
    }
    
    const aStyle=
    {
        color:'#0077B5'
    }
    ;
    return (
        <div className="tab-container">
            <center>
                <NavLink style={linkStyle} to={`${match.path}/jobdetails`} activeStyle={aStyle}>
                    <div className="icon-line"><IoIosBriefcase size="40px" /></div>
                </NavLink>

                <NavLink style={linkStyle} to={`${match.path}/company`} activeStyle={aStyle}>
                    <div className="icon-line"><IoIosBriefcase size="40px" /></div>
                </NavLink>

                <NavLink style={linkStyle} to={`${match.path}/place`} activeStyle={aStyle}>
                    <div className="icon-line"><MdLocationOn size="40px" /></div>
                </NavLink>

            </center>
        </div>
    )
}

export default SideTab;
