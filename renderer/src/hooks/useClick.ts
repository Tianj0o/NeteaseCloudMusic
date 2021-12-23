export const useClickTwice = (time = 1000) => {
  let tick = 0;
  return function (callback: any) {
    tick++;
    setTimeout(async () => {
      if (tick >= 2) {
        callback();
      }
      tick = 0;
    }, time);
  };
};
