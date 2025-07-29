import axios from 'axios';

const api = axios.create({
    baseURL: 'bodylog-api-e9eabfb0fpe8bpeg.westeurope-01.azurewebsites.net/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;