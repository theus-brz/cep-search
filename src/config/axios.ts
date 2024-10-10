import axios from "axios";
import { BASE_URL as baseURL } from "./config";

const api = axios.create({
  baseURL
});

export { api };