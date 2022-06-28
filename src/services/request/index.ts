import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:3000'
    baseURL: 'https://hackathon-laravel-api.herokuapp.com/api'
});

export default api;