<script setup lang="ts">
import { discoverMusicConfig } from '@/config';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
</script>

<template>
  <div class="discoverMusic">
    <div class="header">
      <template v-for="item in discoverMusicConfig">
        <div
          class="router"
          @click="router.push(item.path)"
          :class="route.path === item.path ? 'active' : ''"
        >{{ item.name }}</div>
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
    // align-items: center;
    padding-bottom: 16px;
    width: 100%;

    background-color: #2b2b2b;
    .router {
      margin-right: 20px;
      &:hover {
        color: #ffffff;
      }
      &.active::after {
        display: block;
        margin-top: 4px;
        height: 4px;
        background-color: #ec4141;
        padding: 0 2px;
        content: " ";
        transform: scale(0.8);
        border-radius: 2px;
      }
    }
  }
}
.container {
  height: 100%;
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>