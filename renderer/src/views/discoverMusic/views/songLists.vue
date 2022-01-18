<script setup lang="ts">
import tGrid from '@/components/tGrid.vue';
import tCard from '@/components/tCard.vue';
import tPagination from '@/components/tPagination.vue';
import { getAllPlaylist, getHotPlaylist, getTopPlaylist } from '@/service/discoverMusic';
import { reactive, ref, watchEffect } from 'vue';
import { useToPage } from '@/hooks/useToPage';
const playlistCat = reactive<{ alllist: { categories: any, sub: { name: string, category: number }[] }, hotlist: { name: string }[] }>({
  hotlist: <any>{},
  alllist: <any>{}
})
const data = await Promise.all([getAllPlaylist(), getHotPlaylist()]).catch(e => console.log(e))
if (data) {
  playlistCat.alllist = data[0]
  playlistCat.hotlist = data[1].tags
}
const currentTag = ref(playlistCat.hotlist[0].name)
const changTag = (tag: string) => {
  currentTag.value = tag
  pageSearchInfo.value.currentPage = 1
}
const pageSearchInfo = ref({
  size: 100,
  currentPage: 1
})
const playlists = ref<{ name: string, id: number, coverImgUrl: string }[]>([])
const totalNum = ref(0)
watchEffect(async () => {
  console.log(currentTag.value);
  const data = await getTopPlaylist(`cat=${currentTag.value}&limit=100&offset=${pageSearchInfo.value.size * (pageSearchInfo.value.currentPage - 1)}`)
  playlists.value = data.playlists
  totalNum.value = data.total
})
const { handleMusiclistClick } = useToPage()
const songlistRef = ref<HTMLElement>()

const handleCurrentChange = (index: number) => {
  pageSearchInfo.value.currentPage = index
  scrollToTop()
}
function scrollToTop() {
  songlistRef.value && songlistRef.value.scrollTo(0, 0)
}
</script>

<template>
  <div class="songlist" ref="songlistRef" v-if="data">
    <div class="header">
      <div class="current-tag">{{ currentTag }} ></div>
      <div class="hot-tags">
        <template v-for="item in playlistCat.hotlist">
          <span
            @click="changTag(item.name)"
            :class="{ 'active': item.name === currentTag }"
            class="tag"
          >{{ item.name }}</span>
        </template>
      </div>
    </div>
    <div class="container" v-if="playlists.length">
      <t-grid :columns="5" gap="20px">
        <template v-for="item in playlists">
          <t-card
            :pic-url="item.coverImgUrl"
            :name="item.name"
            @click="handleMusiclistClick(item.id)"
          ></t-card>
        </template>
      </t-grid>
    </div>
    <div class="footer" v-if="totalNum">
      <t-pagination
        :currentPage="pageSearchInfo.currentPage"
        @current-change="handleCurrentChange"
        :total="totalNum"
        :size="pageSearchInfo.size"
      ></t-pagination>
    </div>
  </div>
</template>

<style scoped lang="less">
.songlist {
  height: 110%;
  overflow: scroll;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .current-tag {
    padding: 5px 30px;
    border-radius: 15px;
    border: 1px solid #434343;
  }
  .hot-tags {
    .tag {
      font-size: 14px;
      margin: 0 8px;
    }
    .tag.active {
      color: #ec4141;
    }
  }
}
.container {
  margin: 20px 0;
}
.footer {
  display: flex;
  justify-content: center;
  margin: 0 0 25px 0;
}
</style>