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
    <div class="container">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<style scoped lang="less">
.discoverMusic {
  // overflow-y: scroll;
  height: 95%;
  .header {
    font-size: 18px;
    color: #b6cad0;
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    width: 100%;

    background-color: #2b2b2b;
    .router {
      margin-right: 20px;
      &:hover {
        color: #ffffff;
      }
    }
  }
}
.container {
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
  overflow-x: hidden;
}
</style>