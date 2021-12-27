import router from "@/router";
import { useHisRoute } from "./useHistoryRoute";
const { addHisRoute } = useHisRoute();
export const useToPage = () => {
  const handleMusiclistClick = (id: number) => {
    // 每日推荐单独处理
    if (id === 0) {
      // router.push()
    }
    addHisRoute(`/main/musicList/${id}`);
    router.push(`/main/musicList/${id}`);
  };

  return {
    handleMusiclistClick,
  };
};
