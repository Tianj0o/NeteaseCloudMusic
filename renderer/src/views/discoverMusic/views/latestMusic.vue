<script setup lang="ts">
import { formateTimeToString } from '@/hooks/formatTime'
import { getXinGeSudi } from '@/service/discoverMusic';
import { ref, watchEffect } from '@vue/runtime-dom';
interface item {
  title: string,
  value: number
}
const currentTab = ref(0)
const tabListConfig = ["新歌速递", "新碟上架"]
const currentQueryConfig = ref(0)
const queryConfig: item[] = [{
  title: '全部',
  value: 0
}, {
  title: '华语',
  value: 7
}, {
  title: '欧美',
  value: 96
}, {
  title: "日本",
  value: 8
}, {
  title: '韩国',
  value: 16
}]
const musiclist = ref<{ name: string, duration: number }[]>([])
const handleItemClick = async (type: number) => {
  currentQueryConfig.value = type
}
watchEffect(async () => {
  const data = await getXinGeSudi(currentQueryConfig.value).then(res => res.data)
  musiclist.value = data
})
</script>

<template>
  <div class="latest-music">
    <div class="tab">
      <div
        v-for="(item, index) in tabListConfig"
        class="tab-item"
        @click="currentTab = index"
        :key="item"
        :class="{ 'active': currentTab === index }"
      >{{ item }}</div>
    </div>
    <div class="content">
      <div class="content-tab">
        <template v-for="item in queryConfig">
          <span
            class="item"
            :class="{ 'active': item.value === currentQueryConfig }"
            @click="handleItemClick(item.value)"
          >{{ item.title }}</span>
        </template>
      </div>
      <div class="music-list">
        <template v-for="(item, index) in musiclist" :key="index">
          <div class="music-list-item" :class="index % 2 === 0 ? '' : 'special'">
            <div>{{ item.name }}</div>
            <div>{{ formateTimeToString(Number(item.duration.toString().slice(0, -3))) }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.latest-music {
  display: flex;
  flex-direction: column;
  align-items: center;
  .tab {
    display: flex;
    width: 250px;
    border-radius: 20px;
    border: 1px solid #666666;
    justify-content: space-around;
    .tab-item {
      border-radius: 20px;
      text-align: center;
      padding: 10px 0;
      width: 126px;
      margin: -1px;
      &.active {
        background-color: #666666;
      }
    }
  }
  .content {
    width: 100%;
    .content-tab {
      display: flex;
      align-items: center;
      .item {
        display: inline-block;
        padding: 0 10px 0 0;
        &.active {
          color: #cad0d0;
          font-size: medium;
          font-weight: bolder;
        }
      }
    }
    .music-list {
      .music-list-item {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        &.special {
          background-color: #393939;
        }
      }
    }
  }
}
</style>