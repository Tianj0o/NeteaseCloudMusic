import { music } from "@/store/type";
import TRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

export const request = new TRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  withCredentials: true,
});

export interface loginData {
  tel: string;
  password: string;
}

//登录
export const userLogin = (data: loginData) => {
  return request.post({
    url: `/login/cellphone?phone=${data.tel}&password=${data.password}`,
  });
};
//获取歌曲的url
export const getMusicUrl = (ids: string) => {
  return request.get<{ data: { url: string }[] }>({
    url: `/song/url?id=${ids}&br=320000`,
  });
};

//获取歌曲的信息
export const getMusicDetails = (ids: string) => {
  return request.get({
    url: `/song/detail?ids=${ids}`,
  });
};

// query keywords  limit  offset  type &
export const getSearchKeywords = (query: string) => {
  return request
    .get<{ result: { songs: music[] } }>({
      url: `/cloudsearch?keywords=${query}`,
    })
    .then((res) => res.result.songs);
};
