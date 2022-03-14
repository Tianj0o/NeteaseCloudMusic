import { RouteLocationNormalized, useRouter } from "vue-router";
import { ref } from "vue";
import { emitter } from "@/mitt";

const MAX_CACHE = 10;
const forwradList = ref<RouteLocationNormalized[]>([]),
  backwardList = ref<RouteLocationNormalized[]>([]);

export function useRouterToHistory() {
  return {
    addForward(route: RouteLocationNormalized) {
      route.meta.isHistory = true;
      forwradList.value.push(route);
    },
    addBackwradList(route: RouteLocationNormalized) {
      if (backwardList.value.length == 0) {
        forwradList.value.length = 0;
      }
      route.meta.isHistory = true;
      backwardList.value.push(route);
    },
    // 后退
    goBack(currentRoute: RouteLocationNormalized) {
      forwradList.value.push(currentRoute);
      const current = backwardList.value.pop();
      if (current) {
        emitter.emit("historyRoute", current);
      }
    },
    // 前进
    goFor(currentRoute: RouteLocationNormalized) {
      backwardList.value.push(currentRoute);
      const current = forwradList.value.pop();
      if (current) {
        emitter.emit("historyRoute", current);
      }
    },
    getLength(type: "back" | "for") {
      return type === "back" ? backwardList : forwradList;
    },
  };
}
