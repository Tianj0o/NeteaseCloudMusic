import { createPinia } from "pinia";
import { defineStore } from "pinia";
import { musicInfo } from "./type";
const pinia = createPinia();
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
    changCurrentMusic(type: string) {
      if (type === "previous") {
        if (this.currentIndex === 0) {
          this.currentIndex = this.musicLists.length - 1;
        } else if (this.currentIndex) {
          this.currentIndex--;
        }
        this.currentMusic = this.musicLists[this.currentIndex];
      } else if (type === "next") {
        if (this.currentIndex < this.musicLists.length - 1) {
          this.currentIndex++;
        } else if (this.currentIndex === this.musicLists.length - 1) {
          this.currentIndex = 0;
        }
        this.currentMusic = this.musicLists[this.currentIndex];
      }
    },
  },
});
export default pinia;
