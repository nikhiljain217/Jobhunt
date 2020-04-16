import React from 'react';

function SearchBar() {

    return (
        <div className="search-bar">
            <div className="search-control">
                <input type="text" id="search-string"></input>
                <input type="text" id="search-location"></input>
            </div>
        </div>
    );

}

export default SearchBar;