export interface musicInfo {
  songName: string;
  songAuthor: string;
  songUrl: string;
  songTime: number;
  songId: number;
  picUrl: string;
}

export interface song {
  name: string;
  id: number;
  picUrl: string;
  trackCount: number;
  playCount: number;
}

export interface music {
  name: string;
  id: number;
  ar: { name: string }[];
  dt: number;
  al: { name: string };
}
