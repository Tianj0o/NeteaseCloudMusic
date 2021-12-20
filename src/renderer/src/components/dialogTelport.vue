<script setup lang="ts">
const props = withDefaults(defineProps<{
  teleport?: string,
  modelValue: boolean,
}>(), {
  teleport: 'body'
})
</script>

<template>
  <div class="dialog" v-if="props.modelValue">
    <teleport :to="props.teleport">
      <div class="telePort">
        <slot></slot>
      </div>
    </teleport>
  </div>
</template>

<style scoped>
.telePort {
  position: fixed;
  bottom: 70px;
  height: calc(100% - 131px);
  width: 100%;
  right: -24px;
  /* z-index: -9; */
}
</style>