<script setup lang="ts">
import footerVue from '@/components/baseUi/musicFooter.vue';
import navHeader from '@/components/baseUi/navHeader.vue';
import navMenu from '@/components/baseUi/navMenu.vue';
import { onMounted, ref } from 'vue';
import { emitter } from '@/mitt';
import { useThrottle } from '@/hooks/useThrottle';
import { useRouter } from 'vue-router';
import { useViScroll } from '@/hooks/vScroll'
const scrollRef = ref<HTMLElement>()

emitter.on('scrollToTop', () => {
  scrollRef.value!.scrollTo(0, 0)
})

const { setScroll } = useViScroll()

const handleBodyScroll = useThrottle(() => {
  setScroll(scrollRef.value!)
  const isArrive = scrollRef.value!.scrollHeight - scrollRef.value!.scrollTop > scrollRef.value!.clientHeight * 1.4 ? false : true
  if (isArrive) {
    emitter.emit('scrollToBottom')
  }
}, 300)
onMounted(() => {
  setScroll(scrollRef.value as HTMLElement);
  window.addEventListener('resize', () => {
    setScroll(scrollRef.value as HTMLElement)
  })
})


const router = useRouter()
emitter.on('historyRoute', (e: any) => {
  router.push(e)
})
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
      <div class="body" ref="scrollRef" @scroll="handleBodyScroll" id="container-body">
        <suspense>
          <template #default>
            <router-view v-slot="{ Component }">
              <transition name="fade-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </template>

          <template #fallback>
            <div>Loading...</div>
          </template>
        </suspense>
      </div>
    </div>
    <div class="footer">
      <footer-vue></footer-vue>
    </div>
  </div>
</template>

<style scoped lang="less">
.fade-in-enter-active {
  transition: opacity 0.3s ease;
}

.fade-in-enter-from {
  opacity: 0;
}
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
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
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0;
    }
    .menu {
      width: 200px;
      background-color: #2b2b2b;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0;
        border-radius: 0px;
      }
      &:hover::-webkit-scrollbar {
        width: 4px;
      }
    }
    .body {
      overflow-x: hidden;
      padding: 35px 25px;
      flex: 1;
      background-color: #2b2b2b;
      position: relative;
      border-left: #444444 1px solid;
      // overflow-y: scroll;
      overflow-x: hidden;
    }
  }
  .footer {
    max-width: auto;
    height: 70px;
    background-color: rgb(32, 32, 35);
  }
}
</style>