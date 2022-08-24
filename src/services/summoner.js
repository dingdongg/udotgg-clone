import axios from 'axios';

const searchByIdUrl = 'https://stormy-caverns-66892.herokuapp.com/api/summoners/';

const get = (id) => {
    let url = `${searchByIdUrl}${id}`;

    return axios.get(url);
}

const methods = {
    get,
}

export default methods;