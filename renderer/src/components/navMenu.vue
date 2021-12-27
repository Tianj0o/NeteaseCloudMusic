<script setup lang="ts">
import { navMenuConfig } from '@/config';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

const currentRoute = computed(() => {
  return route.path.match(/\/main\/\w+/)?.[0]
})

</script>

<template>
  <div class="nav-menu">
    <div class="system">
      <template v-for="item in navMenuConfig" :key="item.path">
        <div
          @click="router.push(item.path)"
          class="sysytem-item"
          :class="{ 'active': currentRoute === item.path }"
        >{{ item.name }}</div>
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
    &.active {
      background-color: #333333;
    }
    &:hover {
      background-color: #333333;
    }
  }
}
</style>