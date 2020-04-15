import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import './jobdetails.css'

function JobDetails()
{
    return(
        <div className="job-container">
            <div className="top-row">
                <div className="job-heading">
                <h1>Senior Engineer</h1>
                </div>
                <div className="save-button">
                <Button primary>Save</Button>

                </div>
                <div className="apply-button">
                <Button align="right" primary>Apply</Button>
                </div>

            </div>
            <div className="job-details-elements">
            <div className="job-details">
                
            </div>
                <div className="avg-salary"></div>
                <div className="other-company-body"></div>

            </div>
        </div>
    );
}

export default JobDetails;