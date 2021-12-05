import useStorage from "@/hooks/useStorage";
import { getMusicDetalis } from "@/service";
import { createPinia } from "pinia";
import { defineStore } from "pinia";
import { musicInfo } from "./type";
const pinia = createPinia();
export enum musicMode {
  SHUNXUBOFANG = "顺序播放",
  LIEBIAOXUNHUAN = "列表循环",
  DANQUXUNHUAN = "单曲循环",
  SUIJIBOFANG = "随机播放",
}
export const mainStore = defineStore("main", {
  state: () => {
    return {
      title: 123456,
      name: "qitianjia",
      musicLists: <musicInfo[]>[],
      currentMusic: <musicInfo>{},
      currentIndex: 0,
    };
  },
  actions: {
    initMusic() {
      console.log(123);
      this.currentMusic = this.musicLists[0] ?? {};
      this.currentIndex = 0;
    },
    async initMusicLists() {
      const { getStorage } = useStorage();
      const musicLists: musicInfo[] = getStorage("musicLists");
      if (musicLists) {
        const ids = musicLists.map((music) => music.songId);
        const res: any = await getMusicDetalis(ids.join(","));
        //一次获取多首歌的 接口返回顺序混乱 需要分辨id
        res.data.forEach((music: any) => {
          const findItem = musicLists.find((item) => item.songId === music.id);
          findItem!.songUrl = music.url;
        });
        if (musicLists) {
          this.musicLists = musicLists;
          this.currentMusic = this.musicLists[0];
        }
      }
    },
    changeToPrevious() {
      if (this.currentIndex === 0) {
        this.currentIndex = this.musicLists.length - 1;
      } else {
        this.currentIndex--;
      }
      this.currentMusic = this.musicLists[this.currentIndex];
    },
    changeToNext() {
      if (this.currentIndex === this.musicLists.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
      this.currentMusic = this.musicLists[this.currentIndex];
    },
    changToRandom() {
      const random = Math.floor(this.musicLists.length * Math.random());
      this.currentIndex = random;
      this.currentMusic = this.musicLists[this.currentIndex];
    },
    changToindex(index: number) {
      this.currentIndex = index;
      this.currentMusic = this.musicLists[this.currentIndex];
    },
    changAutoControl(type: string, mode: musicMode) {
      switch (mode) {
        case musicMode.DANQUXUNHUAN:
          this.currentMusic = this.currentMusic;
          break;
        case musicMode.LIEBIAOXUNHUAN:
          this.changeToNext();
          break;
        case musicMode.SHUNXUBOFANG:
          if (this.currentIndex < this.musicLists.length - 1) {
            this.changeToNext();
          } else {
            return true;
          }
        case musicMode.SUIJIBOFANG:
          this.changToRandom();
          break;
      }
    },
    changManalContro(type: string, mode: musicMode) {
      if (mode === musicMode.SUIJIBOFANG) {
        this.changToRandom();
      } else {
        if (type === "next") {
          this.changeToNext();
        } else if (type == "previous") {
          this.changeToPrevious();
        }
      }
    },
    clearMusicLists() {
      this.musicLists = [];
      this.currentIndex = 0;
      this.currentMusic = null as any;
    },
  },
});
export function setupStore() {
  mainStore().initMusicLists();
}
export default pinia;
