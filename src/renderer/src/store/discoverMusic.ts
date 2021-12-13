import { getBannerData } from "@/service/discoverMusic";
import { defineStore } from "pinia";
export interface bannerData {
  imageUrl: string;
  targetId: number;
}
export const disMusicStore = defineStore("disMusic", {
  state: () => {
    return {
      bannerListsData: <bannerData[]>[],
    };
  },
  actions: {
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
  },
});
