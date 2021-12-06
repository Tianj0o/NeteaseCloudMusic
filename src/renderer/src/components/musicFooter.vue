<script setup lang="ts">
import musicPlayer from './musicPlayer.vue'
import { mainStore } from '@/store';
import { computed, ref } from '@vue/reactivity';
import dialogTelport from './dialogTelport.vue';
import { formateTimeToString } from '@/hooks/formatTime'
import useStorage from '@/hooks/useStorage';
import { nextTick } from '@vue/runtime-core';
const store = mainStore()
let currentMusic = computed(() => store.currentMusic)

const isShow = ref(false)
const handleMusicListClick = () => {
  isShow.value = !isShow.value
}
const musicLists = computed(() => {
  const musicLists = store.musicLists
  const { setStorage } = useStorage()
  setStorage('musicLists', musicLists)
  return musicLists
})
let tick = 0;
const musicPlayerRef = ref<InstanceType<typeof musicPlayer>>()
const musicListItemClick = (index: number) => {
  tick++
  setTimeout(() => {
    if (tick >= 2) {
      console.log('shuangji')
      store.changToindex(index);
      nextTick(() => {
        (musicPlayerRef.value as any).audioRef.play();
        (musicPlayerRef.value as any).musicState.isPlay = true
      })
    }
    tick = 0
  }, 700)
}
const handleClearList = () => {
  const { deleteStorage } = useStorage()
  store.clearMusicLists()
  deleteStorage('musicLists')
}
</script>
<template>
  <div class="footer">
    <div class="music-info">
      <div class="music-image">
        <img :src="currentMusic?.picUrl" />
      </div>
      <div class="song-info">
        <div class="music-name">{{ currentMusic?.songName }}</div>
        <div class="author">{{ currentMusic?.songAuthor }}</div>
      </div>
    </div>
    <div class="music-player">
      <musicPlayer ref="musicPlayerRef" :currentMusic="currentMusic"></musicPlayer>
    </div>
    <div class="music-lists">
      <div class="music-list" @click="handleMusicListClick">
        <i class="icon iconfont icon-1804-liufupinggongnengtubiao-24"></i>
        <dialog-telport teleport=".body" v-model="isShow">
          <div class="playList">
            <div class="header">
              <div class="title">当前播放</div>
              <div style="display: flex;justify-content: space-between;">
                <span class="count">总{{ musicLists.length }}首</span>
                <span class="clearBtn" @click="handleClearList">清空列表</span>
              </div>
            </div>
            <div class="lists">
              <template v-for="(musicInfo,index) in musicLists">
                <div
                  @click="musicListItemClick(index)"
                  class="list"
                  :class="index % 2 === 0 ? '' : 'special'"
                >
                  <div class="songName">{{ musicInfo.songName }}</div>
                  <div class="songAuther">{{ musicInfo.songAuthor }}</div>
                  <div class="songDra">{{ formateTimeToString(musicInfo.songTime) }}</div>
                </div>
              </template>
            </div>
          </div>
        </dialog-telport>
      </div>
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
.playList {
  height: 100%;
  width: 390px;
  background-color: #363636;
  color: whitesmoke;
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;

  .header {
    padding: 20px 15px;
    .title {
      font-size: 20px;
      font-weight: bolder;
      margin-bottom: 10px;
    }
    .count {
      font-size: 13px;
      opacity: 0.7;
    }
    .clearBtn {
      text-align: end;
    }
  }
  .lists {
    overflow-y: scroll;

    border-top: rgb(63, 63, 63) 1px solid;
    .list {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      padding: 5px 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 13px;
      &:hover {
        background-color: #3d3d3d;
      }
      .songName {
        width: 178px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .songAuther {
        max-width: 95px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .songDra {
        opacity: 0.7;
        flex: 1;
        text-align: end;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .list.special {
      background-color: #393939;
    }
  }
}
::-webkit-scrollbar {
  width: 4px;
  height: 30px;
}
::-webkit-scrollbar-track {
  background: #2b2b2b;
  border-radius: 2px;
  height: 30px;
}
::-webkit-scrollbar-thumb {
  background: #3f3f3f;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: #747474;
}
::-webkit-scrollbar-corner {
  background: #f6f6f6;
}
img[src=""],
img:not([src]) {
  opacity: 0;
}
</style>