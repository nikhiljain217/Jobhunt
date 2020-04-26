import React, {useEffect,useState} from 'react';
import './Place.css'
 function PlaceImage({place})
 {

    const [imgUrl,setImgUrl] = useState("");
    

    useEffect(()=>{
        getImage();
        },[imgUrl],[]);

    const getImage = async () => {
    
        const response = await fetch(`http://127.0.0.1:8000/place/image/${place}`);
        const data = await response.json();
        setImgUrl(data['url']);
      
      


    };
    
    

    return(
        
        <img class='placeImage' src ={imgUrl} />
        
    );
}

export default PlaceImage;