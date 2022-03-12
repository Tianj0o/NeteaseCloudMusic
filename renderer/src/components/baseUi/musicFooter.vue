<script setup lang="ts">
import musicPlayer from '../musicPlayer/musicPlayer.vue'
import { mainStore } from '@/store';
import { computed, ref } from '@vue/reactivity';
import useStorage from '@/hooks/useStorage';
import { nextTick } from '@vue/runtime-core';
import musicList from '../main/musicList.vue';
import { watchEffect } from 'vue';
import { getMusicUrl } from '@/service';
import { useClickTwice } from '@/hooks/useClick';
const store = mainStore()
let currentMusic = computed(() => {
  return store.currentMusic
})
const { setStorage } = useStorage()

const musicLists = computed(() => {
  const musicLists = store.musicLists
  if (musicLists.length > 0) {
    setStorage('musicLists', musicLists)
  }
  return musicLists
})
const isShow = ref(false)
const handleMusicListClick = () => {
  isShow.value = !isShow.value
}
const musicPlayerRef = ref<InstanceType<typeof musicPlayer>>()

// 双击列表 
const musicListItemClick = useClickTwice((index: number) => {
  console.log(index)
  store.changToindex(index);
  nextTick(() => {
    if (musicPlayerRef.value) {
      musicPlayerRef.value.audioRef?.play();
      musicPlayerRef.value.musicState.isPlay = true
    }
  })
})
let isFirst = true
watchEffect(() => {
  const music = store.currentMusic;

  if (music && Object.keys(music).length !== 0) {
    getMusicUrl(music.id + '').then(res => {
      console.log('update')
      music.url = res.data[0].url
      if (!isFirst) {
        nextTick(() => {
          (musicPlayerRef.value as any).audioRef?.play();
          (musicPlayerRef.value as any).musicState.isPlay = true
        })
      } else {
        isFirst = false
      }
    })
  }
  setStorage('currentIndex', store.currentIndex)
})


</script>
<template>
  <div class="footer">
    <div class="music-info">
      <div class="music-image">
        <img :src="currentMusic?.al?.picUrl" />
      </div>
      <div class="song-info">
        <div class="music-name">{{ currentMusic?.name }}</div>
        <div class="author">{{ currentMusic?.ar?.[0].name }}</div>
      </div>
    </div>
    <div class="music-player">
      <musicPlayer ref="musicPlayerRef" :currentMusic="currentMusic"></musicPlayer>
    </div>
    <div class="music-lists">
      <div class="music-list" @click="handleMusicListClick">
        <i class="icon iconfont icon-1804-liufupinggongnengtubiao-24"></i>
        <music-list
          @musicListItemClick="musicListItemClick"
          :musicLists="musicLists"
          :isShow="isShow"
        ></music-list>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.footer {
  display: flex;
  align-items: center;
  padding: 0 20px 0 5px;
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
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 120px;
    }
    .author {
      font-size: 0.8rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 120px;
    }
  }
  .music-player {
    flex: 2;
  }
  .music-lists {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    color: whitesmoke;
    .music-list {
      .icon {
        font-size: 1.5rem;
      }
    }
  }
}

img[src=""],
img:not([src]) {
  opacity: 0;
}
</style>