import React, { Component,useSelector } from 'react';
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import connect from "react-redux/es/connect/connect";

import './jobdetails.css'

class JobDetails extends Component
{
    constructor(props) {
        super(props);
    }
    render(){
    let jobTitle = this.props.title
    let jobURL = this.props.url
    let jobDescription = this.props.description
    console.log(jobURL)
    
    const handleClick = e =>
    {
    window.open(jobURL,"_blank");
    }

    
    return(
        <div className="job-container">
            <div className="top-row">
                <div className="job-heading">
                <h1>{jobTitle}</h1>
                </div>
                <div className="save-button">
                

                </div>
                
                <div className="apply-button">
                <Button onClick={handleClick}  align="right" primary>Apply</Button>
                </div>

            </div>
            <div className="job-details-elements">
            <div className="job-details">
            {jobDescription}
            </div>
                
                

            </div>
        </div>
    );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        title: state.title,
        url:state.url,
        description:state.description


    }
}

export default connect(mapStateToProps)(JobDetails);