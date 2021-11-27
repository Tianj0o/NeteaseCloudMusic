import TRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

export const request = new TRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});
