<script setup lang="ts">
import { getSearchKeywords } from '@/service';
import musicList from '@/views/discoverMusic/cpns/musicList.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const searchQuery = {
  limit: 100,
  offset: 0
}
let query = route.params.query
let songResult = ref(await getSearchKeywords(`${query}&limit=${searchQuery.limit}&offset=${searchQuery.offset}`,))
watch(() => route.params, async () => {
  query = route.params.query
  songResult.value = await getSearchKeywords(`${query}&limit=${searchQuery.limit}&offset=${searchQuery.offset}`,)
})
</script>

<template>
  <div class="title">搜索结果</div>
  <music-list :musiclists="songResult"></music-list>
</template>

<style scoped>
.title {
  color: #d0d0d0;
  font-size: 24px;
  font-weight: bold;
}
</style>