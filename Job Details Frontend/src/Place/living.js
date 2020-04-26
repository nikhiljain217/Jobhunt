
import React,{useState, useEffect} from 'react';
import Select from 'react-select'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function LivingStandard({place})
{
    
    const percentage = 66;
    
    ;
    

    const [cityStandard,setCityStandard] = useState([
                    {value:0,label:'Cost of Living'},
                    {value:0,label:'Commute'},
                    {value:0,label:'Safety'},
                    {value:0,label:'Taxation'},
                    {value:0,label:'Environmental Quality'}]);

    const [referenceCityStandard,setReferenceCityStandard] = useState([
                    {value:0,label:'Cost of Living'},
                    {value:0,label:'Commute'},
                    {value:0,label:'Safety'},
                    {value:0,label:'Taxation'},
                    {value:0,label:'Environmental Quality'}]);
    const [cityRating,setCityRating] = useState(0);
    const [referenceCityRating,setReferenceCityRating] = useState(0);
    const [search, setSearch] = useState('')
    const [referenceCity,setReferenceCity] =useState('Boulder');
    const [selectedParameter,setSelectedParameter] = useState({value:0,label:''});
    useEffect(()=>{
        getCityStandard();
        getReferenceStandard();});

    const getCityStandard = async () => {
      
      const response = await fetch(`http://127.0.0.1:8000/place/scores/${place}`);
      const data = await response.json();
      
      cityStandard.map(option =>{
          option.value = data[option.label]
      });
      console.log(referenceCityStandard);
      

    }

    const getReferenceStandard = async () => {
      

        const response = await fetch(`http://127.0.0.1:8000/place/scores/${referenceCity}`);
        const data = await response.json();
        
        referenceCityStandard.map(option =>{
            option.value = data[option.label]
        });

        console.log(cityRating)
  
      }

    const updateSearch = e =>
    {
        setSearch(e.target.value);
    }

    const handleform = e =>
    {
        e.preventDefault();
        setReferenceCity(search);
        console.log("Before")
        getReferenceStandard();
        console.log("After")
        handleChange(selectedParameter);
        setSearch('');

        
    }

    const handleChange =(selectedOption) =>
    {
        
        setSelectedParameter({value:selectedOption.value,label:selectedOption.label});
        console.log(selectedOption.value*10)
        setCityRating(selectedOption.value*10);
        referenceCityStandard.map(
            option => {
                if(option.label == selectedOption.label)
                {
                    setReferenceCityRating(option.value*10)
                }
            }
        )
    }
    const he =90;

    const customStyles = {
        control: (base, state) => ({
          ...base,
          '&:hover': { borderColor: '#0077B5' } // border style on hover
          // You can also use state.isFocused to conditionally style based on the focus state
        })
      };

    const circleStyle = {
        // Rotation of path and trail, in number of turns (0-1)
            pathColor: '#0077B5',
            textColor: '#313335',
            trailColor: '#d6d6d6'}
    return(
         <div className="living-bar">
        <div className="living-ind">
        <CircularProgressbarWithChildren styles={buildStyles(circleStyle)} value={cityRating} >
        <div style={{ fontSize: 12, marginTop: -5 }}>
    <strong>{place}</strong> <br />{`${(cityRating/10).toFixed(2)}/10`}</div>
        </CircularProgressbarWithChildren>
        </div>
        <div className="living-ind">
        <CircularProgressbarWithChildren styles={buildStyles(circleStyle)} value= {referenceCityRating}     >
        <div style={{ fontSize: 12, marginTop: -5 }}>
    <strong>{referenceCity}</strong><br /> {`${(referenceCityRating/10).toFixed(2)}/10`}</div>
        </CircularProgressbarWithChildren>
        </div>
        <div className="living-select">
        <div className='drop-list'> 
        <Select styles={customStyles} onChange={handleChange} options={cityStandard} placeholder="Select" maxMenuHeight={he}/>
         </div>
        <div className='city-field'></div>
        <form onSubmit={handleform} className="ref-city-form">
            <input className="ref-city-input" onChange={updateSearch}  type="text" value={search} placeholder="Reference city" />
            <input  className="ref-city-submit"type="submit" />
            </form>
        
        </div>
        </div>
    );
}

export default LivingStandard;