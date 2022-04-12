import useStorage from "@/hooks/useStorage";
import { isLogin, loginData, userLogin } from "@/service";
import { getUserLikelist } from "@/service/discoverMusic";
import { createPinia } from "pinia";
import { defineStore } from "pinia";
import { disMusicStore } from "./discoverMusic";
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
      userLikelists: <number[]>[],
      login: false,
    };
  },
  actions: {
    async loginAction(data: loginData) {
      const resData: any = await userLogin(data);
      const { code } = resData;
      if (code !== 200) {
        console.log("登录出错");
      } else {
        this.id = resData?.profile?.userId;
        this.name = resData?.profile?.nickname;
        this.avatarUrl = resData?.profile?.avatarUrl;
        this.login = true;
        const { setStorage } = useStorage();
        setStorage("id", this.id);
        setStorage("avatarUrl", this.avatarUrl);
        setStorage("name", this.name);
        setStorage("login", true);
        disMusicStore().getDailyPlayListData();
      }
    },
    initLoginInfo() {
      const { getStorage } = useStorage();
      this.avatarUrl = getStorage("avatarUrl") ?? "";
      this.id = getStorage("id") ?? 0;
      this.name = getStorage("name") ?? "";
      this.login = getStorage("login") ?? false;
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
    //用户喜欢列表
    async getUserLikelistData() {
      if (this.login) {
        const data = await getUserLikelist(this.id);
        this.userLikelists = data.ids;
      } else {
        this.userLikelists = [];
      }
    },
    async isUserLogin() {
      const data = await isLogin();
      if (!data.data.account) {
        const { clearStorage, deleteStorage } = useStorage();
        //todo
        deleteStorage("musicLists");
        deleteStorage("currentIndex");
        deleteStorage("currentMenu");
        deleteStorage("dailyPlayList");
        deleteStorage("id");
        deleteStorage("avatarUrl");
        deleteStorage("name");
        deleteStorage("login");
        this.login = false;
        console.log("清除成功");
      }
    },
    userLoginOut() {
      const { clearStorage, deleteStorage } = useStorage();
      //todo
      deleteStorage("musicLists");
      deleteStorage("currentIndex");
      deleteStorage("currentMenu");
      deleteStorage("dailyPlayList");
      deleteStorage("id");
      deleteStorage("avatarUrl");
      deleteStorage("name");
      deleteStorage("login");
      this.login = false;
      setupStore();
      disMusicStore().getDailyPlayListData();
      console.log("退出登录");
    },
  },
});
export function setupStore() {
  mainStore().initMusicLists();
  mainStore().initLoginInfo();
  mainStore().getUserLikelistData();
}
export default pinia;
