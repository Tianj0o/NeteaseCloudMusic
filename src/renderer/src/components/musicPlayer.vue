<script setup lang="ts">
import { mainStore, musicMode } from '@/store';
import type { musicInfo } from '@/store/type';
import { reactive, ref } from '@vue/reactivity';
import { nextTick } from '@vue/runtime-core';
import { formateTimeToString } from '@/hooks/formatTime'
defineProps<{
  currentMusic: musicInfo
}>()
const audioRef = ref<HTMLAudioElement>()

const musciState = reactive({
  duration: audioRef.value?.duration ?? 0,
  currentTime: audioRef.value?.currentTime,
  isPlay: false
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

const progressLineRef = ref<HTMLElement>()
const pointLeft = ref('0px')
const handleMusicPlaying = () => {
  musciState.currentTime = audioRef.value?.currentTime
  if (progressLineRef.value && audioRef.value && musciState.currentTime) {
    progressLineRef.value.style.width = musciState.currentTime / audioRef.value?.duration * 350 + 'px'
    pointLeft.value = musciState.currentTime / audioRef.value?.duration * 350 + 'px'
  }
}
const playMode = ref<musicMode>(musicMode.SHUNXUBOFANG)
const modeList: musicMode[] = [musicMode.SHUNXUBOFANG, musicMode.LIEBIAOXUNHUAN, musicMode.DANQUXUNHUAN, musicMode.SUIJIBOFANG]
let modeIndex = 0
const changeMode = () => {
  modeIndex = modeIndex === modeList.length - 1 ? 0 : modeIndex + 1
  playMode.value = modeList[modeIndex]
}
const handleChangeSong = (type: string) => {
  if (audioRef.value) {
    store.changManalContro(type, playMode.value)
    nextTick(() => audioRef.value?.play())
    musciState.isPlay = true
  }
}
const handleMusicEnded = () => {
  if (audioRef.value) {
    const isSTop = store.changAutoControl('next', playMode.value)
    if (isSTop) {
      musciState.isPlay = false
    } else {
      nextTick(() => audioRef.value?.play())
    }
  }
}
const isControl = ref(false)
const handleMouseDown = () => {
  isControl.value = true

}
const handleMouseMove = (e: MouseEvent) => {
  if (isControl.value && progressLineRef.value && audioRef.value) {
    progressLineRef.value.style.width = (e.offsetX - 4) + 'px'
    pointLeft.value = (e.offsetX - 4) + 'px'
    console.log(progressLineRef.value.style.width, pointLeft.value)
    nextTick(() => {
      if (audioRef.value) {
        audioRef.value.pause()
        audioRef.value.currentTime = (e.offsetX - 4) / 350 * audioRef.value?.duration

      }
    })
  }

}
const handleMouseUp = () => {

  if (isControl.value && audioRef.value) {
    audioRef.value.play()
    musciState.isPlay = true
  }
  isControl.value = false
}
</script>

<template>
  <div
    @mouseleave.prevent="handleMouseUp"
    @mousemove.prevent="handleMouseMove"
    @mouseup.prevent="handleMouseUp"
    class="music-player"
  >
    <div class="music-control">
      <div class="change-mode" @click="changeMode">
        <i class="icon iconfont icon-shezhi"></i>
        {{ playMode }}
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
    <div class="song-progress">
      <div class="currentTime">{{ formateTimeToString(musciState.currentTime ?? 0) }}</div>
      <div class="progress-bar">
        <div ref="progressLineRef" class="progress-line"></div>
        <div @mousedown.prevent="handleMouseDown" class="point" :style="{ left: pointLeft }"></div>
      </div>
      <div class="duration">{{ formateTimeToString(store.currentMusic.songTime ?? 0) }}</div>
    </div>
  </div>
  <audio
    preload="metadata"
    ref="audioRef"
    @timeupdate="handleMusicPlaying"
    @ended="handleMusicEnded"
    :src="currentMusic.songUrl"
  ></audio>
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
  .song-progress {
    display: flex;
    align-items: center;
    .progress-bar {
      position: relative;
      height: 4px;
      width: 350px;
      margin: 0 9px;
      border-radius: 4px;
      background-color: grey;
      display: flex;
      align-items: center;
      .progress-line {
        height: 4px;
        border-radius: 4px;

        width: 0px;
        background-color: rgb(236, 65, 65);
      }
      &:hover .point {
        height: 8px;
        width: 8px;
        border-radius: 50%;
        background-color: rgb(236, 65, 65);
        position: absolute;
        transform: translateX(-4px);
        left: 0px;
      }
    }

    .currentTime,
    .duration {
      font-size: 0.7rem;
    }
  }
}
</style>
