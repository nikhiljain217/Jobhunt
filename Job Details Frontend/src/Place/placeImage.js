import React, {useEffect,useState} from 'react';
import './Place.css'
 function PlaceImage({place})
 {

    const [imgUrl,setImgUrl] = useState("");
    console.log(place)

    useEffect(()=>{getImage();
        });

    const getImage = async () => {
    
        const response = await fetch(`http://127.0.0.1:8000/place/image/${place}`);
        const data = await response.json();
        console.log(data['url'])
        setImgUrl(data['url']);
      
      


    };
    
    

    return(
        
        <img class='placeImage' src ={imgUrl} />
        
    );
}

export default PlaceImage;