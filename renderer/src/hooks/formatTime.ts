export function formateTimeToString(time: number) {
  return time
    ? `${String(Math.floor(time / 60)).padStart(2, "0")}:${(time % 60)
        .toFixed(0)
        .padStart(2, "0")}`
    : "00:00";
}
