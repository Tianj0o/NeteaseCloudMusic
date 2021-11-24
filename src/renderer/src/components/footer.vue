<script setup lang="ts">
import musicPlayer from './musicPlayer.vue'
</script>

<template>
  <div class="footer">
    <div class="music-info">
      <div class="music-image">
        <img style="height: 100%;" src="~@/assets/logo.png" />
      </div>
      <div class="song-info">
        <div class="music-name">Insight XVIII</div>
        <div class="author">Julien Marchal</div>
      </div>
    </div>
    <musicPlayer></musicPlayer>
  </div>
</template>

<style scoped lang="less">
.footer {
  display: flex;
  align-items: center;
  padding: 0px 10px;
  height: 100%;
  .music-info {
    display: flex;
    color: whitesmoke;
    padding: 0 10px;
    height: 100%;
    align-items: center;
    .music-image {
      height: 80%;
    }
    .music-name {
      margin-bottom: 5px;
    }
    .author {
      font-size: 0.8rem;
    }
  }
}
</style>