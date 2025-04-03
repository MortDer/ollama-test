<template>
  <div class="z-button-self-icon">
    <button
      class="z-button-self-icon__content"
      :class="`size-${size || 'xs'}`"
      v-bind="disabled ? { disabled } : {}"
    >
      <slot />
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  size?: "xs" | "sm" | "md";
  disabled?: boolean;
  color?: "blue" | "red" | "purple" | "light-green" | "lavender";
}>();

const getAccentColor = computed(() => {
  return props.color
    ? `var(--z-button-${props.color}-color)`
    : "var(--z-fourth-text-color)";
});
</script>
<style lang="scss">
.z-button-self-icon {
  --z-button-blue-color: var(--z-accent-color);
  --z-button-red-color: var(--z-accent-color-canceled);
  --z-button-purple-color: var(--z-blue-lotus);
  --z-button-light-green-color: var(--z-honeysuckle);
  --z-button-lavender-color: var(--z-fifth-text-color);

  --z-button-color: v-bind(getAccentColor);

  &__content {
    outline: none;
    border: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    background-color: transparent;
    width: 100%;
    height: 100%;
    color: var(--z-button-color);
    transition: var(--z-transition-duration);

    &:not(:disabled):hover,
    &:not(:disabled):focus {
      color: var(--main-layout-color);
    }

    &:disabled {
      background-color: var(--inverse-disabled-bg);
      color: var(--inverse-disabled-color);
    }

    &.size-xs {
      width: 20px;
      height: 20px;
    }

    &.size-sm {
      width: 24px;
      height: 24px;
    }

    &.size-md {
      width: 28px;
      height: 28px;
    }
  }
}
</style>
