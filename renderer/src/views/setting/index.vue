<script setup lang="ts">
import { iconReset, iconSave } from "@/components/iconsCpns";
import {
  navMenuConfig,
  defaultMenuConfig,
  setupNavMenuRouters,
  setupDiscoverMusic,
} from "@/config/initSetting";
import setItem from "./cpns/setItem.vue";
import { menuItem } from "@/config";
import useStorage from "@/hooks/useStorage";
import router from "@/router";

const { setStorage } = useStorage();
function handleSetItemClick(item: menuItem) {
  if (item.children) {
    item.children.forEach((i) => {
      i.isChecked = false;
      router.removeRoute(i.path.split("/")[2]);
    });
  }
  if (item.isChecked === true) {
    // 卸载路由
    item.isChecked = !item.isChecked;

    router.removeRoute(item.path.split("/")[2]);
  } else {
    // 添加路由
    item.isChecked = !item.isChecked;
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
function handleSave() {
  setStorage("navMenuConfig", navMenuConfig.value);
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
  .Config {
    padding: 10px;
    border-radius: 4px;
    background-color: rgb(238, 250, 250);

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
}
</style>
