import { ref, reactive } from "vue";
const scrollRef = ref<HTMLElement>();
const scrollData = reactive({
  offsetHeight: 0,
  scrollTop: 0,
});
export function useViScroll() {
  function setScroll(e: HTMLElement) {
    if (!scrollData) scrollRef.value = e;
    // scrollData.value = {
    //   offsetHeight: e.offsetHeight,
    //   scrollTop: e.scrollTop,
    // };
    scrollData.offsetHeight = e.offsetHeight;
    scrollData.scrollTop = e.scrollTop;
  }

  return {
    scrollRef,
    setScroll,
    scrollData,
  };
}
