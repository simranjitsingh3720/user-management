import axios from "axios";

// Create an instance of Axios with custom configuration
const instance = axios.create({
  baseURL: "https://dev-usermgmt.tataaig.com", // Base URL for requests
  timeout: 5000, // Timeout in milliseconds
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer <your_token>",
  //   },
});

export default instance;
