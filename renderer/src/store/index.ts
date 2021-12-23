import useStorage from "@/hooks/useStorage";
import { getMusicUrl, loginData, userLogin } from "@/service";
import { createPinia } from "pinia";
import { defineStore } from "pinia";
import { music } from "./type";
const pinia = createPinia();
export enum musicMode {
  SHUNXUBOFANG = "顺序播放",
  LIEBIAOXUNHUAN = "列表循环",
  DANQUXUNHUAN = "单曲循环",
  SUIJIBOFANG = "随机播放",
}
const { getStorage } = useStorage();
export const mainStore = defineStore("main", {
  state: () => {
    return {
      name: "",
      id: 0,
      musicLists: <music[]>[],
      currentMusic: <music>{},
      currentIndex: 0,
      avatarUrl: "",
    };
  },
  actions: {
    async loginAction(data: loginData) {
      const resData: any = await userLogin(data);
      this.id = resData?.profile?.userId;
      this.name = resData?.profile?.nickname;
      this.avatarUrl = resData?.profile?.avatarUrl;
      const { setStorage } = useStorage();
      setStorage("id", this.id);
      setStorage("avatarUrl", this.avatarUrl);
      setStorage("name", this.name);
      console.log("登陆成功");
    },
    initLoginInfo() {
      const { getStorage } = useStorage();
      this.avatarUrl = getStorage("avatarUrl");
      this.id = getStorage("id");
      this.name = getStorage("name");
    },
    initMusic() {
      this.currentIndex = getStorage("currentIndex") ?? 0;
      this.currentMusic = this.musicLists[this.currentIndex] ?? {};
    },
    async initMusicLists() {
      const { getStorage } = useStorage();
      const musicLists: music[] = getStorage("musicLists");
      if (musicLists) {
        this.musicLists = musicLists;
      }
      this.initMusic();
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
  mainStore().initLoginInfo();
}
export default pinia;