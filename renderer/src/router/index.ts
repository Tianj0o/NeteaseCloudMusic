import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { historyCache } from "./historyCache";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    name: "main",
    path: "/main",
    component: () => import("@/views/main.vue"),
    // redirect: "/main/discoverMusic/personalRecommend",
    children: [
      {
        path: "/main/musicList/:id",
        component: () => import("@/views/discoverMusic/musicListPage.vue"),
      },
      {
        path: "/main/songResultPage/:query",
        component: () => import("@/components/main/songResultPage.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/main/setting",
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});
historyCache(router);
export default router;
