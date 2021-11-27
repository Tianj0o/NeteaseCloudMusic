<script setup lang="ts">
import type { musicInfo } from '@/store/type';
import { ref } from '@vue/reactivity';
defineProps<{
  currentMusic: musicInfo
}>()
const emit = defineEmits(['handleChangeSong'])
const audioRef = ref<HTMLAudioElement>()
const isPlay = ref(false)
const handleControlClick = () => {
  isPlay.value = !isPlay.value
  if (isPlay.value) {
    audioRef.value?.play()
  } else {
    audioRef.value?.pause()
  }
}

const handleChangeSong = (type: string) => {
  console.log(type)
  emit('handleChangeSong', type)
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
        <i v-if="!isPlay" style="font-size: 2rem;" class="icon iconfont icon-bofang"></i>
        <i v-else-if="isPlay" style="font-size: 2rem;" class="icon iconfont icon-zanting"></i>
      </div>
      <div class="next" @click="handleChangeSong('next')">
        <i class="icon iconfont icon-arrow-double-right"></i>
      </div>
      <div class="lyrics">
        <i class="icon iconfont icon-cibiaoquanyi"></i>
      </div>
    </div>
    <div class="Song-progress">-----------------------</div>
  </div>
  <audio ref="audioRef" :src="currentMusic.songUrl"></audio>
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
