<script setup lang="ts">
import { iconBlank, iconChecked } from "@/components/iconsCpns/index";
import { menuItem } from "@/config";
import { useRouter } from "vue-router";
defineProps<{
  item: menuItem;
  data?: menuItem[];
}>();
const router = useRouter();
function handleItemClick(item: menuItem) {
  emit("handleSetItemClick", item);
}

const emit = defineEmits(["handleSetItemClick"]);
</script>

<template>
  <div class="setItem">
    <div @click="handleItemClick(item)">
      <iconChecked v-if="item.isChecked" />
      <iconBlank v-else />
      <span class="name">{{ item.name }}</span>
    </div>
    <div class="children">
      <template v-if="item.children">
        <template v-for="childItem in item.children">
          <setItem
            @handleSetItemClick="handleItemClick(childItem)"
            :item="childItem"
            :data="data"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.setItem {
  width: 100%;
}
.name {
  color: black;
}
.children {
  padding-left: 20px;
}
</style>
