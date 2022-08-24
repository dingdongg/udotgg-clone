import axios from "axios";

const searchByNameUrl = 'https://stormy-caverns-66892.herokuapp.com/api/players/';

const get = (name) => {
    let url = `${searchByNameUrl}${name}`;

    return axios.get(url);
}

const methods = {
    get,
}

export default methods;