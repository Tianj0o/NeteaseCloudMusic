<script setup lang="ts">
import musicPlayer from './musicPlayer.vue'
import { mainStore } from '@/store';
import { computed, ref } from '@vue/reactivity';
import { watch, watchEffect } from '@vue/runtime-core';
const store = mainStore()
const musicLists = computed(() => {
  // currentMusic = store.musicLists[0]
  return store.musicLists
})
let currentMusic = ref(musicLists.value[0] ?? {
  songName: '像风一样',
  songAuthor: '薛之谦',
  songId: 132,
  songTime: 123,
  songUrl: "http://m7.music.126.net/20211127225124/0eb75ebce03c29176f24e789a072cefa/ymusic/040f/0f0f/565d/3e0624f33e8ebca96335a7a2a4821e0a.mp3",
  picUrl: 'https://p1.music.126.net/fNbj5uDwltSDLbETdnEYYQ==/109951163069265719.jpg'
})
watch(() => musicLists.value.length, () => {
  console.log(1)
  currentMusic.value = musicLists.value[0]
})
//切歌
const handleChangeSong = (type: string) => {

}
</script>

<template>
  <div class="footer">
    <div class="music-info">
      <div class="music-image">
        <img :src="currentMusic.picUrl" />
      </div>
      <div class="song-info">
        <div class="music-name">{{ currentMusic.songName }}</div>
        <div class="author">{{ currentMusic.songAuthor }}</div>
      </div>
    </div>
    <div class="music-player">
      <musicPlayer @handleChangeSong="handleChangeSong" :currentMusic="currentMusic"></musicPlayer>
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
</style>