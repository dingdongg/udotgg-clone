import React from 'react';
import video from '../videos/ugg-app-landing.webm'
import logo from '../icons/UGG_Logo_Blue_3.svg'
import {FaWindows,FaSearch} from "react-icons/fa";
import "@fontsource/barlow";

const MiddleDefault = () =>{
    return (
        <div className="middle-area">


       <form >
 <input type="text" className="search" placeholder="Search Yourself or a Champion " />
       
        <button type='submit' > <FaSearch/> </button>
        
        
       </form>
       
       
        

       

        
        < img src={logo} className='logoMiddle' alt="logo" width="245px" height="86"></img>
        <h1 >THE APP IS HERE.</h1>
        <button type='button' > <FaWindows/> Download Now</button>
        
       
      
        

        <video autoPlay loop muted className='video-area'>
         <source type="video/webm" src={video}/>
        </video>

        
     </div>
        
    )

};

export default MiddleDefault;