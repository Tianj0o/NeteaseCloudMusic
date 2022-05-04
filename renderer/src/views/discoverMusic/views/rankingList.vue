<script setup lang="ts">
import { getToplist } from "@/service/discoverMusic";
import { ref } from "vue";
import tCard from "@/components/baseUi/tCard.vue";
import tGrid from "@/components/baseUi/tGrid.vue";
import { getPlaylistAll } from "@/service/discoverMusic";
import type { music } from "@/store/type";
import playIcon from "@/components/iconsCpns/playIcon.vue";
import { useToPage } from "@/hooks/useToPage";
export interface topList {
  coverImgUrl: string;
  id: number;
  updateTime: number;
}

const topList = ref<topList[]>([]);

const OfficialList = ref<music[][]>([]);
async function getOfficialList() {
  const { list } = await getToplist();
  topList.value = list;

  const data = await Promise.all([
    getPlaylistAll(topList.value[0].id),
    getPlaylistAll(topList.value[1].id),
    getPlaylistAll(topList.value[2].id),
    getPlaylistAll(topList.value[3].id),
  ]);

  data.forEach((item, index) => {
    OfficialList.value[index] = item.songs;
  });
}
getOfficialList();

const { handleMusiclistClick } = useToPage();
</script>

<template>
  <div>
    <div v-if="topList.length && OfficialList.length">
      <div class="title">官方榜</div>
      <template v-for="i in 4">
        <div class="container">
          <div
            class="pic"
            @click="handleMusiclistClick(topList[i - 1].id)"
            style="width: 200px; position: relative"
          >
            <t-card :pic-url="topList[i - 1].coverImgUrl"></t-card>
            <play-icon class="icon"></play-icon>
          </div>
          <div class="lists">
            <template v-for="(musicInfo, index) in OfficialList[i - 1]">
              <div
                class="list"
                v-if="index < 5"
                :class="index % 2 === 0 ? '' : 'special'"
              >
                <div class="songName" style="color: #d2d2d2">
                  <span :style="index > 2 ? '#666666' : 'color:#a63333'">{{
                    index
                  }}</span>
                  <span style="margin: 10px">-</span>
                  {{ musicInfo.name }}
                </div>
                <div class="songAuther" style="color: #6c6c6c">
                  {{ musicInfo.ar[0].name }}
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
    <div>
      <div class="title">全球榜</div>
      <t-grid :columns="5" gap="20px">
        <template v-for="(item, index) in topList">
          <div
            @click="handleMusiclistClick(item.id)"
            class="pic"
            v-if="index > 3"
            style="position: relative"
          >
            <t-card :pic-url="item.coverImgUrl"></t-card>
            <play-icon class="icon"></play-icon>
          </div>
        </template>
      </t-grid>
    </div>
  </div>
</template>

<style scoped lang="less">
.title {
  font-size: 20px;
  font-weight: bold;
  color: #d0d0d0;
  margin: 20px 0;
}
.container {
  display: flex;
  width: 200px;
  margin-bottom: 10px;
  width: 100%;
  .lists {
    padding-left: 20px;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;

    .list {
      font-size: 14px;
      padding: 10px;
      height: 100%;
      align-items: center;
      display: flex;
      justify-content: space-between;
      &:hover {
        background-color: #3d3d3d;
      }
    }
    .list.special {
      background-color: #393939;
    }
  }
}
.pic:hover .icon {
  opacity: 1;
}
.pic .icon {
  opacity: 0;
  color: rgb(43 43 43 / 70%);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  transition: opacity 0.1s linear;
}
</style>
