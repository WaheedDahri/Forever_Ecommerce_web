import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api/user", // dynamic base URL
});

export default API;
