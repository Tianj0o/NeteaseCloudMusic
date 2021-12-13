<script setup lang="ts">
import { discoverMusicConfig } from '@/config';
import { useRouter } from 'vue-router';
const router = useRouter()
</script>

<template>
  <div class="discoverMusic">
    <div class="header">
      <template v-for="item in discoverMusicConfig">
        <div class="router" @click="router.push(item.path)">{{ item.name }}</div>
      </template>
    </div>

    <router-view></router-view>
  </div>
</template>

<style scoped lang="less">
.discoverMusic {
  .header {
    font-size: 18px;
    color: #b6cad0;
    display: flex;
    align-items: center;

    .router {
      margin-right: 20px;
      &:hover {
        color: #ffffff;
      }
    }
  }
}
</style>