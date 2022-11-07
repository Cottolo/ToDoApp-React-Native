import axios from 'axios';

export const API = axios.create({
   baseURL : 'https://api.v2.kontenbase.com/query/api/v1/f6784197-6922-46e4-91b7-ba2196756c72/',
})

export const setAuthToken = (token) => {
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common["Authorization"];
    }
  };