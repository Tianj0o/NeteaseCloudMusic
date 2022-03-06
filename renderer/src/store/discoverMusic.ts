import {
  getBannerData,
  getDailyMusic,
  getMusicListHotData,
  getNewMusiclist,
  getPlaylistAll,
} from "@/service/discoverMusic";
import useStorage from "@/hooks/useStorage";
import { defineStore } from "pinia";
import type { music } from "./type";
import { mainStore } from ".";
export interface bannerData {
  imageUrl: string;
  targetId: number;
}
export interface playList {
  name: string;
  id: number;
  picUrl: string;
  trackCount: number;
  playCount: number;
}
export const disMusicStore = defineStore("disMusic", {
  state: () => {
    return {
      bannerListsData: <bannerData[]>[],
      dailyPlaylist: <playList[]>[], //每日推荐歌单
      daiyluMusic: <music[]>[], //每日推荐歌曲
    };
  },
  actions: {
    //banner
    async getBannerListData() {
      const data = await getBannerData();
      const { banners } = data;
      if (banners) {
        let list: bannerData[] = [];
        (banners as bannerData[]).forEach((banner) => {
          list.push({
            imageUrl: banner.imageUrl,
            targetId: banner.targetId,
          });
        });
        this.bannerListsData = list;
      }
    },
    //每日推荐 歌曲&歌单
    async getDailyPlayListData() {
      const store = mainStore();
      // 未登录
      if (!store.login) {
        // 数据属性名不一样 做一些处理
        const { playlists } = await getMusicListHotData();
        const { id } = playlists.pop();
        const { songs } = await getPlaylistAll(id);
        this.daiyluMusic = songs;
        playlists.forEach((item: any) => {
          item.picUrl = item.coverImgUrl;
        });
        this.dailyPlaylist = playlists;
      } else {
        // 登录
        // const { recommend } = await getDailyPlayList();
        const data2 = await getDailyMusic();
        const { result } = await getNewMusiclist();

        this.dailyPlaylist = result ?? [];
        if (data2?.data?.dailySongs) {
          this.daiyluMusic = data2.data.dailySongs;
        }
        const { setStorage } = useStorage();
        if (this.dailyPlaylist.length > 0) {
          setStorage("dailyPlayList", this.dailyPlaylist);
        }
      }
    },
  },
});
