<script setup lang="ts">
import { reactive, ref } from 'vue';
import { navMenuConfig } from '@/config';
import { iconBlank, iconChecked } from '@/components/iconsCpns/index';
const defaultState = Array.from(navMenuConfig, () => {
  return true
})
console.log(defaultState)
const state = reactive(defaultState)
</script>

<template>
  <div class="setting">
    <div class="navMenuConfig">
      <template v-for="(item, index) in navMenuConfig" :key="item.name">

        <div v-if="item.path !== '/main/setting'" class="configItem" @click="state[index] = !state[index]">
          <iconBlank v-if="state[index]" />
          <iconChecked v-else />
          {{ item.name }}
        </div>
      </template>
    </div>
</div>
</template>

<style lang="less" scoped >
.setting {
  .navMenuConfig {
    padding: 10px;
    border-radius: 4px;
    background-color: rgb(238, 250, 250);

    .configItem {
      color: black;
      display: flex;
      align-items: center;
    }
  }
}
</style>