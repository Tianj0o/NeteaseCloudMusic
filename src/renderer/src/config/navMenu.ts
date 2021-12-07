interface menuItem {
  name: string;
  router: string;
}
export const navMenuConfig: menuItem[] = [
  {
    name: "发现音乐",
    router: "/main/findMusic",
  },
  {
    name: "播客",
    router: "/main/boke",
  },
  {
    name: "视频",
    router: "/main/video",
  },
  {
    name: "朋友",
    router: "/main/friends",
  },
  {
    name: "直播",
    router: "/main/zhibo",
  },
];
