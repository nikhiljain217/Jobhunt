import React,{useEffect,useState} from 'react';
import './rental-record.css'
import {Bar} from 'react-chartjs-2';

function RentalRecords({place})
{
    
  const[rents,setRents] = useState([]);
  

  useEffect(()=>{getRents();
  },[]);

  

  const getRents = async () =>
  {
    const response = await fetch(`http://127.0.0.1:8000/place/housing/${place}`);
    const data = await response.json();
    console.log(data['rents']);
    setRents(data['rents']);

  }
  
  
  const state = {
        labels: ["Small apartment", "Medium apartment", "Large apartment"],
        datasets: [
          {
            label: 'Rents',
            backgroundColor: '#0077B5',
            borderColor: '',
            borderWidth: 1,
            data: rents
          }
        ]
      }

    const h = 1;
    
    return(
        <div className="rental-body">
        <Bar
          data={state}
          height={138}
          
          
          options={{
            title:{
              display:true,
              text:'City Average Rentals',
              fontSize:15,
              position:"bottom"
            },
            legend:{
              display:false,
              position:'top'
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        display: true
                    },
                    title:'Rents',
                    ticks: {
                        min: 0,
                        callback: (value, index, values) => {
                            return '$'+value;
                        }
                    }
                }],
                xAxes:[{
                    gridLines: {
                        display: true
                    }
                }]
            },
            maintainAspectRatio:true
          }}
        />
      </div>
        )

    }
            


export default RentalRecords;