<script setup lang="ts">
import { mainStore } from '@/store';
import type { musicInfo } from '@/store/type';
import { reactive, ref } from '@vue/reactivity';
import { nextTick, watch } from '@vue/runtime-core';

const props = defineProps<{
  currentMusic: musicInfo
}>()
const audioRef = ref<HTMLAudioElement>()

const musciState = reactive({
  duration: audioRef.value?.duration ?? 0,
  currentTime: audioRef.value?.currentTime,
  isPlay: false
})
watch(() => audioRef.value?.currentTime, () => {
  console.log('+++')
  console.log(musciState)
})
const handleControlClick = () => {
  musciState.isPlay = !musciState.isPlay
  if (musciState.isPlay) {
    audioRef.value?.play()
  } else {
    audioRef.value?.pause()
  }
}
const store = mainStore()
const handleChangeSong = (type: string) => {
  // audioRef.value?.pause()
  store.changCurrentMusic(type)
  nextTick(() => audioRef.value?.play()) // 使用nextTick()
}
const handleMusicPlaying = (e: any) => {
  musciState.currentTime = audioRef.value?.currentTime
}
</script>

<template>
  <div class="music-player">
    <div class="music-control">
      <div class="change-mode">
        <i class="icon iconfont icon-shezhi"></i>
      </div>
      <div class="previous" @click="handleChangeSong('previous')">
        <i class="icon iconfont icon-arrow-double-left"></i>
      </div>
      <div class="control" @click="handleControlClick">
        <i v-if="!musciState.isPlay" style="font-size: 2rem;" class="icon iconfont icon-bofang"></i>
        <i
          v-else-if="musciState.isPlay"
          style="font-size: 2rem;"
          class="icon iconfont icon-zanting"
        ></i>
      </div>
      <div class="next" @click="handleChangeSong('next')">
        <i class="icon iconfont icon-arrow-double-right"></i>
      </div>
      <div class="lyrics">
        <i class="icon iconfont icon-cibiaoquanyi"></i>
      </div>
    </div>
    <div class="Song-progress">
      -----------{{ `${musciState.currentTime ? parseInt((musciState.currentTime) / 60 + '') : ''}:${musciState.currentTime ? (musciState.currentTime % 60).toFixed(0) : ''}` }}--------
      {{ `${audioRef?.duration ? parseInt((audioRef?.duration) / 60 + '') : ''}:${audioRef?.duration ? (audioRef?.duration % 60).toFixed(0) : ''}` }}
    </div>
  </div>
  <audio ref="audioRef" @timeupdate="handleMusicPlaying" :src="currentMusic.songUrl"></audio>
</template>

<style scoped lang="less">
.music-player {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: whitesmoke;
  .music-control {
    width: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
