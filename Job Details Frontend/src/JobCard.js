import React from 'react';
import './JobCard.css'

function JobCard({title,company,location,datePosted,url}) {

    return (
        <div className="job-card">
            <h3>{title}</h3>
            <h4>{company}</h4>
            <h4>{location}</h4>
            <h4>{datePosted}</h4>
        </div>
    );

}

export default JobCard;