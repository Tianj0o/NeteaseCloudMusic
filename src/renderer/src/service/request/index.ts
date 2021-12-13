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
  request<T = any>(config: AxiosRequestConfig) {
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  get<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: "POST" });
  }
}

export default TRequest;
