import { RouteLocationNormalized, useRouter } from "vue-router";
import { ref } from "vue";
import { emitter } from "@/mitt";

const MAX_CACHE = 10;
const forwradList = ref<RouteLocationNormalized[]>([]),
  backwardList = ref<RouteLocationNormalized[]>([]);
const router = useRouter();

export function useRouterToHistory() {
  return {
    addForward(route: RouteLocationNormalized) {
      forwradList.value.push(route);
    },
    addBackwradList(route: RouteLocationNormalized) {
      if (backwardList.value.length == 0) {
        forwradList.value.length = 0;
      }
      backwardList.value.push(route);
      console.log(backwardList.value);
    },
    // 后退
    goBack() {
      const current = backwardList.value.pop();
      if (current) {
        forwradList.value.push(current);
        emitter.emit("historyRoute", current.fullPath);
      }
    },
    // 前进
    goFor() {
      const current = forwradList.value.pop();
      if (current) {
        backwardList.value.push(current);
        emitter.emit("historyRoute", current.fullPath);
      }
    },
    getLength(type: "back" | "for") {
      return type === "back" ? backwardList : forwradList;
    },
  };
}
