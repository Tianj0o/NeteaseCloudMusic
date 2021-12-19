import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    name: "main",
    path: "/main",
    component: () => import("@/views/main.vue"),
    children: [
      {
        path: "/main/musicList/:id",
        component: () => import("@/views/discoverMusic/musicListPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
