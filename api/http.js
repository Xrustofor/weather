import axios from "axios";

// https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=f33df4588bbe2c1f26eea4f1920ecbe0
// https://api.openweathermap.org/data/2.5/forecast?q=London&type=like&sort=population&cnt=5&lang=ua&appid=f33df4588bbe2c1f26eea4f1920ecbe0

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// http://api.openweathermap.org/geo/1.0/direct?appid=f33df4588bbe2c1f26eea4f1920ecbe0

// http://api.openweathermap.org/geo/1.0/direct?

// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=f33df4588bbe2c1f26eea4f1920ecbe0

// https://www.bigdatacloud.com/ api_key=bdc_6956bfeae90d456e96a6b6deea28181e

// yz/xPn9O34dk19wl5r5mRQ==W4jnOQbGRdFHKcKz


// HbPdgKWqmCwMeiov  2f871f75e8d7552e4a412f7b7d88b5558fefdb32

// google AIzaSyAUJSYJXIK90550ugzRNFphCFhhovjMNkQ


const baseURL = import.meta.env.VITE_API_URL || '/'

export const http = axios.create({
    baseURL
  });

  http.interceptors.response.use(
    res => res.data,
    err => {
      if (err.response && typeof err.response.data === "string") {
        return throwBackendError(err);
      } else {
        return Promise.reject(err);
      }
    }
  );