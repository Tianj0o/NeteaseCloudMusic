<script setup lang="ts">
import { ref, onMounted } from 'vue';
const tCardRef = ref<HTMLElement>()
onMounted(() => {
  tCardRef.value!.style.width = '20%'
})

</script>

<template>
  <div class="t-card" ref="tCardRef">
    <slot name="header" class="header"></slot>
    <div class="container">
      <img style="height: 50px;width: auto;" src="../assets/logo.png" />
    </div>
    <slot name="footer" class="footer">每日歌曲推荐</slot>
  </div>
</template>

<style scoped lang="less">
.t-card {
  .container {
    margin-bottom: 5px;
  }
  display: flex;
  flex-direction: column;
}
</style>