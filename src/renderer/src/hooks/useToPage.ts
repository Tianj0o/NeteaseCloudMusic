import { getPlaylistAll } from "@/service/discoverMusic";
import router from "@/router";
// 点击某一歌单获取数据并跳转页面
export const useToPage = () => {
  const handleMusiclistClick = async (id: number) => {
    // const musicListdata = await getPlaylistAll(id);

    console.log("tiaozhuan");
  };

  return {
    handleMusiclistClick,
  };
};
