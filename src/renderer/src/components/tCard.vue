<script setup lang="ts">
import { ref } from 'vue';
const tCardRef = ref<HTMLElement>()

defineProps<{
  picUrl?: string,
  targetId?: number,
  name?: string
}>()

</script>

<template>
  <div class="t-card" ref="tCardRef">
    <div class="container">
      <slot>
        <img style="width: 100%;height: 100%;" :src="picUrl" />
      </slot>
    </div>
    <div v-if="name" class="footer">{{ name }}</div>
  </div>
</template>

<style scoped lang="less">
.t-card {
  width: 100%;
  .container {
    img {
      border-radius: 5px;
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