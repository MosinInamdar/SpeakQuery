import axios from "axios";

export const fetchResponse = (query) =>
  axios.post("https://speakquery.onrender.com/api/query", { query });

export const publishResponse = (query, response) =>
  axios.post("https://speakquery.onrender.com/api/publish", {
    query,
    response,
  });
