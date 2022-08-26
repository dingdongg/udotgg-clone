import React from 'react';
import {FaBars} from "react-icons/fa";
import ugglogo from "../icons/ugglogo.PNG";
const TopbarDefault = () =>{
    return (
    <div className="header">

        <div className='left-header' >
            <div className ="bars">
                <FaBars/>
            </div>
        
        <div className ="logo">
            <img src ={ugglogo} width="128px"height="48px"></img>

        </div>

        </div>
        


       
       </div>
    )

};

export default TopbarDefault;