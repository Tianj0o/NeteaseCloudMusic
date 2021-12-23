<script setup lang="ts">
import tCard from '@/components/tCard.vue';
import musicList from './cpns/musicList.vue';
import { getPlaylistAll, getPlaylistDetails } from "@/service/discoverMusic";
import { useRoute } from 'vue-router';
import { formatNumber } from '@/hooks/formatNumber'
import { music } from '@/store/type';

const route = useRoute()
const musicListdata: music[] = await getPlaylistAll(Number(route.params.id)).then(res => res.songs)
const musiListDetails = await getPlaylistDetails(Number(route.params.id)).then(res => res.playlist)
</script>


<template>
  <div class="music-list-details">
    <div class="header" v-if="musiListDetails">
      <div class="pic">
        <t-card :pic-url="musiListDetails.coverImgUrl"></t-card>
      </div>
      <div class="details">
        <div class="name">{{ musiListDetails.name }}</div>

        <div class="share">
          收藏:
          <span class="number">{{ formatNumber(musiListDetails.subscribedCount) }}</span>
          分享:
          <span class="number">{{ formatNumber(musiListDetails.shareCount) }}</span>
        </div>
        <div class="tag">
          标签:
          <span style="color: #85b9e6;">{{ musiListDetails.tags.join(',') }}</span>
        </div>
        <div class="playcount">
          总播放量:
          <span class="number">{{ formatNumber(musiListDetails.playCount) }}</span> 歌曲:
          <span class="number">{{ formatNumber(musiListDetails.trackCount) }}</span>
        </div>
        <div class="description">
          简介:
          <span class="number">{{ musiListDetails.description }}</span>
        </div>
      </div>
    </div>
    <music-list :musiclists="musicListdata"></music-list>
  </div>
</template>

<style scoped lang='less'>
.music-list-details {
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    .pic {
      width: 200px;
    }
    .details {
      max-width: 400px;
      color: #d0d0d0;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .number {
        color: #878787;
      }
      .name {
        font-size: 1.5rem;
        font-weight: 900;
      }
    }
  }
}
</style>