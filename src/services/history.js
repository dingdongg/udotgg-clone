import axios from "axios";

const searchByMatchIdUrl = 'https://stormy-caverns-66892.herokuapp.com/api/history/';

const get = (matchid) => {
    let url = `${searchByMatchIdUrl}${matchid}`;

    return axios.get(url);
}

const methods = {
    get,
}

export default methods;