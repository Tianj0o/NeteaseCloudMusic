<script setup lang="ts">
import tGrid from '@/components/baseUi/tGrid.vue';
import { computed, ref } from 'vue';
const props = defineProps<{
  allData: any[],
  tGradConfig: {
    columns: number,
  },
  scrollData: {
    offsetHeight: number,
    scrollTop: number
  },
  singleHeight: number,
  fixScrollTop?: number
}>()
const vScrollState = ref({
  startIndex: 0,
  vStartIndex: 0,
  style: {}
})
const showData = computed(() => {

  let endIndex = vScrollState.value.startIndex + contentSize.value
  if (endIndex > (props.allData.length / props.tGradConfig.columns) - 1) {
    endIndex = Math.ceil(props.allData.length / props.tGradConfig.columns) - 1;
  }
  // 返回的是虚拟的index 多一个屏幕 优化体验

  return props.allData.slice(vScrollState.value.vStartIndex * props.tGradConfig.columns, endIndex * props.tGradConfig.columns)
})
const contentSize = computed(() => {
  let index
  if (props.fixScrollTop) {
    const afterFixScrollTop = (props.scrollData.scrollTop - props.fixScrollTop)
    index = Math.floor((afterFixScrollTop < 0 ? 0 : afterFixScrollTop / props.singleHeight))
  } else {
    index = Math.floor(((props.scrollData.scrollTop) / props.singleHeight))
  }
  vScrollState.value.startIndex = index < 0 ? 0 : index;
  if (vScrollState.value.startIndex < contentSize.value) {
    vScrollState.value.vStartIndex = 0;
  } else {
    vScrollState.value.vStartIndex = vScrollState.value.startIndex - contentSize.value
  }
  vScrollState.value.style = {
    paddingTop: vScrollState.value.vStartIndex * props.singleHeight + 'px',
    paddingBottom: ((Math.ceil(props.allData.length / props.tGradConfig.columns) - 1 - vScrollState.value.startIndex - contentSize.value)) * props.singleHeight + 'px'
  }
  if (vScrollState.value.startIndex + contentSize.value > props.allData.length / props.tGradConfig.columns - 1) {
    console.log('emit')
    emit('handleScrollTobottom')
  }
  return Math.floor(props.scrollData.offsetHeight / props.singleHeight) + 2
})

const emit = defineEmits(['handleScrollTobottom'])


</script>

<template>
  <div class="v-scroll" :style="vScrollState.style">
    <t-grid v-bind="tGradConfig" v-if="showData.length || allData.length">
      <template v-if="showData.length">
        <template v-for="(item, index) in showData" :key="item.name">
          <slot :item="item"></slot>
        </template>
      </template>
      <template v-else>
        <template v-for="(item, index) in allData" :key="item.name">
          <slot :item="item"></slot>
        </template>
      </template>
    </t-grid>
  </div>
</template>

<style scoped>
</style>