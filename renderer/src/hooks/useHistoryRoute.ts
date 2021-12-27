const hisRoutes: string[] = [];
let currentIndex = 0;
import router from "@/router";
export function useHisRoute() {
  const addHisRoute = (path: string) => {
    hisRoutes.push(path);
    console.log(hisRoutes);
  };
  const clearHisRoute = () => {
    hisRoutes.length = 0;
    currentIndex = 0;
  };
  const toNext = () => {
    if (hisRoutes.length - 1 > 0) {
      router.push(hisRoutes[++currentIndex]);
    }
  };
  const toLast = () => {
    if (currentIndex !== 0) {
      router.push(hisRoutes[--currentIndex]);
    }
  };

  return {
    addHisRoute,
    clearHisRoute,
    toNext,
    toLast,
  };
}
