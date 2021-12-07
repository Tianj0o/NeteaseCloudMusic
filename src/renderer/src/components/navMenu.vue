<script setup lang="ts">
import { navMenuConfig } from '@/config/navMenu';
</script>

<template>
  <div class="nav-menu">
    <div class="system">
      <template v-for="item in navMenuConfig">
        <div class="sysytem-item">{{ item.name }}</div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  padding: 20px 10px;
  color: #d0d0d0;
  .sysytem-item {
    padding: 10px 10px;
    &:hover {
      background-color: #333333;
    }
  }
}
</style>