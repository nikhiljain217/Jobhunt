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

            this.state = {
                city:"",
                urbanArea:"",
                latLon:{},
                stateName:""
        }
        
        

        }

        async componentDidMount()
        {
            let jobPlace = this.props.place
            fetch(`http://127.0.0.1:5000/getlocationinfo/${jobPlace}`)
            .then(response => response.json())
            .then(data => this.setState({city:data['city_name'],
            urbanArea:data['urban_area'],
            latLon:data['latlong'],
            stateName:data['state_name']
        }));
            
           console.log(this.state.urbanArea);
            
        }
        render()
        {
        
        
        return(
            <div className="place-container">

                <PlaceImage place={this.state.urbanArea}/>
                {console.log(this.state.urbanArea)}
                <h1>{this.state.city}</h1>
                    
                    <div className = "place-elements">
                    <div className="detail">
                            <WikiInfo topic={this.state.city.concat(",_",this.state.stateName)} length={554}/>
                        </div>
                        <div className="expenses">
                            {this.state.urbanArea!="" &&
                            <RentalRecords place={this.state.urbanArea} /> }
                        </div>
                        
                    
                        <div className="living">
                        <LivingStandard place={this.state.urbanArea} city={this.state.city}/>
                        </div>
                        <div className="corona">
                        {this.state.urbanArea!="" &&
                        <CovidCase city={this.state.city} state={this.state.stateName} />}
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