import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-cbb2d.firebaseio.com/'

});

export default instance;