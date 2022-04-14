<script setup lang="ts">
import { iconReset } from "@/components/iconsCpns";
import {
  navMenuConfig,
  defaultMenuConfig,
  setupNavMenuRouters,
  setupDiscoverMusic,
} from "@/config/initSetting";
import setItem from "./cpns/setItem.vue";
import { menuItem } from "@/config";
import useStorage from "@/hooks/useStorage";
import { useRouter } from "vue-router";

const { setStorage } = useStorage();
const router = useRouter();
function handleSetItemClick(item: menuItem) {
  if (item.children) {
    item.children.forEach((i) => {
      i.isChecked = false;
      const routeName = i.path.split("/")[2];
      if (router.hasRoute(routeName)) router.removeRoute(routeName);
    });
  }
  if (item.isChecked === true) {
    // 卸载路由
    item.isChecked = !item.isChecked;

    const routeName = item.path.split("/")[2];
    if (router.hasRoute(routeName)) router.removeRoute(routeName);
  } else {
    // 添加路由
    item.isChecked = !item.isChecked;
    setStorage("navMenuConfig", defaultMenuConfig);
    setupNavMenuRouters();
    setupDiscoverMusic();
  }
  setStorage("navMenuConfig", navMenuConfig.value);
}
function handleReset() {
  navMenuConfig.value = JSON.parse(JSON.stringify(defaultMenuConfig));
  setStorage("navMenuConfig", defaultMenuConfig);
  setupNavMenuRouters();
  setupDiscoverMusic();
}
</script>

<template>
  <div class="setting">
    <div class="Config">
      <template v-for="item in navMenuConfig" :key="item.name">
        <div v-if="item.path !== '/main/setting'" class="configItem">
          <setItem
            @handleSetItemClick="handleSetItemClick"
            :item="item"
            :data="navMenuConfig"
          />
        </div>
      </template>
      <div class="control">
        <button class="btn" @click="handleReset"><iconReset /> 重置</button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.setting {
  background-color: rgb(238, 250, 250);
  display: flex;
  justify-content: space-between;
  .Config {
    padding: 10px;
    border-radius: 4px;
    flex: 1;
    .configItem {
      color: black;
      display: flex;
      align-items: center;
    }
  }
  .control {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .btn {
      display: flex;
      margin-right: 10px;
      align-items: center;
      color: black;
    }
  }
  .img {
    flex: 1;
    background-color: red;
  }
}
</style>
