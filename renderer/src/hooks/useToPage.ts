import router from "@/router";
export const useToPage = () => {
  const handleMusiclistClick = (id: number) => {
    router.push(`/main/musicList/${id}`);
  };

  return {
    handleMusiclistClick,
  };
};
