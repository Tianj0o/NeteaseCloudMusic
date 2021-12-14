<script setup lang="ts">
import { request } from '@/service';
import { mainStore } from '@/store';
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
interface searchResult {
  name: string,
  id: number
}
const searchContent = ref('')
let isActive = true
const queryReslutLists = ref<searchResult[]>([])
watch(searchContent, () => {
  isActive = true
})
const store = mainStore()
// enter query musci
const handleQueryClick = () => {
  if (isActive && searchContent.value !== '') {
    isActive = false
    console.log('slick')
    request.get({
      url: `/cloudsearch?keywords=${searchContent.value}` // 搜索歌曲 后获得列表
    }).then((res: any) => {
      queryReslutLists.value = res.result.songs
      const id = queryReslutLists.value[0].id // 获取歌曲id
      const duration = Number(String(res.result.songs[0].dt).slice(0, String(res.result.songs[0].dt).length - 3)) // 歌曲时长 duration 三位
      request.get({
        url: `/song/url?id=${id}`
      }).then((res: any) => {
        const url = res.data[0].url
        // 获取歌曲链接
        request.get({ url: `/song/detail?ids=${id}` }).then((res: any) => {
          store.musicLists.push({
            songName: res.songs[0].name,
            songAuthor: res.songs[0].ar[0].name,
            songUrl: url,
            songTime: duration,
            songId: id,
            picUrl: res.songs[0].al.picUrl
          })
          if (!store.currentMusic) {
            store.initMusic()
          }

        })
      })
    })
  }
}
</script>

<template>
  <div class="search">
    <i class="icon iconfont icon-sousuo"></i>
    <input @keydown.enter="handleQueryClick" v-model="searchContent" type="text" />
  </div>
</template>

<style scoped lang="less">
.search {
  background-color: #373737;
  height: 20px;
  display: flex;
  align-items: center;
  padding: 4px 10px;
  padding-right: 28px;
  margin-left: 20px;
  border-radius: 19px; // 1/2 height + padding
  .icon {
    color: white;
    margin: 0;
  }
  input {
    background-color: #373737;
    border: none;
    outline: none;
    color: white;
    width: 90px;
    font-size: 0.8rem;
  }
}
</style>