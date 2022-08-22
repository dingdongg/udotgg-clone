import axios from "axios";

const searchByNameUrl ='https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';

const get = (name) => {
    let url = `${searchByNameUrl}${name}?api_key=${process.env.API_KEY}`;

    axios.get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => console.error(error));
}


export default { get };