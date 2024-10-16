// src/utils/request.ts

import axios from 'axios';

const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Set the base URL here
    withCredentials: true,            // Include cookies in every request
    headers: {
        'Content-Type': 'application/json',
    },
});

export default request;
