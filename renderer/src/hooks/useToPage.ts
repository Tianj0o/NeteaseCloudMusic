import router from "@/router";
export const useToPage = () => {
  const handleMusiclistClick = async (id: number) => {
    router.push(`/main/musicList/${id}`);
  };

  return {
    handleMusiclistClick,
  };
};
