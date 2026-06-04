import axios from "axios";
import { ENV } from "@/config/env";
import { setupInterceptors } from "./interceptors";

const axiosInstance = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const client = setupInterceptors(axiosInstance);
export default client;
