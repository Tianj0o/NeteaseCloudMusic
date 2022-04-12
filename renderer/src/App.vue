<script setup lang="ts">
import { useRouter } from "vue-router";
import { mainStore } from "./store";
const store = mainStore();
store.isUserLogin();
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
