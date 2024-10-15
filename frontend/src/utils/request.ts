// src/utils/request.ts

import axios from 'axios';

const request = axios.create({
    baseURL: 'https://api.sayido.lk', // Set the base URL here
    withCredentials: true,            // Include cookies in every request
    headers: {
        'Content-Type': 'application/json',
    },
});

export default request;
