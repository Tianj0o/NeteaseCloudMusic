import { Router } from "vue-router";
import { useRouterToHistory } from "@/hooks/useHistoryRoute";
import { emitter } from "@/mitt";
const { addBackwradList } = useRouterToHistory();

export function historyCache(router: Router) {
  let isHistory = false;
  router.beforeEach((to, from) => {
    emitter.on("historyRoute", () => {
      isHistory = true;
    });
  }),
    router.afterEach((to, from) => {
      if (to.fullPath === from.fullPath) return;
      if (from.fullPath != "/" && isHistory === false) {
        addBackwradList(from);
      } else {
        isHistory = false;
      }
    });
}
