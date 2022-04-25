<script setup lang="ts">
import { getHighqualityPlaylist } from "@/service/discoverMusic";
import tGrid from "@/components/baseUi/tGrid.vue";
import tCard from "@/components/baseUi/tCard.vue";
import { useToPage } from "@/hooks/useToPage";
import { ref, watchEffect } from "@vue/runtime-dom";
import { emitter } from "@/mitt";
const { handleMusiclistClick } = useToPage();
const playlists = ref<
  { name: string; id: number; coverImgUrl: string; updateTime: number }[]
>([]);
let lastUpdateTime = ref<string>("");
watchEffect(async () => {
  const data = await getHighqualityPlaylist({
    before: lastUpdateTime.value,
  }).then((res) => res.playlists);
  playlists.value = [...playlists.value, ...data];
});

emitter.on("scrollToBottom", () => {
  lastUpdateTime.value =
    playlists.value[playlists.value.length - 1]?.updateTime + "";
});
</script>

<template>
  <div class="exclusiveCustomization">
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
  </div>
</template>

<style scoped></style>
