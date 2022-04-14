<script setup lang="ts">
import { navMenuConfig } from "@/config/initSetting";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const discoverMusicConfig = navMenuConfig.value.find(
  (item) => item.path === "/main/discoverMusic"
)?.children;
let firPath = discoverMusicConfig?.find((i) => i.isChecked === true);
if (firPath) {
  router.push(firPath.path);
}
router.beforeEach((to, from) => {
  firPath = discoverMusicConfig?.find((i) => i.isChecked === true);
  if (to.path === "/main/discoverMusic") {
    if (firPath) {
      return firPath.path;
    }
  }
});
</script>

<template>
  <div class="discoverMusic">
    <div class="header">
      <template v-for="item in discoverMusicConfig">
        <div
          class="router"
          @click="router.push(item.path)"
          v-if="item.isChecked"
        >
          {{ item.name }}
          <transition name="line">
            <div class="line" v-if="route.path === item.path"></div>
          </transition>
        </div>
      </template>
    </div>
    <div class="container">
      <router-view v-slot="{ Component }">
        <keep-alive :max="6">
          <transition name="fade-in">
            <component :is="Component"></component>
          </transition>
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<style scoped lang="less">
.line-enter-from {
  opacity: 0;
  transform: scale(2);
}

.line-enter-active {
  transition: all 0.5s ease;
}

.fade-in-enter-active {
  transition: all 0.2s ease-in;
}

.fade-in-enter-from {
  opacity: 0;
  transform: translateX(-200px);
}

.discoverMusic {
  // overflow-y: scroll;
  height: 95%;

  .header {
    font-size: 18px;
    color: #b6cad0;
    display: flex;
    // align-items: center;
    padding-bottom: 16px;
    width: 100%;

    background-color: #2b2b2b;

    .router {
      margin-right: 20px;

      &:hover {
        color: #ffffff;
      }

      .line {
        margin: 0 auto;
        display: block;
        margin-top: 4px;
        height: 4px;
        background-color: #ec4141;
        padding: 0 2px;
        border-radius: 2px;
        width: 60%;
        text-align: center;
      }
    }
  }
}

.container {
  height: 100%;

  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
