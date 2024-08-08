import axios from "axios";

export const fetchResponse = (query) =>
  axios.post("http://localhost:5000/api/query", { query });

export const publishResponse = (query, response) =>
  axios.post("http://localhost:5000/api/publish", { query, response });
