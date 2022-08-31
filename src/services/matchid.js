import axios from "axios";

const searchByPuuidUrl = 'https://stormy-caverns-66892.herokuapp.com/api/matchId/';

const get = (puuid) => {
    let url = `${searchByPuuidUrl}${puuid}`;

    return axios.get(url);
}

const methods = {
    get,
}

export default methods;