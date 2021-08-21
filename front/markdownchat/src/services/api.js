import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: API_URL,
});

api.defaults.headers.common = {};

export { api };