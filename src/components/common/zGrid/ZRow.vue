<template>
  <section class="z-row">
    <div class="z-row__container">
      <slot />
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    cellCount?: number;
}>();

const getCellCount = computed(() => {
    return `${props.cellCount || '1'}`;
});
</script>

<style lang="scss" scoped>
.z-row {
  --z-cell-count: v-bind(getCellCount);
  --z-cell-gutter: var(--z-layout-gutter-sm);

  margin-bottom: var(--z-layout-gutter-sm);

  &:last-child {
    margin-bottom: 0;
  }

  &__container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--z-cell-gutter);

    &:deep(.z-cell) {
      --z-cell-width: calc((100% / var(--z-cell-count)) - ((var(--z-cell-count) - 1) * var(--z-cell-gutter)) / var(--z-cell-count));

      max-width: var(--z-cell-width);
      flex-basis: var(--z-cell-width);
    }
  }
}
</style>
