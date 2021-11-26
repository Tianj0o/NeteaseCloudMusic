<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { watchEffect } from '@vue/runtime-core';
const searchContent = ref('')
watchEffect(() => {
  console.log(searchContent.value)
})
</script>

<template>
  <div class="search">
    <i class="icon iconfont icon-sousuo"></i>
    <input v-model="searchContent" type="text" />
  </div>
</template>

<style scoped lang="less">
.search {
  background-color: #373737;
  height: 20px;
  display: flex;
  align-items: center;
  padding: 4px 10px;
  padding-right: 28px;
  margin-left: 20px;
  border-radius: 19px; // 1/2 height + padding
  .icon {
    color: white;
    margin: 0;
  }
  input {
    background-color: #373737;
    border: none;
    outline: none;
    color: white;
    width: 90px;
    font-size: 0.8rem;
  }
}
</style>