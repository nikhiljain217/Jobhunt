import React, {useState} from 'react';
import './SearchBar.css';
import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';

function SearchBar() {

    let [location, setLocation] = useState("");
    let [searchString, setSearchString] = useState("");

    const updateLocation = e => {
        setLocation(e.target.value);
        console.log(location);
    };

    const updateSearchString = e => {
        setSearchString(e.target.value);
        console.log(searchString);
    };

    return (
        <div className="search-bar">
            <div className="search-control">
                <input type="text" id="search-string" placeholder="Search" onChange={updateSearchString}></input>
                <input type="text" id="search-location" placeholder="Location (state/zip code)" onChange={updateLocation}></input>
                <Link to={`/jobs/${searchString}/${location == "" ? "United States" : location}`}>
                    <div className="search-icon"><FaSearch size="38px"/></div>
                </Link>
            </div>
        </div>
    );

}

export default SearchBar;