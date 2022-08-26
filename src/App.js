import './App.css';
import React, { useState } from "react";
import playerQueryService from './services/player';
import summonerService from './services/summoner';
import Sidebar from './components/Sidebar';
import TopbarDefault from './components/TopBarDefault';
import MiddleDefault from './components/MiddleDefault';

const reqImages = require.context('./images/rank_icons/', true, /\.png$/);
const paths = reqImages.keys();

const icons = paths.reduce((images, path) => {
  images[path.slice(9, -4).toUpperCase()] = reqImages(path);
  return images;
}, {});

function App() {
  const [searchText, setSearchText] = useState ("");
  const [playerData, setPlayerData] = useState ({});
  const [playerRank, setPlayerRank] = useState ("");

  //function to search player
  function searchForPlayer(event) {
    event.preventDefault();
    playerQueryService.get(searchText)
      .then(response => {
        console.log('playerData', playerData);
        setPlayerData(response.data);
        printIconByRank(response.data.id);
        console.log(response.data);
      })
      .catch(e => console.error(e));
  }

   // this function is another api call which takes in the encripted riot id then from it, 
   //will have the string of the rank and print icon associated with it
   function printIconByRank(riotid){
    
    summonerService.get(riotid)
      .then(({ data }) => {
        const soloQueue = data.filter(queue => {
          return queue.queueType === "RANKED_SOLO_5x5";
        });
        
        if (soloQueue[0]) {
          console.log(soloQueue);
          setPlayerRank(soloQueue[0].tier);
        } else {
          setPlayerRank("UNRANKED");
        }
      })
      .catch(error => console.error(error));
   }

  return (
    <div className='container'>
      <TopbarDefault/>
      <Sidebar/>
      <MiddleDefault/>
    </div>
  )
}


export default App;