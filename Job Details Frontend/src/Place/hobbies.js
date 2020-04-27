import React from 'react';
import {Loader} from "semantic-ui-react"
class Hobbies extends React.Component{
    constructor(props)
    {
        super(props)

        this.state={
            loading:true,
            hobbies:[]
        }
    }

    async componentDidMount()
    {
        fetch(`http://127.0.0.1:5000//gethobbies/${this.props.latitude},${this.props.longitude}`)
        .then(response => response.json())
        .then(response => {this.setState({loading:false,
        hobbies:response.popular_hobbies})
        
    });
    }

    render(){
        let loading = <Loader active inline="centered" size='medium'>Fetching Activties</Loader>
        if(this.state.loading)
        {
            return(<div className="activity-heading"><center><h3>Popular Activities</h3></center>
            {loading}</div>);
        }
    return(<div className="activity-heading"><center><h3>Popular Activities</h3></center>
    <ul>
    {this.state.hobbies.map(hobby =>
    (
        <li className="activity">{hobby}</li>
    ))}
    </ul>
    </div>
    )


}
}

export default Hobbies;