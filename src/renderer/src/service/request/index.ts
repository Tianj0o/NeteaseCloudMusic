import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL, TIME_OUT } from "./config";

class TRequest {
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.instance.interceptors.response.use((res: AxiosResponse) => {
      return res.data;
    });
  }
  request(config: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  get(config: AxiosRequestConfig) {
    return this.request({ ...config, method: "GET" });
  }
  post(config: AxiosRequestConfig) {
    return this.request({ ...config, method: "POST" });
  }
}

export default TRequest;
