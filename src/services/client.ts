import axios from "axios";

export const client = axios.create({
  baseURL: "https://6a198d06489e4715751a18af.mockapi.io",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 10000,
});
