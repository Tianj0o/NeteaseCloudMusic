import { ref } from "vue";
const scrollRef = ref<HTMLElement>();
const scrollData = ref({
  offsetHeight: 0,
  scrollTop: 0,
});
export function useViScroll() {
  function setScroll(e: HTMLElement) {
    if (!scrollData.value) scrollRef.value = e;
    scrollData.value = {
      offsetHeight: e.offsetHeight,
      scrollTop: e.scrollTop,
    };
  }

  return {
    scrollRef,
    setScroll,
    scrollData,
  };
}
