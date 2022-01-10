import {
  getBannerData,
  getDailyMusic,
  getNewMusiclist,
} from "@/service/discoverMusic";
import useStorage from "@/hooks/useStorage";
import { defineStore } from "pinia";
import type { music } from "./type";
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
    },
  },
});
