import router from "@/router";
import { disMusicStore } from "@/store/discoverMusic";
export const useToPage = () => {
  const handleMusiclistClick = async (id: number) => {
    if (id == 0) {
      const store = disMusicStore();
      await store.getDailyMusic();
    }
    router.push(`/main/musicList/${id}`);
  };

  return {
    handleMusiclistClick,
  };
};
