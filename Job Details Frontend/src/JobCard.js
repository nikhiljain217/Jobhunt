import React from 'react';
import './JobCard.css'

function JobCard({title,company,location,datePosted,url}) {

    const getDateString = () => {
        // your code goes here
        var date = new Date(datePosted);
        var time = Date.now();

        var diff = time - date.getTime();
        var diffHours = Math.round(diff/(1024*60*60));

        if (diffHours < 24) {
            return 'today';
        }
        else {
            var diffDays = Math.round(diff / (1024 * 60 * 60 * 24));
            if (diffDays < 30) {
                return diffDays == 1 ? 'yesterday' : `${diffDays} days ago`;
            }
            else if (diffDays > 30) {
                var diffMonths = Math.round(diffDays / 30);
                if (diffMonths < 12)
                    return diffMonths == 1 ? 'a month ago' : `${diffMonths} months ago`;
                else {
                    var diffYears = Math.round(diffMonths / 12);
                    return diffYears == 1 ? 'a year ago' : `${diffYears} years ago`;
                }
            }
        }
    };

    let dateString = getDateString(datePosted);

    return (
        <div className="job-card">
            <img src={`http://logo.clearbit.com/${company.replace(/\s/g,'')}.com?size=40`} alt=""></img>
            <h4>{title}</h4>
            <p className="company">{company}</p>
            <p className="location">{location}</p>
            <p>{dateString}</p>
        </div>
    );

}

export default JobCard;