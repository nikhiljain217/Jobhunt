import React, {Component} from 'react';
import PlaceImage from './placeImage';
import LivingStandard from './living'
import RentalRecords from './rents'
import CovidCase from './covid'
import WikiInfo from './wikiinfo'
import connect from "react-redux/es/connect/connect";

import './Place.css'
import { MdSupervisorAccount } from 'react-icons/md';

class Place extends Component
{
    constructor(props) {
            super(props);
        }
    
        render()
        {
        let jobPlace = this.props.place
        
        return(
            <div className="place-container">

                <PlaceImage place={jobPlace}/>
                <h1>{jobPlace}</h1>
                    
                    <div className = "place-elements">
                    <div className="detail">
                            <WikiInfo topic={jobPlace} length={554}/>
                        </div>
                        <div className="expenses">
                            {/* {<RentalRecords place={jobPlace} /}> */}
                        </div>
                        
                    
                        <div className="living">
                        <LivingStandard place={jobPlace}/>
                        </div>
                        <div className="corona">
                        
                        </div>
                    
                <div className="twitter">
                
                </div>
            </div> 
            </div>
            
            
                
            
    
        );    }
}


const mapStateToProps = (state,ownProps) => {
    return {
        place:state.Place
    }
}
export default connect(mapStateToProps)(Place);