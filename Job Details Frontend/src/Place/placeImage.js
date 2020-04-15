import React, {useEffect} from 'react';
import './Place.css'
 function PlaceImage()
 {
    const getImage = async () => {
      console.log("insidethis");  
      const response = await fetch('http://127.0.0.1:8000/place');
      const data = await response.json();
      console.log(data);

    };

    useEffect(()=>{
    getImage();
    },[]);

    return(
        
        <img class='placeImage' src ="https://d13k13wj6adfdf.cloudfront.net/urban_areas/seattle_web-e07e580eca.jpg" />
        
    );
}

export default PlaceImage;