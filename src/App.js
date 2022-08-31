import './App.css';
import React, { useState } from "react";
import playerQueryService from './services/player';
import summonerService from './services/summoner';
import matchIdService from './services/matchid';
import historyService from './services/history';

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
  const [matchHistoryArr, setMatchHistoryArr] = useState ([]);

  //function to search player
  function searchForPlayer(event) {
     event.preventDefault();
    playerQueryService.get(searchText)
      .then(response => {
        console.log('playerData', playerData);
        setPlayerData(response.data);
        printIconByRank(response.data.id);
        console.log(response.data);
        getMatchId(response.data.puuid)
        
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

   function getMatchId (puuid){
    matchIdService.get(puuid)
      .then(({data}) => {
        console.log(data)
        // getMatchHistoryData(data[0])
        for (let i = 0; i <data.length; i++){
          getMatchHistoryData(data[i])
        }
      })
   }

   function getMatchHistoryData (matchId){
     historyService.get(matchId)
     .then(({ data }) => {
          console.log(data)

         
          let checkForUser = data.info.participants.find(name=> name.summonerName === "mahkel")
          console.log("win?",checkForUser.win)
          console.log("Champion?", checkForUser.championName)
          console.log(`KDA?:  ${checkForUser.kills}/${checkForUser.deaths}/${checkForUser.assists}`)
          // console.log("queue id: ", data.info.queueId )
          console.log ("item", checkForUser.item0)
          console.log ("item", checkForUser.item1)
          console.log ("item", checkForUser.item2)
          console.log ("item", checkForUser.item3)
          console.log ("item", checkForUser.item4)
          console.log ("item", checkForUser.item5)
          console.log ("item", checkForUser.item6)
          

          if (data.info.queueId === 440){
            console.log("queue : RANKED FLEX")
          } else if (data.info.queueId === 450){
            console.log("queue : ARAM")
          }else if(data.info.queueId === 420){
            console.log("queue : RANKED SOLO QUEUE")
          }
          // setMatchHistoryArr (matchHistoryArr => [...matchHistoryArr, checkForUser.win.toString()])
          
        })
        
   }

   function displayHistory (){
  //  matchHistoryArr.forEach( winOrLose => {
  //   console.log(winOrLose)
  //  })
  console.log(matchHistoryArr)
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
            {/* <p>{displayHistory()}</p> */}
          </div>)}
    </div>
  )
}


export default App;