<script setup lang="ts">
import type { music } from '@/store/type'
import { formateTimeToString } from '@/hooks/formatTime'
import { mainStore } from '@/store'
import { useClickTwice } from '@/hooks/useClick'
import { computed } from 'vue'
import { likeMusic } from '@/service/discoverMusic'
const props = defineProps<{
  musiclists: music[]
}>()
const store = mainStore()


const userLikeLists = computed(() => store.userLikelists)
const isLike = (id: number) => {
  return userLikeLists.value.includes(id)
}

const handleLikeClick = async (id: number) => {
  if (isLike(id)) {
    await likeMusic(id + '&like=false')
  } else {
    await likeMusic(id + '')
  }
  await store.getUserLikelistData()
}

const musicItemClick = useClickTwice((index: number) => {
  console.log(index)
  changPlayList(index)
})
function changPlayList(index: number, data?: music[]) {
  store.musicLists = data ?? props.musiclists
  store.changToindex(index)
}
defineExpose({
  changPlayList
})
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
      <template v-for="(music,index) in musiclists" :key="music.id">
        <div
          class="music-item"
          @click="musicItemClick(index)"
          :class="{ 'special': index % 2 === 0 }"
        >
          <div style="width: 10px;margin-right: 10px;">{{ (index + '').padStart(2, '0') }}</div>
          <div class="handler">
            <i
              class="icon iconfont"
              style="margin-right: 5px;"
              :class="isLike(music.id) ? 'icon-xihuan1' : 'icon-xihuan'"
              @click="handleLikeClick(music.id)"
            ></i>
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
.icon-xihuan1 {
  color: #ec4141;
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