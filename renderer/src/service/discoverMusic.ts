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

//每日推荐个人新歌单
export const getNewMusiclist = () => {
  return request.get({
    url: "personalized/newsongm",
  });
};

// 每日推荐新歌
export const getNewMusic = () => {
  return request.get({
    url: "/personalized/newsong?limit=100",
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

// 歌单排行榜
export const getToplist = () => {
  return request.get({
    url: "/toplist",
  });
};

// 热门歌单分类
export const getHotPlaylist = () => {
  return request.get({
    url: "/playlist/hot",
  });
};

// 所有歌单分类
export const getAllPlaylist = () => {
  return request.get({
    url: "/playlist/catlist",
  });
};

//获取分类歌单 cat limit offset
export const getTopPlaylist = (query?: string) => {
  return request.get({
    url: `top/playlist?${query}`,
  });
};
// 获取歌手信息
export const getArtistlist = ({
  type = -1,
  area = -1,
  initial = "-1",
  limit = 30,
  offset = 0,
}) => {
  return request.get({
    url: `/artist/list?type=${type}&area=${area}&initial=${initial}&limit=${limit}&offset=${offset}`,
  });
};

export const getXinGeSudi = (type = 0) => {
  return request.get({
    url: `/top/song?type=${type}`,
  });
};
