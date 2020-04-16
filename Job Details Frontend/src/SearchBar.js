import React from 'react';
import './SearchBar.css';
import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';

function SearchBar() {

    const displayResults = () => {
        console.log("This would navigate to the job results page with the results fetched");
    }

    return (
        <div className="search-bar">
            <div className="search-control" onSubmit={displayResults}>
                <input type="text" id="search-string" placeholder="Search"></input>
                <input type="text" id="search-location" placeholder="Location (state/zip code)"></input>
                <Link to='/jobs'>
                    <div className="search-icon"><FaSearch size="38px"/></div>
                </Link>
            </div>
        </div>
    );

}

export default SearchBar;