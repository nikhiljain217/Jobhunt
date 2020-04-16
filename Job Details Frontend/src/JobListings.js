import React from 'react';
import {Link} from 'react-router-dom';

function JobListings() {

    return (
        <div className="job-results">
            <h1>This is the listings page</h1>
            <Link to='/details'>
                <p>Lotta Money!</p>
            </Link>
        </div>
    );

}

export default JobListings;