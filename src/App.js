import './App.css';
import React, { useState } from "react";
import playerQueryService from './services/player';
import summonerService from './services/summoner';

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
    <div className="App">
      <div className= "container">
        <h5>League of Legends Player Searcher</h5>
        <form onSubmit={(e) => searchForPlayer(e)}>
          <input type = "text" onChange={e => setSearchText(e.target.value)}>
          </input>
          <button type='submit'>Search For Player</button>
        </form>
      </div>
      {((!playerData.name) ? 
          '' : 
          <div>
            <p>{playerData.name}, level {playerData.summonerLevel}</p>
            <img src={icons[playerRank]} alt={playerRank} />
            <img src={"http://ddragon.leagueoflegends.com/cdn/12.15.1/img/profileicon/"+ playerData.profileIconId +".png"} alt="player icon" />
          </div>)}
    </div>
  )
}


export default App;