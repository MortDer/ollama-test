<template>
  <q-radio v-bind="$props" size="14px" class="z-radio">
    <slot />
  </q-radio>
</template>
<script lang="ts" setup>
import { QRadioProps } from "quasar";

const props = defineProps<QRadioProps>();
</script>

<style lang="scss" scoped>
body.body .reset-library-styles .z-radio.z-radio {
  &,
  *,
  &:deep(*) {
    line-height: 14px;
    font-size: var(--z-font-size-input);
    --z-font-family: var(--z-font-family-text);
  }
}

.z-radio {
  --z-input-icon-size: 16px;
  --z-input-line-height: 14px;

  align-items: flex-start;
  line-height: (--z-input-line-height);
  width: 100%;
  min-width: 0;

  &[aria-checked="true"] {
    &:deep(.q-radio__bg) {
      border: 1px solid var(--z-accent-color);
      background-color: var(--main-layout-bg);

      .q-radio__check {
        color: var(--z-accent-color);
        transform: scale(1.25);
      }
    }

    &:deep(.q-checkbox__label) {
      color: var(--z-text-color);
    }
  }

  &:hover:not(.disabled) {
    &:deep(.q-radio__bg) {
      border: 1px solid var(--z-accent-color);
    }

    &:deep(.q-radio__label) {
      color: var(--z-accent-color);
    }
  }

  &.disabled {
    &:deep(.q-radio__bg) {
      border: 1px solid var(--inverse-disabled-color);
      background-color: var(--inverse-disabled-bg);
    }

    &:deep(.q-radio__label) {
      color: var(--inverse-disabled-color);
    }
  }

  &:deep(.q-radio__inner) {
    width: var(--z-input-icon-size);
    height: var(--z-input-icon-size);
    flex-shrink: 0;
  }

  &:deep(.q-radio__label) {
    line-height: var(--z-input-line-height);
    margin-left: var(--z-layout-gutter-sm);
    margin-top: calc(var(--z-layout-gutter-xxs) - 2px);
    color: var(--z-text-color);
    transition: color var(--z-transition-duration);
    word-break: break-all;
  }

  &:deep(.q-radio__bg) {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid var(--z-fourth-text-color);
    border-radius: 50%;
    transition: border-color var(--z-transition-duration);
    color: transparent;
  }

  &:deep(.q-radio__check) {
    width: calc(var(--z-input-icon-size) - 8px);
    height: calc(var(--z-input-icon-size) - 8px);
  }
}
</style>
