<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{ total: number, size: number, currentPage: number }>()
const emit = defineEmits(['currentChange'])
const handleItemClick = (index: number) => {
  emit('currentChange', index)
}
const goTo = (option: string) => {
  if (props.currentPage === 1 && option === 'prev' || props.currentPage === Math.floor(props.total / props.size) && option === 'next') return
  else
    option === 'next' ? handleItemClick(props.currentPage + 1) : handleItemClick(props.currentPage - 1)
}

</script>

<template>
  <div class="t-pagination">
    <div @click="goTo('prev')" class="prev item"></div>
    <template v-for="index in Math.floor(total / size)">
      <div
        :class="{ 'active': index === currentPage }"
        @click="handleItemClick(index)"
        class="item"
      >{{ index }}</div>
    </template>
    <div @click="goTo('next')" class="next item"></div>
  </div>
</template>

<style scoped>
.t-pagination {
  display: flex;
}
.prev::before {
  content: "<";
}
.next::before {
  content: ">";
}
.item {
  height: 20px;
  width: 20px;
  margin: 0 5px;
  border: 1px solid #3f3f3f;
  border-radius: 2px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #878787;
}
.item.active {
  background-color: #ec4141;
  color: white;
}
</style>