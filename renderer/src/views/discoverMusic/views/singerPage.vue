<script setup lang="ts">
import { getArtistlist } from '@/service/discoverMusic';
import tCard from '@/components/baseUi/tCard.vue';
import tGrid from '@/components/baseUi/tGrid.vue';
import { computed, onBeforeUpdate, onMounted, onUpdated, ref, watch, watchEffect } from 'vue';
import { emitter } from '@/mitt';
import { useViScroll } from '@/hooks/vScroll'
interface item {
  title: string,
  value: number
}
const areaList: item[] = [{ title: '全部', value: -1 }, { title: '华语', value: 7 }, { title: '欧美', value: 96 }, { title: '日本', value: 8 }, { title: '韩国', value: 16 }, { title: '其他', value: 0 }]
const typeList: item[] = [{ title: '全部', value: -1 }, { title: '男歌手', value: 1 }, { title: '女歌手', value: 2 }, { title: '乐队组合', value: 3 }]
const initialList = ['热门', 'A', 'B', "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "#"]
const defaultQueryConfig = {
  type: -1,
  area: -1,
  initial: '-1',
  offset: 0,
  limit: 30
}
const currentQueryConfig = ref({ ...defaultQueryConfig })
const handleItemClick = (item: item | string, type?: 'type' | 'area') => {
  singerData.value = []

  if (typeof item === 'string') {
    if (item === '热门') item = '-1'
    currentQueryConfig.value = { ...defaultQueryConfig, initial: item }
  } else {
    if (type) {
      currentQueryConfig.value = { ...defaultQueryConfig, [type]: item.value }
    }
  }

}
const singerData = ref<{ picUrl: string, name: string }[]>([])
let isComplete = false
watchEffect(async () => {
  isComplete = true
  const data = await getArtistlist({ ...currentQueryConfig.value })
  isComplete = false
  singerData.value = [...singerData.value, ...data.artists]
})
emitter.on("scrollToBottom", () => {
  if (!isComplete) {
    console.log('++++++++')
    currentQueryConfig.value.offset += currentQueryConfig.value.limit
  }
});

let instance = 0;
onMounted(() => {
  setInstance()
  window.onresize = setInstance
})
function setInstance() {
  instance = containerRef.value?.getBoundingClientRect().top! - 60;
}
const { scrollData } = useViScroll()
function setStartIndex() {
  console.log(instance, 'instance')
  vScrollState.value.startIndex = Math.floor((scrollData.value.scrollTop - instance < 0 ? 0 : scrollData.value.scrollTop - instance) / vScrollState.value.singleItemHeight);
  console.log(vScrollState.value.startIndex)
}
const vScrollState = ref({
  singleItemHeight: 0,
  containerHeight: computed(() => scrollData.value?.offsetHeight ?? 0).value,
  startIndex: 0,
})
const showData = computed(() => {
  let endIndex = vScrollState.value.startIndex + contentSize.value
  if (endIndex > (singerData.value.length / tGradConfig.columns) - 1) {
    endIndex = Math.ceil(singerData.value.length / tGradConfig.columns) - 1;
  }
  return singerData.value.slice(vScrollState.value.startIndex * tGradConfig.columns, endIndex * tGradConfig.columns)
})

const style = computed(() => {
  return {
    paddingTop: vScrollState.value.startIndex * vScrollState.value.singleItemHeight + 'px',
    paddingBottom: (Math.ceil(singerData.value.length / tGradConfig.columns) - 1 - vScrollState.value.startIndex - contentSize.value) + 'px'
  }
})
watch(scrollData, () => {
  setStartIndex();
})
const tGradConfig = {
  columns: 5,
  gap: '14px'
}
const contentSize = computed(() => {
  return Math.floor(scrollData.value.offsetHeight / vScrollState.value.singleItemHeight) + 2
})

const containerRef = ref<HTMLElement>()

let itemRefs: InstanceType<typeof tCard>[] = []
const setItemRef = (el: any) => {
  if (itemRefs.length > 0) return
  if (el) {
    itemRefs.push(el)
  }
}
onBeforeUpdate(() => {
  itemRefs = []
})

onUpdated(() => {
  if (itemRefs[0]) {
    const singleHeight = (itemRefs[0].cardHeight as number + Number(tGradConfig.gap.slice(0, -2)))
    vScrollState.value.singleItemHeight = singleHeight
  }
})
</script>

<template>
  <div class="singerPage">
    <div class="header">
      <div class="titles">
        <div class="title">语种</div>
        <div class="title">分类</div>
        <div class="title">筛选</div>
      </div>
      <div class="container">
        <div class="area">
          <template v-for="item in areaList">
            <span
              class="item"
              :class="{ 'active': item.value === currentQueryConfig.area }"
              @click="handleItemClick(item, 'area')"
            >{{ item.title }}</span>
          </template>
        </div>
        <div class="type">
          <template v-for="item in typeList">
            <span
              class="item"
              :class="{ 'active': item.value === currentQueryConfig.type }"
              @click="handleItemClick(item, 'type')"
            >{{ item.title }}</span>
          </template>
        </div>

        <div class="initial">
          <template v-for="item in initialList">
            <span
              class="item"
              :class="{ 'active': item === currentQueryConfig.initial || (item === '热门' && currentQueryConfig.initial === '-1') }"
              @click="handleItemClick(item)"
              style="margin-bottom: 10px;"
            >{{ item }}</span>
          </template>
        </div>
      </div>
    </div>
    <div class="container" ref="containerRef" :style="style">
      <t-grid v-bind="tGradConfig" v-if="showData.length">
        <template v-for="item in showData">
          <t-card :ref="setItemRef" :pic-url="item.picUrl" :name="item.name"></t-card>
        </template>
      </t-grid>
      <t-grid v-bind="tGradConfig" v-else-if="singerData.length">
        <template v-for="item in singerData">
          <t-card :ref="setItemRef" :pic-url="item.picUrl" :name="item.name"></t-card>
        </template>
      </t-grid>
    </div>
  </div>
</template>

<style scoped lang="less">
.header {
  display: flex;
  margin-top: 20px;
  font-size: 14px;
  .container {
    div {
      margin-bottom: 10px;
      .item {
        padding: 0 20px;
        border-right: 1px solid #343434;
        opacity: 0.8;
        &.active {
          color: #db3232;
        }
        &:last-child {
          border: none;
        }
      }
    }
  }
}
.titles {
  margin: 0px 20px 20px 0px;
  .title {
    margin-bottom: 10px;
    width: 32px;
  }
}

.initial {
  display: flex;
  flex-wrap: wrap;
}
</style>