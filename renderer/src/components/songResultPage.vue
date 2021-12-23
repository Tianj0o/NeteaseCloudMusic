<script setup lang="ts">
import { getSearchKeywords } from '@/service';
import type { music } from '@/store/type'
import musicList from '@/views/discoverMusic/cpns/musicList.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const searchQuery = {
  limit: 100,
  offset: 0
}
const query = route.params.query
const songResult = await getSearchKeywords(`${query}&limit=${searchQuery.limit}&offset=${searchQuery.offset}`,)

</script>

<template>
  <div class="title">搜索结果</div>
  <music-list :musiclists="songResult.result.songs"></music-list>
</template>

<style scoped>
.title {
  color: #d0d0d0;
  font-size: 24px;
  font-weight: bold;
}
</style>