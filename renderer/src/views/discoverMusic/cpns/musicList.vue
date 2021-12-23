<script setup lang="ts">
import type { music } from '@/store/type'
import { formateTimeToString } from '@/hooks/formatTime'
import { mainStore } from '@/store'
import { useClickTwice } from '@/hooks/useClick'
const props = defineProps<{
  musiclists: music[]
}>()
const store = mainStore()

const clickTwice = useClickTwice()


const musicItemClick = (music: music, index: number) => {
  clickTwice(() => {
    store.musicLists = props.musiclists
    store.changToindex(index)
  })
}
</script>

<template>
  <div class="music-list">
    <div class="title">
      <div class="handler" style="padding-left:20px">操作</div>
      <div class="name">标题</div>
      <div class="singer">歌手</div>
      <div class="album">专辑</div>
      <div class="duration">时间</div>
    </div>
    <div class="music-table">
      <template v-for="(music,index) in musiclists" :key="music.name">
        <div
          class="music-item"
          @click="musicItemClick(music, index)"
          :class="{ 'special': index % 2 === 0 }"
        >
          <div style="width: 10px;margin-right: 10px;">{{ (index + '').padStart(2, '0') }}</div>
          <div class="handler">
            <i class="icon iconfont icon-xihuan" style="margin-right: 5px;"></i>
            <i class="icon iconfont icon-xiazai"></i>
          </div>
          <div class="name" style="color: #d1d1d1;font-size: 13px;">{{ music.name }}</div>
          <div class="singer">{{ music.ar[0].name }}</div>
          <div class="album">{{ music.al.name }}</div>
          <div class="duration">{{ formateTimeToString(Number(music.dt.toString().slice(0, 3))) }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.music-list {
  color: #888888;
  margin: 0 -20px;
  .title {
    display: flex;
    margin-left: 20px;
    div {
      height: 33px;
      line-height: 33px;
      padding-left: 3px;
      &:hover {
        background-color: #373737;
      }
      &:nth-child(1):hover {
        background-color: #2b2b2b;
      }
    }
  }
  .music-table {
    .music-item {
      font-size: 12px;
      display: flex;
      height: 33px;
      line-height: 33px;
      padding-left: 20px;
      &:hover {
        background-color: #373737;
      }
      div {
        padding-left: 3px;
      }
    }
    .music-item.special {
      background-color: #2e2e2e;
    }
  }
}
.handler {
  width: 68px;
}
.name {
  flex: 1;
}
.singer {
  width: 146px;
}
.album {
  width: 192px;
}
.duration {
  width: 76px;
}
</style>