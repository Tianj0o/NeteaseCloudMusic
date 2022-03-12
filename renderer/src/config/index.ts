import router from "@/router";
interface menuItem {
  name: string;
  path: string;
}
let defaultPath: string = "";
export const navMenuConfig: menuItem[] = [
  {
    name: "发现音乐",
    path: "/main/discoverMusic",
  },
  {
    name: "播客",
    path: "/main/podCast",
  },
  {
    name: "视频",
    path: "/main/video",
  },
  {
    name: "朋友",
    path: "/main/friends",
  },
  {
    name: "直播",
    path: "/main/liveBroadcast",
  },
];
const navMenufiles = import.meta.glob("../views/*/index.vue");
const setUpnavMenuRouters = () => {
  for (let index in navMenufiles) {
    const path = "/main/" + index.split("/")[2];
    //判断是否设置
    if (navMenuConfig.findIndex((item) => item.path === path) != -1) {
      router.addRoute("main", {
        name: index.split("/")[2],
        component: navMenufiles[index],
        path: "/main/" + index.split("/")[2],
      });
    }
  }
};
const discoverMusicfiles = import.meta.glob(
  "../views/discoverMusic/views/*.vue"
);
export const discoverMusicConfig: menuItem[] = [
  {
    name: "个性推荐",
    path: "/main/discoverMusic/personalRecommend",
  },
  {
    name: "专属定制",
    path: "/main/discoverMusic/exclusiveCustomization",
  },
  {
    name: "歌单",
    path: "/main/discoverMusic/songLists",
  },
  {
    name: "排行榜",
    path: "/main/discoverMusic/rankingList",
  },
  {
    name: "歌手",
    path: "/main/discoverMusic/singerPage",
  },
  {
    name: "最新音乐",
    path: "/main/discoverMusic/latestMusic",
  },
];

const setUpDiscoverMusicFiles = () => {
  for (let index in discoverMusicfiles) {
    const path =
      "/main/" + index.split("/")[2] + "/" + index.split("/")[4].slice(0, -4);
    if (!defaultPath) defaultPath = discoverMusicConfig[0].path;
    //判断是否有这个路由
    if (discoverMusicConfig.findIndex((item) => item.path === path) != -1) {
      // console.log((discoverMusicfiles as any)[index]);
      router.addRoute("discoverMusic", {
        component: (discoverMusicfiles as any)[index],
        path,
      });
    }
  }
};
export function setupRouters() {
  setUpnavMenuRouters();
  setUpDiscoverMusicFiles();
  router.beforeEach((to) => {
    if (to.path === "/main/discoverMusic") {
      return defaultPath;
    }
  });
}
