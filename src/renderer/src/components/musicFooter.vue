<script setup lang="ts">
import musicPlayer from './musicPlayer.vue'
import { mainStore } from '@/store';
import { computed } from '@vue/reactivity';
const store = mainStore()
let currentMusic = computed(() => store.currentMusic)
</script>
<template>
  <div class="footer">
    <div class="music-info">
      <div class="music-image">
        <img :src="currentMusic?.picUrl" />
      </div>
      <div class="song-info">
        <div class="music-name">{{ currentMusic.songName }}</div>
        <div class="author">{{ currentMusic.songAuthor }}</div>
      </div>
    </div>
    <div class="music-player">
      <musicPlayer :currentMusic="currentMusic"></musicPlayer>
    </div>
    <div class="music-list" style="color: whitesmoke;">
      <i class="icon iconfont icon-cibiaoquanyi"></i>
    </div>
  </div>
</template>

<style scoped lang="less">
.footer {
  display: flex;
  align-items: center;
  padding: 0px 10px;
  height: 100%;
  .music-image {
    display: flex;
    align-items: center;
    img {
      border-radius: 6px;
      margin-right: 10px;
      height: 46px;
      width: 46px;
    }
  }
  .music-info {
    display: flex;
    color: whitesmoke;
    padding: 0 10px;
    height: 100%;
    align-items: center;
    // width: 25%;
    flex: 1;
    .music-image {
      height: 80%;
    }
    .music-name {
      margin-bottom: 5px;
    }
    .author {
      font-size: 0.8rem;
    }
  }
  .music-player {
    flex: 2;
  }
  .music-list {
    flex: 1;
  }
}
img[src=""],
img:not([src]) {
  opacity: 0;
}
</style>