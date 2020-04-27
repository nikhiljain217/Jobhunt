import React,{useEffect,useState} from 'react';
import {ResponsiveLine} from '@nivo/line';

function CovidCase({city,state})
{
    /* constructor(props)
    {
        super(props);

        this.state = {
            data:[0,0,0,0]
        };
    }
 */
    const [dataState,setDataState] = useState([]);
    const [tickValues,setTickValues] = useState([]);

    useEffect(()=>{
        getData();
    },[]);

    const getData = async () =>
    {
        const response = await fetch(`http://127.0.0.1:8000/covid/${city}/${state}`)
        const newdata = await response.json()
        console.log(newdata.data);
        setDataState(newdata.data)
        setTickValues(newdata.tickValues)

    }
    
   /*  async componentDidMount()
    {
        
        fetch(`http://127.0.0.1:8000/covid/${this.props.city}/${this.props.state}`)
        .then(response => response.json)
        .then(response => {
            this.setState({data:response});
        });
        
        
    }    */ 
    
            
        return (<div style={{ maxWidth: "800px", margin: "0 auto", height: "180px" }}>
            {console.log(dataState)}
        {dataState.length!=0&&<ResponsiveLine
        curve="monotoneX"
          data={[
            {
              id: "repos",
              color: '#0077B5',
              data: dataState
            }
          ]}
          axisBottom={{
            orient: 'bottom',
            tickValues:tickValues,
            legend: 'Dates',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            legend: 'New Daily Cases',
            legendOffset: -50,
            legendPosition: 'middle'
        }}
          margin={{ top: 10, right: 25, bottom: 25, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto"
          }}
           colors='#0077B5' 
          enableArea={true}
          useMesh={true}
          enablePoint={false}
          pointSize={1}
          enableGridX={false}
        />}

        <center><h4>COVID-19 Cases</h4></center>
      </div>
            
          );
        
    
    
}
            


export default CovidCase;