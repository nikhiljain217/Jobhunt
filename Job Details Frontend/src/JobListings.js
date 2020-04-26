import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import JobCard from './JobCard';
import './JobListings.css'
import { useDispatch, useStore } from 'react-redux';
import {setCompany, setUrl, setTitle,setDescription, setPlace} from './Actions/action';




function JobListings({match}) {

    let location = match.params.location;
    let name = match.params.name;
    const dispatch = useDispatch();
    let [results,setResults] = useState([]);

    const getListings = async () => {
        const data = await fetch(`http://localhost:5000/getjobs/${name}/${location}`);
        const dataJson = await data.json();
        setResults(dataJson.results);
    };

    useEffect(() => {
        getListings();
    }, [location,name]);   

    const selectingJobHandle = (objectDic) =>
    {
        dispatch(setCompany(objectDic.Company));
        dispatch(setTitle(objectDic.JobTitle));
        dispatch(setUrl(objectDic.URL));
        dispatch(setPlace(objectDic.Place))
        console.log(objectDic.Description)
        dispatch(setDescription(objectDic.Description))


        
    }
    

    
    return (
        <div className="job-results">
        {
            results.map(item => {

                const stateVariable = {
                    'JobTitle':item.title,
                    'Company':item.company.display_name,
                    'URL':item.redirect_url,
                    "Place":item.city,
                    "Description":item.description
                    }

                    
                return (
                    <Link className="jobdetails-link" onClick={() =>selectingJobHandle(stateVariable)} to={`/${item.id}/details`}>
                        <JobCard
                            key={item.id}
                            title={item.title}
                            company={item.company.display_name}
                            location={item.location}
                            datePosted={item.created}
                            url={item.redirect_url}
                        />
                    </Link>
                )
            })
        }
        </div>
    );

}

export default JobListings;