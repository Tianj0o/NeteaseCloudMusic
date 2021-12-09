<script setup lang="ts">
import footerVue from '@/components/musicFooter.vue';
import navHeader from '@/components/navHeader.vue';
import navMenu from '@/components/navMenu.vue';



</script>

<template>
  <div class="main">
    <div class="header">
      <nav-header></nav-header>
    </div>
    <div class="container" id="container">
      <div class="menu">
        <nav-menu></nav-menu>
      </div>
      <div class="body" id="container-body">
        <router-view></router-view>
      </div>
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
    -webkit-app-region: drag; // electron 可拖拽这个区域
  }
  .container {
    border-top: 1.5px solid #b82525;
    display: flex;
    flex: 1;
    position: relative;
    .menu {
      width: 200px;
      background-color: #2b2b2b;
    }
    .body {
      flex: 1;
      background-color: #2b2b2b;
      position: relative;
      border-left: #444444 1px solid;
    }
  }
  .footer {
    height: 70px;
    background-color: rgb(32, 32, 35);
  }
}
</style>