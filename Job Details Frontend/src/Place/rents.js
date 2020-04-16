import React from 'react';
import './rental-record.css'
import {Bar} from 'react-chartjs-2';

function RentalRecords()
{
    const state = {
        labels: ['Studio', '1-BR', '2-BR',
                 '3-BR', '4-BR'],
        datasets: [
          {
            label: 'Rents',
            backgroundColor: '#0077B5',
            borderColor: '',
            borderWidth: 1,
            data: [666, 667, 668, 669, 680]
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
                        min: 656,
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