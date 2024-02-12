import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:3500",
});

api.interceptors.request.use(
    (config) => {
      const accessToken = Cookies.get('accessToken');
  
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default api;
