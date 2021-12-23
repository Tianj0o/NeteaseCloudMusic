import router from "@/router";
import { disMusicStore } from "@/store/discoverMusic";
let currentIndex = 0;
export const useToPage = () => {
  const handleMusiclistClick = (id: number, index?: number) => {
    router.push(`/main/musicList/${id}`);
    if (index !== undefined) {
      currentIndex = index;
    }
  };

  return {
    handleMusiclistClick,
  };
};
