<script setup lang="ts">
import tCard from "@/components/baseUi/tCard.vue";
import musicList from "./cpns/musicList.vue";
import { getPlaylistAll, getPlaylistDetails } from "@/service/discoverMusic";
import { useRoute } from "vue-router";
import { formatNumber } from "@/hooks/formatNumber";
import { music } from "@/store/type";
import { computed, ref, watch } from "vue";
import { disMusicStore } from "@/store/discoverMusic";

const route = useRoute();
const store = disMusicStore();
const id = route.params.id;
let musicListdata = ref<music[]>();
let musiListDetails = ref();
watch(
  () => route.params,
  async () => {
    if (id) {
      if (id == "0") {
        console.log(store.daiyluMusic, "+++++");
        musicListdata.value = store.daiyluMusic;
        musiListDetails.value = "";
      } else {
        getPlaylistAll(Number(id))
          .then((res) => res.songs)
          .then((res) => {
            musicListdata.value = res;
          });
        getPlaylistDetails(Number(id))
          .then((res) => res.playlist)
          .then((res) => {
            musiListDetails.value = res;
          });
      }
    }
  },
  {
    immediate: true,
  }
);

const isFold = ref(true);
const musiclistRef = ref<InstanceType<typeof musicList>>();
const handlePlayAll = () => {
  if (musiclistRef.value)
    musiclistRef.value.changPlayList(0, [...(musicListdata.value ?? [])]);
};
</script>

<template>
  <div class="music-list-details">
    <div class="header" v-if="musiListDetails">
      <div class="pic">
        <t-card :pic-url="musiListDetails.coverImgUrl"></t-card>
      </div>
      <div class="details">
        <div class="name">{{ musiListDetails.name }}</div>

        <div class="share" style="display: flex; align-items: center">
          <div
            class="playAllbtn"
            @click="handlePlayAll"
            style="
              padding: 0px 20px;
              margin: 5px 10px 5px 0;
              background-color: #d73535;
              border-radius: 25px;
            "
          >
            播放全部
          </div>
          收藏:
          <span class="number">{{
            formatNumber(musiListDetails.subscribedCount)
          }}</span>
          分享:
          <span class="number">{{
            formatNumber(musiListDetails.shareCount)
          }}</span>
        </div>
        <div class="tag" v-if="musiListDetails.tags.length">
          标签:
          <span style="color: #85b9e6">{{
            musiListDetails.tags.join(",")
          }}</span>
        </div>
        <div class="playcount">
          总播放量:
          <span class="number">{{
            formatNumber(musiListDetails.playCount)
          }}</span>
          歌曲:
          <span class="number">{{
            formatNumber(musiListDetails.trackCount)
          }}</span>
        </div>
        <div
          class="description"
          :class="{ active: !isFold }"
          style="display: flex"
        >
          <div style="white-space: nowrap">简介:</div>
          <span
            class="number"
            style="display: block; max-width: 50%"
            :class="{ active: !isFold }"
            >{{ musiListDetails.description }}</span
          >
        </div>
      </div>
      <i
        class="iconbtn icon iconfont"
        :class="isFold ? 'icon-shang' : 'icon-xia'"
        @click="isFold = !isFold"
      ></i>
    </div>
    <music-list
      ref="musiclistRef"
      v-if="musicListdata"
      :musiclists="musicListdata"
    ></music-list>
  </div>
</template>

<style scoped lang="less">
.music-list-details {
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    position: relative;
    .pic {
      min-width: 200px;
    }
    .iconbtn {
      position: absolute;
      top: 170px;
      right: 0;
      color: #878787;
    }
    .details {
      max-width: 800px;
      color: #d0d0d0;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      & > div {
        height: 40px;
        line-height: 40px;
      }
      .number {
        color: #878787;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .active {
        height: auto;

        white-space: normal;
        overflow: initial;
      }

      .name {
        font-size: 1.5rem;
        font-weight: 900;
      }
    }
  }
}
</style>
