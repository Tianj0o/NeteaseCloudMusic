<script setup lang="ts">
import { navMenuConfig } from "@/config/initSetting";
import useStorage from "@/hooks/useStorage";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const { getStorage, setStorage } = useStorage();

let currentRoute = ref(
  getStorage("currentMenu") ??
    getPathName(
      navMenuConfig.value.find((item) => item.isChecked === true)?.path ?? ""
    )
);
const handleMenuClick = (path: string) => {
  router.push(path);
};
const firPath = navMenuConfig.value.find((i) => i.isChecked === true);
if (firPath) {
  router.push(firPath.path);
}
watch(
  () => route.path,
  (path) => {
    const routeName = getPathName(path);
    currentRoute.value = routeName;
    setStorage("currentMenu", path);
  }
);
function getPathName(path: string) {
  return path.split("/")[2] ?? "";
}
</script>

<template>
  <div class="nav-menu">
    <div class="system">
      <template v-for="item in navMenuConfig" :key="item.path">
        <div
          v-if="item.isChecked"
          @click="handleMenuClick(item.path)"
          class="sysytem-item"
          :class="{ active: currentRoute === getPathName(item.path) }"
        >
          {{ item.name }}
        </div>
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
