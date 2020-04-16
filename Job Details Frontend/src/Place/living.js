
import React from 'react';
import Select from 'react-select'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function LivingStandard()
{
    
    const percentage = 66;
    
    const Options =[
    {value:'cost of living',label:'Cost of Living'},
    {value:'commute',label:'Commute'},
    {value:'safety',label:'Safety'},
    {value:'taxation',label:'Taxation'},
    {value:'environmental quality',label:'Environmental Quality'}];
    const defaultOption = Options[0];
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
        <CircularProgressbarWithChildren styles={buildStyles(circleStyle)} value={percentage}     >
        <div style={{ fontSize: 12, marginTop: -5 }}>
    <strong>Seattle</strong> 66%</div>
        </CircularProgressbarWithChildren>
        </div>
        <div className="living-ind">
        <CircularProgressbarWithChildren styles={buildStyles(circleStyle)} value={percentage}     >
        <div style={{ fontSize: 12, marginTop: -5 }}>
    <strong>Boulder</strong> 66%</div>
        </CircularProgressbarWithChildren>
        </div>
        <div className="living-select">
        <div className='drop-list'> 
        <Select styles={customStyles} options={Options} value={defaultOption} placeholder="Select" maxMenuHeight={he}/>
         </div>
        <div className='city-field'></div>
        <form className="ref-city-form">
            <input className="ref-city-input" type="text" placeholder="Reference city" />
            <input  className="ref-city-submit"type="submit" />
            </form>
        
        </div>
        </div>
    );
}

export default LivingStandard;