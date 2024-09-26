// src/utils/request.ts

import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:4000', // Set the base URL here
    withCredentials: true,            // Include cookies in every request
    headers: {
        'Content-Type': 'application/json',
    },
});

export default request;
