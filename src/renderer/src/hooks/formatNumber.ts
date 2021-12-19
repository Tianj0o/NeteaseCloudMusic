export function formatNumber(num: number) {
  const str = num + "";
  const length = str.length;
  if (length <= 4) {
    return str;
  } else if (length <= 8) {
    return str.slice(0, -4) + "." + str.slice(-4, -3) + "万";
  } else {
    return str.slice(0, -8) + "." + str.slice(-8, -7) + "亿";
  }
}
