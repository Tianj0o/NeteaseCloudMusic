import {
  getBannerData,
  getDailyMusic,
  getDailyPlayList,
} from "@/service/discoverMusic";
import useStorage from "@/hooks/useStorage";
import { defineStore } from "pinia";
export interface bannerData {
  imageUrl: string;
  targetId: number;
}
export interface playList {
  name: string;
  id: number;
  picUrl: string;
}
export const disMusicStore = defineStore("disMusic", {
  state: () => {
    return {
      bannerListsData: <bannerData[]>[],
      dailyPlaylist: <playList[]>[], //每日推荐歌单
      daiyluMusic: <playList[]>[], //每日推荐歌曲
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
    //每日推荐
    async getDailyPlayListData() {
      const { recommend } = await getDailyPlayList();
      const data2 = await getDailyMusic();
      this.dailyPlaylist = recommend ?? [];
      console.log(data2, 2);
      if (data2?.data?.dailySongs) {
        this.daiyluMusic = data2.data.dailySongs;
      }
      const { setStorage } = useStorage();
      // console.log(this.dailyPlaylist);
      if (this.dailyPlaylist.length > 0) {
        setStorage("dailyPlayList", this.dailyPlaylist);
      }
    },
  },
});
