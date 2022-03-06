<script setup lang="ts">
import { mainStore } from './store';
import { loginOut } from '@/service/index'
const store = mainStore()
store.isUserLogin()

</script>

<template>
  <router-view />
</template>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
