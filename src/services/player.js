import axios from "axios";

const searchByNameUrl = 'https://stormy-caverns-66892.herokuapp.com/api/players/';

const get = (name) => {
    let url = `${searchByNameUrl}${name}`;

    console.log('URL', url);

    axios.get(url, { mode: 'cors' })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => console.error(error));
}


export default { get };