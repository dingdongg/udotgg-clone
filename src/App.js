import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import axios from 'axios';
import IMAGES from './images.js';



function App() {
  const [searchText, setSearchText] = useState ("");
  const [playerData, setPlayerData] = useState ({});
  const [playerRank, setPlayerRank] = useState ("");
  const API_KEY=  "RGAPI-e42d85ec-d3bc-487f-9573-ee6f5f5ae9d5";
  console.log(searchText)

  //function to search player
  function searchForPlayer(event){
    let APICallString="https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ searchText+"?api_key="+API_KEY;
    console.log(APICallString)
    axios.get(APICallString)
    .then(function(response){

      setPlayerData(response.data)
      
      
      
    }).catch((error)=> console.log(error))
   }

   //function to print the stuff from data given
  //  function printFromData(){
  //   console.log("Agfasdfasdf" , playerData)
  //    return JSON.stringify(playerData) != '{}' ? 

     
  //        <>
        
  //       <p>{playerData.name}</p>
  //       <p>{playerData.summonerLevel}</p>
  //       <img width = "100" height="100" src ={"http://ddragon.leagueoflegends.com/cdn/12.15.1/img/profileicon/"+ playerData.profileIconId +".png"}></img>
  //       <img width = "100" height="100" src = {'"'+ printIconByRank (playerData.id)+ '"'} alt = "icon"></img>
  //       {/* <img width = "100" height="100" src = "images/Emblem_Challenger.png" alt = "icon"></img> */}
  //       {/* <p>{playerRank}</p> */}
  //       </>
       
  //       :

  //       <><p>No player Data</p></> 
        
         
  //  }

   // this function is another api call which takes in the encripted riot id then from it, 
   //will have the string of the rank and print icon associated with it
   function printIconByRank(riotid){
    let APICallString ="https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/"+ riotid +"?api_key="+API_KEY
    axios.get(APICallString).then(function(response){

    
      console.log(response.data)

      let sizeOfData = response.data.length
      let hasMatch = false 
      let setIndex = 0

      for (let i = 0; i< sizeOfData; i++){
       
        let responseData = response.data[i]
        console.log("test",responseData.queueType)
      
       if (responseData.queueType == "RANKED_SOLO_5x5"){
        hasMatch = true;
        setIndex = i
        break;
        
       }else{
        hasMatch = false;
        
       }
      
      
      console.log(hasMatch)
      
      
    }
       
        if (hasMatch){

          let respData = response.data[setIndex]
          
           console.log("tier is " +respData.tier + " "+ respData.rank)
           setPlayerRank( respData.tier + " " + respData.rank)
           console.log(rankIcons (respData.tier))
           return rankIcons (respData.tier)
           
          // return response.data.tier + response.data.rank
        } else{
          console.log("unranked")
          setPlayerRank("UNRANKED")
        }


    })
   }
  

   //helper function for sorting the different rank icons
   function rankIcons (rankString){
    console.log (rankString)
    let image =""

    switch (rankString){
      case 'IRON':
        return "./images/Emblem_Iron.png"
      case 'BRONZE':
        return "./images/Emblem_Bronze.png"
      case 'SILVER':
        return "./images/Emblem_Silver.png"
      case 'GOLD':
        return "./images/Emblem_Gold.png"
      case 'PLATINUM':
        return "./images/Emblem_Platinum.png"
       
      case 'DIAMOND':
        image =  IMAGES.diamond
        break;
      
      case 'MASTER':
        return "./images/Emblem_Master.png"
      case 'GRANDMASTER':
        return "./images/Emblem_Grandmaster.png"  
      case 'CHALLENGER':
        image = IMAGES.challenger
        break;

    }

    return image
    

   }



   // just for enter key press
   const handleKeypress = e => {
    
  if (e.key === "Enter") {
    searchForPlayer(e)
    
  }
};

  //  console.log("player data is" ,playerData)
  //  console.log("player rank is" ,playerRank)

  return (
    <div className="App">
      
       <div className= "container">
          <h5>League of Legends Player Searcher</h5>
          
          <input type = "text" onChange={e => setSearchText(e.target.value)} onKeyPress={handleKeypress}>
            </input>
          
         
          <button onClick={e => searchForPlayer(e)} >Search For Player</button>
        </div>

    {JSON.stringify(playerData) != '{}' ? 

     
<>

<p>{playerData.name}</p>
<p>{playerData.summonerLevel}</p>


<img width = "100" height="100" src ={"http://ddragon.leagueoflegends.com/cdn/12.15.1/img/profileicon/"+ playerData.profileIconId +".png"}></img>
<img width = "100" height="100" src = { printIconByRank (playerData.id)} alt = "icon"></img>
{/* <img width = "100" height="100" src = {IMAGES.challenger} alt = "icon"></img> */}
<p>{playerRank}</p>
</>

:

<><p>No player Data</p></> }

    </div>
  )}




export default App;