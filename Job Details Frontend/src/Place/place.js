import React from 'react';
import PlaceImage from './placeImage';
import LivingStandard from './living'
import { FaBeer } from 'react-icons/fa'
import { Grid, Cell } from "styled-css-grid";
import './Place.css'

function Place()
{
    
        return(
            <div className="place-container">

                <PlaceImage />
                <h1>Seattle</h1>
                    
                    <div className = "place-elements">
                    <div className="detail">
                            <p>Seattle is a seaport city on the West Coast of the United States. It is the seat of King County, Washington. With an estimated 744,955 residents as of 2018, Seattle is the largest city in both the state of Washington and the Pacific Northwest region of North America. According to U.S. Census data released in 2018, the Seattle metropolitan area's population stands at 3.98 million, and ranks as the 15th-largest in the United States. <a href="www.google.com">...</a></p>
                        </div>
                        <div className="expenses">
                            
                        </div>
                        
                    
                        <div className="living">
                        <LivingStandard />
                        </div>
                        <div className="corona">
                        
                        </div>
                    
                <div className="twitter"></div>
            </div> 
            </div>
            
            
                
            
    
        );    
}

export default Place;