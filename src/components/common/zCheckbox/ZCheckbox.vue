<template>
  <q-checkbox v-bind="$props" size="14px" class="z-checkbox">
    <template v-if="tooltip">
      <q-tooltip v-bind="$props.tooltip" class="gid-tooltip">
        <slot name="tooltip" />
      </q-tooltip>
    </template>
    <slot />
  </q-checkbox>
</template>
<script lang="ts" setup>
import type { QCheckboxProps, QCheckboxSlots, QTooltipProps } from "quasar";
import { VNode } from "vue";

interface IVCheckboxProps extends QCheckboxProps {
  tooltip?: QTooltipProps | undefined;
}

interface IVCheckboxSlots extends QCheckboxSlots {
  tooltip: () => VNode[];
}

const props = withDefaults(defineProps<IVCheckboxProps>(), {
  tooltip: undefined,
});

defineSlots<IVCheckboxSlots>();
</script>
<style scoped lang="scss">
body.body .reset-library-styles .z-checkbox.z-checkbox {
  &,
  *,
  &:deep(*) {
    line-height: 16px;
    font-size: var(--z-font-size-input);
    --z-font-family: var(--z-font-family-text);
  }
}

.z-checkbox {
  --z-input-icon-size: 16px;
  --z-input-line-height: 14px;

  align-items: flex-start;
  line-height: var(--z-input-line-height);
  width: 100%;
  min-width: 0;

  &:deep(.q-checkbox__svg) {
    padding: 2px;
  }

  &[aria-checked="true"] {
    &:deep(.q-checkbox__bg) {
      border: 1px solid var(--z-accent-color);
      background-color: var(--main-layout-bg);
    }

    &:deep(.q-checkbox__label) {
      color: var(--z-text-color);
    }
  }

  &[aria-checked="mixed"] {
    &:deep(.q-checkbox__bg) {
      border: 1px solid var(--z-accent-color);
      background-color: var(--main-layout-bg);
    }

    &:deep(.q-checkbox__label) {
      color: var(--z-text-color);
    }
  }

  &:hover:not(.disabled) {
    &:deep(.q-checkbox__bg) {
      border: 1px solid var(--z-accent-color);
    }

    &:deep(.q-checkbox__label) {
      color: var(--z-accent-color);
    }
  }

  &.disabled {
    &:deep(.q-checkbox__bg) {
      border: 1px solid var(--inverse-disabled-color);
      background-color: var(--inverse-disabled-bg);
    }

    &:deep(.q-checkbox__label) {
      color: var(--inverse-disabled-color);
    }
  }

  &:deep(.q-checkbox__inner) {
    width: var(--z-input-icon-size);
    height: var(--z-input-icon-size);
    flex-shrink: 0;
  }

  &:deep(.q-checkbox__label) {
    line-height: var(--z-input-line-height);
    margin-left: var(--z-layout-gutter-sm);
    color: var(--z-text-color);
    transition: color var(--z-transition-duration);
    word-break: break-all;
  }

  &:deep(.q-checkbox__bg) {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid var(--z-fourth-text-color);
    border-radius: var(--z-border-radius-xs);
    transition: border-color var(--z-transition-duration);
  }
}
</style>
