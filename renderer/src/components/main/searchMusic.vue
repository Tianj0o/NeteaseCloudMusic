<script setup lang="ts">
import router from '@/router';
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
interface searchResult {
  name: string,
  id: number
}
const searchContent = ref('')
let isActive = true
watch(searchContent, () => {
  isActive = true
})

// enter query musci
const handleQueryClick = async () => {
  if (isActive && searchContent.value !== '') {
    isActive = false
    router.push(`/main/songResultPage/${searchContent.value}`)
  }
}
</script>

<template>
  <div class="search">
    <i class="icon iconfont icon-sousuo"></i>
    <input @keydown.enter="handleQueryClick" v-model="searchContent" type="text" />
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