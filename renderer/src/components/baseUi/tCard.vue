<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
const tCardRef = ref<HTMLElement>()
const cardHeight = computed(() => tCardRef.value?.offsetHeight)

defineProps<{
  picUrl?: string,
  targetId?: number,
  name?: string
}>()
defineExpose({
  cardHeight
})
</script>

<template>
  <div class="t-card" ref="tCardRef">
    <div class="container">
      <slot>
        <img :src="picUrl" />
      </slot>
    </div>
    <div v-if="name" class="footer">{{ name }}</div>
  </div>
</template>

<style scoped lang="less">
.t-card {
  width: 100%;
  .container {
    height: 0;
    position: relative;
    padding-bottom: 100%;
    // padding-bottom 根据宽度决定 使得容器能后高度和宽度一样高
    img {
      border-radius: 5px;
      height: 100%;
      width: 100%;
      position: absolute;
    }
  }
  .footer {
    padding-top: 5px;
    color: #d0d0d0;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    &:hover {
      color: #ffffff;
    }
  }
  display: flex;
  flex-direction: column;
}
</style>