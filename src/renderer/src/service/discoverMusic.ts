import { request } from "./";

//轮播图
export const getBannerData = () => {
  return request.get({
    url: "/banner",
  });
};

//每日推荐的歌单（登录）

export const getDailyPlayList = () => {
  return request.get({
    url: "/recommend/resource",
  });
};

//每日推荐歌曲(登录)

export const getDailyMusic = () => {
  return request.get({
    url: "/recommend/songs",
  });
};
