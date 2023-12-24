import axios from "axios";
const token = localStorage.getItem('token');
console.log('final test of token ',token);

const http = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "abc": "sad",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

// Get the token from localStorage or wherever you store it

// If the token is available, set it in the Authorization header
console.log('token is ',token);

if (token) {
  http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default http;
