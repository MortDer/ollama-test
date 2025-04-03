<template>
  <div class="z-cell" :class="getClasses" :style="getStyles">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  horizontalAlign?: "center" | "left" | "right";
  // verticalAlign?: 'top' | 'middle' | 'bottom';
  backgroundColor?: string;
  isInverse?: boolean;
}>();

const getClasses = computed(() => {
  return [
    `horizontal-align-${props.horizontalAlign || "left"}`,
    // `vertical-align-${props.horizontalAlign || 'top'}`,
  ];
});

const getStyles = computed(() => {
  const bg = props.backgroundColor
    ? `var(${props.backgroundColor})`
    : "transparent";
  const isInverseBg = props.isInverse ? "var(--inverse-table-header)" : bg;

  return {
    backgroundColor: isInverseBg,
    padding:
      props.backgroundColor || props.isInverse
        ? "var(--z-layout-gutter-xs)"
        : 0,
  };
});
</script>
<style lang="scss" scoped>
.z-cell {
  &.horizontal-align {
    &-center {
      text-align: center;
    }

    &-left {
      text-align: left;
    }

    &-right {
      text-align: right;
    }
  }
}
</style>
