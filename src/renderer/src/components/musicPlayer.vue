<script setup lang="ts">

</script>

<template>
  <div class="music-player">
    <div class="music-control">
      <div class="change-mode">
        <i class="icon iconfont icon-shezhi"></i>
      </div>
      <div class="previous">
        <i class="icon iconfont icon-arrow-double-left"></i>
      </div>
      <div class="control">
        <i style="font-size: 1.5rem;" class="icon iconfont icon-bofang"></i>
      </div>
      <div class="next">
        <i class="icon iconfont icon-arrow-double-right"></i>
      </div>
      <div class="lyrics">
        <i class="icon iconfont icon-cibiaoquanyi"></i>
      </div>
    </div>
    <div class="Song-progress">-----------------------</div>
  </div>
</template>

<style scoped lang="less">
.music-player {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: whitesmoke;
  .music-control {
    width: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
