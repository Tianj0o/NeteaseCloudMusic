import TRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

export const request = new TRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  withCredentials: true,
});

//获取歌曲的url
export const getMusicDetalis = (ids: string) => {
  return request.get({
    url: `/song/url?id=${ids}`,
  });
};
export interface loginData {
  tel: string;
  password: string;
}
export const userLogin = (data: loginData) => {
  return request.post({
    url: `/login/cellphone?phone=${data.tel}&password=${data.password}`,
  });
};
