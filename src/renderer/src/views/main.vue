<script setup lang="ts">
import { mainStore } from '@/store/index'
import { request } from '@/service/request';
const store = mainStore()
const title = store.name
request.request({
  url: '/dj/program?rid=336355127'
}).then(res => {
  console.log(res)
})
</script>

<template>
  <div class="main">
    <h1>12312313{{ title }}</h1>
  </div>
</template>

<style scoped>
</style>