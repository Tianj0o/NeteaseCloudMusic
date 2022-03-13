import { Router } from "vue-router";
import { useRouterToHistory } from "@/hooks/useHistoryRoute";
const { addBackwradList } = useRouterToHistory();
export function historyCache(router: Router) {
  router.afterEach((to, from) => {
    if (from.fullPath != "/") {
      addBackwradList(from);
    }
  });
}
