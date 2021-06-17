import axios from 'axios';

const api = axios.create({
  baseURL: 'https://correct.mengmota.com/api',
  timeout: 10000,
});

export default api;
