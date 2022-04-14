import { RouteLocationNormalized } from "vue-router";
import { ref, watch } from "vue";
import { emitter } from "@/mitt";
import router from "@/router";

const MAX_CACHE = 10;
const forwradList = ref<RouteLocationNormalized[]>([]),
  backwardList = ref<RouteLocationNormalized[]>([]);
export function useRouterToHistory() {
  function check(name: string) {
    return router.hasRoute(name);
  }

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
      let current = backwardList.value.pop();

      while (!check(current?.name as string) && backwardList.value.length) {
        current = backwardList.value.pop();
      }

      if (current) {
        emitter.emit("historyRoute", current);
      }
    },
    // 前进
    goFor(currentRoute: RouteLocationNormalized) {
      backwardList.value.push(currentRoute);

      let current = forwradList.value.pop();
      while (!check(current?.name as string) && forwradList.value.length) {
        current = forwradList.value.pop();
      }
      if (current) {
        emitter.emit("historyRoute", current);
      }
    },
    getLength(type: "back" | "for") {
      return type === "back"
        ? backwardList.value.length
        : forwradList.value.length;
    },
    getAllLength() {
      return backwardList.value.length + forwradList.value.length;
    },
  };
}
