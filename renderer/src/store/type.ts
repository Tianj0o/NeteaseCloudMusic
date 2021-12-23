export interface music {
  name: string; // 歌曲名
  id: number; //歌曲id
  ar: { name: string }[]; //歌手 名
  dt: number; //歌曲时间
  al: { name: string; picUrl: string }; // 歌曲专辑名 图片
  url?: string;
}
