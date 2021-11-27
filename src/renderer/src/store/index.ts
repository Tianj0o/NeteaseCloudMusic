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
      currentMusic: <musicInfo | null>{},
    };
  },
});
export default pinia;
