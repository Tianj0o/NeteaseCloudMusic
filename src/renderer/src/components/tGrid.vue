<script setup lang="ts">
const props = defineProps<{
  columns: number,
  columsFlex?: string,
  rows?: number,
  rowsFlex?: string,
  gap?: string
}>()
const Style = {
  gridTemplateColumns: `repeat(${props.columns},${props.columsFlex ?? '1fr'})`,
  gridTemplateRows: `repeat(${props.rows}, ${props.columsFlex})`,
  gap: props.gap
}

</script>

<template>
  <div class="t-grid" :style="Style">
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.t-grid {
  display: grid;
  width: 100%;
}
</style>