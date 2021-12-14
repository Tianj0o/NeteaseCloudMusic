<script setup lang="ts">
import { disMusicStore } from '@/store/discoverMusic';
import { computed } from 'vue';
import tCarousel from './cpns/tCarousel.vue';
import TCard from '@/components/t-card.vue';
const store = disMusicStore()
store.getBannerListData()
const bannerlists = computed(() => store.bannerListsData)
store.getDailyPlayListData()
</script>

<template>
  <div class="person-recommend">
    <t-carousel :bannerLists="bannerlists"></t-carousel>
    <div style="display: flex;">
      <t-card />
      <t-card />
      <t-card />
      <t-card />
      <t-card />
    </div>
  </div>
</template>

<style scoped lang="less">
.person-recommend {
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>