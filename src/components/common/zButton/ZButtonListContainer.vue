<template>
  <div class="z-button-list-container" :class="`is-${contentAlign || 'right'}`">
    <slot />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  contentAlign?: "left" | "right";
}>();
</script>
<style lang="scss" scoped>
.z-button-list-container {
  display: flex;
  align-items: flex-start;
  gap: var(--z-layout-gutter-sm);
  width: 100%;
  height: 100%;

  &.is-right {
    justify-content: flex-end;

    & > *:first-child {
      margin-left: auto;
    }
  }

  &.is-left {
    justify-content: flex-start;

    & > *:first-child {
      margin-right: auto;
    }
  }
}
</style>
