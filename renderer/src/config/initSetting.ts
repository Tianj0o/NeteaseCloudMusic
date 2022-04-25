import useStorage from "@/hooks/useStorage";
import router from "@/router";
import { ref } from "vue";
import { menuItem } from ".";
export const defaultMenuConfig: menuItem[] = [
  {
    name: "发现音乐",
    path: "/main/discoverMusic",
    isChecked: true,
    children: [
      {
        name: "个性推荐",
        path: "/main/discoverMusic/personalRecommend",
        isChecked: true,
      },
      {
        name: "专属定制",
        path: "/main/discoverMusic/exclusiveCustomization",
        isChecked: true,
      },
      {
        name: "歌单",
        path: "/main/discoverMusic/songLists",
        isChecked: true,
      },
      {
        name: "排行榜",
        path: "/main/discoverMusic/rankingList",
        isChecked: true,
      },
      {
        name: "歌手",
        path: "/main/discoverMusic/singerPage",
        isChecked: true,
      },
      {
        name: "最新音乐",
        path: "/main/discoverMusic/latestMusic",
        isChecked: true,
      },
    ],
  },
  {
    name: "播客",
    path: "/main/podCast",
    isChecked: true,
  },
  {
    name: "视频",
    path: "/main/video",
    isChecked: true,
  },
  {
    name: "朋友",
    path: "/main/friends",
    isChecked: true,
  },
  {
    name: "直播",
    path: "/main/liveBroadcast",
    isChecked: true,
  },
  {
    name: "设置",
    path: "/main/setting",
    isChecked: true,
  },
];
const navMenuConfig = ref<menuItem[]>(
  JSON.parse(JSON.stringify(defaultMenuConfig))
);

export function setupNavMenuConfig() {
  const { getStorage } = useStorage();
  const storageConfig = getStorage("navMenuConfig");
  if (storageConfig) {
    navMenuConfig.value = storageConfig;
  }
}

const navMenufiles = import.meta.glob("../views/*/index.vue");
export const setupNavMenuRouters = () => {
  for (let index in navMenufiles) {
    const path = "/main/" + index.split("/")[2];

    //判断是否设置
    if (shouldAdd(navMenuConfig.value, path)) {
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
export let defaultPath: string = navMenuConfig.value.find(
  (item) => item.isChecked === true
)!.path;
export const setupDiscoverMusic = () => {
  const discoverMusicConfig = navMenuConfig.value.find(
    (item) => item.path === "/main/discoverMusic"
  )?.children;
  if (discoverMusicConfig) {
    for (let index in discoverMusicfiles) {
      const path =
        "/main/" + index.split("/")[2] + "/" + index.split("/")[4].slice(0, -4);
      //判断是否有这个路由

      if (shouldAdd(discoverMusicConfig, path)) {
        // console.log((discoverMusicfiles as any)[index]);
        defaultPath = path;
        router.addRoute("discoverMusic", {
          component: (discoverMusicfiles as any)[index],
          path,
          name: path.split("/")[3],
        });
      }
    }
  }
  // console.log(router.getRoutes());
};
function shouldAdd(config: menuItem[], path: string) {
  return config.find((item) => item.path === path)?.isChecked;
}
export { navMenuConfig };
