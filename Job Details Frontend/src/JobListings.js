import React, {useState, useEffect} from 'react';
import JobCard from './JobCard';
import {Link} from 'react-router-dom';

function JobListings({match}) {

    let location = match.params.location;
    let name = match.params.name;

    let [results,setResults] = useState([]);

    const getListings = async () => {
        const data = await fetch(`http://localhost:5000/getjobs/${name}/${location}`);
        const dataJson = await data.json();
        setResults(dataJson.results);
    };

    useEffect(() => {
        getListings();
    }, [location,name]);   

    return (
        <div className="job-results">
        {
            results.map(item => {
                return (
                    <JobCard
                        key={item.id}
                        title={item.title}
                        company={item.company.display_name}
                        location={item.location.display_name}
                        datePosted={item.created}
                        url={item.redirect_url}
                    />
                )
            })
        }
        </div>
    );

}

export default JobListings;