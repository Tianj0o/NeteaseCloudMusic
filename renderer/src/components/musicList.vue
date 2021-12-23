<script setup lang="ts">
// import { musicInfo } from '@/store/type';
import dialogTelport from './dialogTelport.vue';
import { mainStore } from '@/store';
import useStorage from '@/hooks/useStorage';
import { formateTimeToString } from '@/hooks/formatTime'
import { music } from '@/store/type';
defineProps<{
  musicLists: music[],
  isShow: boolean
}>()
const emit = defineEmits(['musicListItemClick'])
const store = mainStore()
const handleClearList = () => {
  const { deleteStorage } = useStorage()
  store.clearMusicLists()
  deleteStorage('musicLists')
}
const musicListItemClick = (index: number) => {
  emit('musicListItemClick', index)
}
const handleRefresh = () => {
  store.initMusicLists()
}
</script>

<template>
  <dialog-telport teleport=".body" v-model="isShow">
    <div class="playList">
      <div class="header">
        <div class="title">当前播放</div>
        <div style="display: flex;justify-content: space-between;">
          <span class="count">总{{ musicLists.length }}首</span>
          <span @click="handleRefresh">刷新</span>
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
            <div class="songName">{{ musicInfo.name }}</div>
            <div class="songAuther">{{ musicInfo.ar[0].name }}</div>
            <div class="songDra">{{ formateTimeToString(Number(String(musicInfo.dt).slice(0, -3))) }}</div>
          </div>
        </template>
      </div>
    </div>
  </dialog-telport>
</template>

<style scoped lang="less">
.playList {
  z-index: 100;
  height: calc(100% - 131px);
  width: 390px;
  background-color: #363636;
  color: whitesmoke;
  position: fixed;
  top: 61px;
  right: 0px;
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
    height: 100%;
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
</style>