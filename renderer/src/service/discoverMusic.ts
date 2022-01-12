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
    // url: "/personalized/newsong",
  });
};

//每日推荐歌曲(登录)

export const getDailyMusic = () => {
  return request.get({
    url: "/recommend/songs",
  });
};

//每日推荐新歌单
export const getNewMusiclist = () => {
  return request.get({
    url: "personalized/newsongm",
  });
};

// 每日推荐新歌
export const getNewMusic = () => {
  return request.get({
    url: "/personalized/newsong",
  });
};

// 歌单分类
export const getMusiclistHot = () => {
  return request.get({
    url: "/playlist/hot",
  });
};

// 歌单
///top/playlist query ?limit=10 & order=new or hot  & cat 分类 华语
export const getMusicListHotData = (query: string) => {
  return request.get({
    url: `/top/playlist?${query}`,
  });
};
// 歌单具体歌曲 playlist/track/all
export const getPlaylistAll = (id: number) => {
  return request.get({
    url: `playlist/track/all?id=${id}`,
  });
};

// 获取某个歌单的详情

export const getPlaylistDetails = (id: number) => {
  return request.get({
    url: `/playlist/detail?id=${id}`,
  });
};

// 获取用户喜欢音乐的列表
//添加时间戳 防止缓存
export const getUserLikelist = (id: number) => {
  const time = Date.now();
  return request.get<{ ids: number[] }>({
    url: `/likelist?uid=${id}&timestamp=${time}`,
  });
};

// 喜欢音乐
//添加时间戳 防止缓存

export const likeMusic = (id: string) => {
  const time = Date.now();

  return request.get({
    url: `/like?id=${id}&timestamp=${time}`,
  });
};
