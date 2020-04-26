import React,{useEffect,useState} from 'react';

function CovidCase({city,state})
{

    useEffect(()=>{getCovid();
    });

    const getCovid = async () => {
    
        const response = await fetch(`http://127.0.0.1:9000/covid/${city}/${state}`);
        const data = await response.json();
        console.log(data)
    }    

    return (
        <div>
        </div>
    );
}
            


export default CovidCase;