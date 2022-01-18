export const useClickTwice = (fn: (args: any) => void, time = 1000) => {
  let tick = 0;
  return function (this: any, ...args: any) {
    tick++;
    setTimeout(() => {
      if (tick >= 2) {
        console.log(args);
        fn.apply(this, args);
      }
      tick = 0;
    }, time);
  };
};
