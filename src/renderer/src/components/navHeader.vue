<script setup lang="ts">
import searchMusic from './searchMusic.vue';
import loginModal from './loginModal.vue';
import { ref } from '@vue/reactivity';
import { mainStore } from '@/store';
const loginModalRef = ref<InstanceType<typeof loginModal>>()
// const { ipcRenderer } = (window as any).require('electron');
const handleLoginClick = () => {
  (loginModalRef.value as any).isShowLogin = !(loginModalRef.value as any).isShowLogin
}
const handleMinWindow = () => {
  // ipcRenderer.send('winAction', 'min')
}
const handleMaxWindow = () => {
  // ipcRenderer.send('winAction', 'max')
}
const handleCloseWindow = () => {
  // ipcRenderer.send('winAction', 'close')
}
const store = mainStore()
</script>

<template>
  <div class="header">
    <div class="title">
      <i style="font-size: 2rem;margin: 0;" class="icon iconfont icon-wangyiyunyinle"></i>
      <span class="wangyiyun">网易云音乐</span>
    </div>
    <div class="center flex">
      <div class="for-back flex">
        <i class="icon iconfont icon-arrow-left-bold"></i>
        <i class="icon iconfont icon-arrow-right-bold"></i>
      </div>
      <div class="search">
        <search-music></search-music>
      </div>
    </div>
    <div class="right flex">
      <div class="info flex">
        <img :src="store.avatarUrl ?? ''" />
        <div class="name">{{ store.name }}</div>
        <div @click="handleLoginClick">未登录</div>
        <login-modal ref="loginModalRef"></login-modal>
      </div>
      <div class="setting flex">
        <i class="icon iconfont icon-pifu"></i>
        <i class="icon iconfont icon-shezhi"></i>
        <i class="icon iconfont icon-xinxi"></i>
      </div>
      <div class="window flex">
        <i class="icon iconfont icon-zuixiaohua1"></i>
        <i @click="handleMinWindow" class="icon iconfont icon-zuixiaohua"></i>
        <i @click="handleMaxWindow" class="icon iconfont icon-zuidahua"></i>
        <i @click="handleCloseWindow" class="icon iconfont icon-guanbi"></i>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.header {
  display: flex;
  align-items: center;
  color: whitesmoke;
  padding: 0 20px;
  .title {
    width: 190px;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
  }
  .center {
    .for-back {
      .icon {
        font-size: 0.8rem;
      }
    }
  }
  .right {
    flex: 1;
    justify-content: end;
    width: 40%;

    .info {
      height: 80%;
      display: flex;
      align-items: center;
      img {
        height: 80%;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
    .setting {
      .icon {
        font-size: 1.2rem;
      }
    }
    .window {
      .icon {
        font-size: 1.2rem;
      }
    }
  }
}
.flex {
  display: flex;
  align-items: center;
  height: 100%;
}
.icon {
  margin-left: 20px;
  -webkit-app-region: no-drag;
}
.search,
.info {
  -webkit-app-region: no-drag;
}
</style>