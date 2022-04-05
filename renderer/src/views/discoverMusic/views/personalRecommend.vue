<script setup lang="ts">
import { disMusicStore } from '@/store/discoverMusic';
import { computed } from 'vue';
import tCarousel from '../cpns/tCarousel.vue';
import TCard from '@/components/baseUi/tCard.vue';
import tGrid from '@/components/baseUi/tGrid.vue';
import { useToPage } from '@/hooks/useToPage';
const store = disMusicStore()

store.getBannerListData()
const bannerlists = computed(() => store.bannerListsData)
store.getDailyPlayListData()
// 每日推荐歌单
const dailyPlaylist = computed(() => {
  const data = store.dailyPlaylist
  return data
})


const { handleMusiclistClick } = useToPage()

</script>

<template>
  <div class="person-recommend">
    <t-carousel :bannerLists="bannerlists"></t-carousel>
    <t-grid :columns="5" gap="20px">
      <t-card name="每日歌曲推荐" @click="handleMusiclistClick(0)">
        <div
          class="daily-songs"
          style="overflow: hidden;position: relative;height: 0;padding-bottom: 100%;"
        >
          <img
            style="width: 100%;filter: blur(25px);position: absolute;height: 100%;"
            :src="dailyPlaylist[dailyPlaylist.length - 1]?.picUrl"
          />

          <div
            class="icon"
            style="position: absolute;display: flex;align-items: center;top: 0;justify-content: center;height: 100%;width: 100%;"
          >
            <span
              style="color: white;font-size: 2rem;padding: 20%;border:5px solid white"
            >{{ new Date().getDate() }}</span>
          </div>
        </div>
      </t-card>
      <template v-for="item in dailyPlaylist">
        <t-card v-bind="item" @click="handleMusiclistClick(item.id)"></t-card>
      </template>
    </t-grid>
  </div>
</template>

<style scoped lang="less">
.person-recommend {
  .person-recommend {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .t-grid {
    margin-top: 40px;
  }
}
</style>