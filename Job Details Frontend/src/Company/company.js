import React, { Component } from 'react';
import './company.css'
import { Rating } from 'semantic-ui-react'



function Company()
{
    const ratingStyle = {
        color:'blue'
    };
    return(
    <div className="company-container">
        <div className="top-row">
        <div className="company-heading">
            <h1>Amazon</h1>
        </div>
        <div className="ratings">
            
            <center>Rating</center>

            <center><div className='bla'><Rating defaultRating={3} maxRating={5} size="massive" disabled /></div></center>
            </div>
            </div>
            <div className="company-elements">
                <div className="company-details">
                Amazon.com, Inc.[7] is an American multinational technology company based in Seattle, with 750,000 employees.[8] It focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is considered one of the Big Four tech companies, along with Google, Apple, and Microsoft.[9][10][11] It has been referred to as "one of the most influential economic and cultural forces in the world."[12]
                </div>
                <div className="stock-graph-body">

                </div>
                <div className="company-news-body">


                </div>
                <div className="company-tweet-body">
                
                </div>

            </div>
        

        </div>
        
        
)
}

export default Company;