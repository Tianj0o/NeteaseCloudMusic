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
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
}
</style>