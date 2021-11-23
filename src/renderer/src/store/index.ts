import { createPinia } from "pinia";
import { defineStore } from "pinia";
const pinia = createPinia();
export const mainStore = defineStore("main", {
  state: () => {
    return {
      title: 123456,
      name: "qitianjia",
    };
  },
});
export default pinia;
