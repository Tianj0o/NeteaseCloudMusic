<script setup lang="ts">import { useSlots } from 'vue';

const slots = useSlots()
console.log(slots);
</script>

<template>
  <div class="carousel">
    <slot></slot>
  </div>
</template>

<style scoped>
</style>