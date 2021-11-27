<script setup lang="ts">
import footerVue from '@/components/musicFooter.vue';
import navHeader from '@/components/navHeader.vue';
</script>

<template>
  <div class="main">
    <div class="header">
      <nav-header></nav-header>
    </div>
    <div class="container">
      <div class="menu">menu</div>
      <div class="body">body</div>
    </div>
    <div class="footer">
      <footer-vue></footer-vue>
    </div>
  </div>
</template>

<style scoped lang="less">
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
  .header {
    max-width: 100%;
    height: 60px;
    background-color: rgb(32, 32, 35);
  }
  .container {
    display: flex;
    flex: 1;
    .menu {
      width: 200px;
      background-color: blueviolet;
    }
    .body {
      flex: 1;
      background-color: crimson;
    }
  }
  .footer {
    height: 70px;
    background-color: rgb(32, 32, 35);
  }
}
</style>