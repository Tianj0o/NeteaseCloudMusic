import router from "@/router";
import { useHisRoute } from "./useHistoryRoute";
const { addHisRoute } = useHisRoute();
export const useToPage = () => {
  const handleMusiclistClick = (id: number) => {
    addHisRoute(`/main/musicList/${id}`);
    router.push(`/main/musicList/${id}`);
  };

  return {
    handleMusiclistClick,
  };
};
