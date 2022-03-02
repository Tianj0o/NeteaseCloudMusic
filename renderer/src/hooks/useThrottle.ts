type fn = (args: any) => any;
export function useThrottle(fn: fn, time: number) {
  let timer: NodeJS.Timeout | null = null;
  return function (...args: any) {
    if (timer) return;
    timer = setTimeout(() => {
      fn(args);
      timer = null;
    }, time);
  };
}
