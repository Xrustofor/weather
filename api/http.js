import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || '/';
 const http = axios.create({
    baseURL
  });

  http.interceptors.response.use(
    res => {
      return res.data
    },
    err => {
      if (err.response && typeof err.response.data === "string") {
        return throwBackendError(err);
      } else {
        return Promise.reject(err);
      }
    }
  );

  export default http