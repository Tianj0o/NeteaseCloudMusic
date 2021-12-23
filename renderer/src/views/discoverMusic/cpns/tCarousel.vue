<script setup lang="ts">
import { ref } from 'vue'
import { bannerData } from '@/store/discoverMusic'
import { onMounted } from 'vue'
const props = defineProps<{
  bannerLists: bannerData[]
}>()
let activeIndex = ref(0)
const addClass = (index: number) => {
  if (index === activeIndex.value) {
    return 'active'
  }
  if (index === activeIndex.value + 1) {
    return 'next'
  }
  if (index === activeIndex.value - 1) {
    return 'last'
  }
  if (activeIndex.value - 1 < 0) {
    if (index === props.bannerLists.length - 1) {
      return 'last'
    }
  }
  if (activeIndex.value === props.bannerLists.length - 1) {
    if (index === 0) {
      return 'next'
    }
  }
  return ''
}
const handleChange = (type: string) => {
  if (type === 'next')
    activeIndex.value === props.bannerLists.length - 1 ? activeIndex.value = 0 : activeIndex.value++
  else if (type === 'last')
    activeIndex.value === 0 ? activeIndex.value = props.bannerLists.length - 1 : activeIndex.value--
}
let timer: number
onMounted(() => {
  timer = setInterval(() => {
    handleChange('next')
  }, 6000)
})
const handleMouseOver = () => {
  clearInterval(timer)
}
const handleMouseleave = () => {
  timer = setInterval(() => {
    handleChange('next')
  }, 6000)
}

const handleCircleClick = (index: number) => {
  activeIndex.value = index
}
</script>

<template>
  <div class="carousel" @mouseover="handleMouseOver" @mouseleave="handleMouseleave">
    <div @click="handleChange('last')" class="left-arrow arrow">
      <i class="icon iconfont icon-arrow-left-bold"></i>
    </div>
    <div @click="handleChange('next')" class="right-arrow arrow">
      <i class="icon iconfont icon-arrow-right-bold"></i>
    </div>
    <transition-group tag="div" class="carouselLists">
      <template v-for="(item,index) in bannerLists" :key="index">
        <img :class="addClass(index)" :src="item.imageUrl" />
      </template>
    </transition-group>
    <div class="circle">
      <template v-for="(item,index) in bannerLists">
        <div
          class="circle-item"
          :class="{ 'active': addClass(index) === 'active' }"
          @click="handleCircleClick(index)"
        ></div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.carousel {
  position: relative;
  display: flex;
  height: 200px;
  width: 100%;
  justify-content: center;
  align-items: center;
  &:hover .arrow {
    z-index: 10;
  }
  .arrow {
    height: 30px;
    width: 30px;
    border-radius: 100%;
    background-color: rgba(104, 100, 100, 0.5);
    margin: 0 auto;
    line-height: 30px;
    position: absolute;
    color: white;
    text-align: center;
  }
  .left-arrow {
    left: 10px;
  }
  .right-arrow {
    right: 10px;
  }
  .carouselLists {
    height: 200px;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      position: absolute;
      height: 200px;
      width: auto;
      opacity: 0;
      transition: all 0.3s linear;
      border-radius: 10px;
    }
    .active {
      z-index: 2;
      opacity: 1;
    }
    .last {
      opacity: 1;
      left: 0;
      height: 175px;
    }
    .next {
      opacity: 1;
      height: 175px;
      right: 0;
    }
  }
  .circle {
    position: absolute;
    bottom: -20px;
    width: 100%;
    display: flex;
    justify-content: center;
    .circle-item {
      height: 7px;
      width: 7px;
      border-radius: 100%;
      background-color: #2e3033;
      margin: 5px;
    }
    .circle-item.active {
      background-color: #ec4141;
    }
  }
}
</style>