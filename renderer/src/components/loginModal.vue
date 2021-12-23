<script setup lang="ts">
import { mainStore } from '@/store';
import { reactive, ref } from '@vue/reactivity';
import dialogTelport from './dialogTelport.vue';
const store = mainStore()
const isShowLogin = ref(false)
const loginState = reactive({
  tel: '',
  password: ''
})
const handleSubmitClick = () => {
  store.loginAction(loginState)
}

defineExpose({
  isShowLogin
})
</script>

<template>
  <div class="loginModal">
    <dialog-telport v-model="isShowLogin" teleport="#container">
      <div class="login">
        <div class="container">
          <div class="input">
            <input v-model="loginState.tel" type="text" placeholder="请输入手机号" />
          </div>
          <div class="input">
            <input type="password" v-model="loginState.password" placeholder="请输入密码" />
          </div>
        </div>
        <div class="submit">
          <button @click="handleSubmitClick">登录</button>
        </div>
      </div>
    </dialog-telport>
  </div>
</template>

<style scoped lang="less">
.login {
  width: 300px;
  height: 160px;
  background-color: #fff;
  opacity: 0.8;
  position: absolute;
  top: calc(50% - 80px);
  left: calc(50% - 150px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
  .container {
    border: 1px solid rgb(216, 216, 216);
    width: 260px;
    height: 100px;
    .input {
      height: 50%;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgb(216, 216, 216);
      margin-bottom: -1px;
    }
    input {
      padding: 0 0 0 10px;
      font-size: 0.8rem;
      width: 250px;
      border: none;
      outline: none;
      height: 50%;
      color: rgb(95, 95, 95);
    }
  }
  .submit {
    button {
      margin-top: 30px;
      width: 260px;
      height: 40px;
      background-color: rgb(199, 46, 46);
      border: none;
    }
  }
}
</style>