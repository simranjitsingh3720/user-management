import axios from "axios";
import { BASE_URL } from "../utils/globalConstants";

// Create an instance of Axios with custom configuration
const instance = axios.create({
  baseURL: BASE_URL, // Base URL for requests
  timeout: 5000, // Timeout in milliseconds
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer <your_token>",
  //   },
});

export default instance;
