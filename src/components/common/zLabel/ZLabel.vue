<template>
  <label
    :class="`z-label z-label--${ labelAlign }`"
    :style="{color: `var(${props.color || '--z-fourth-text-color'})`}"
  >
    <div class="z-label__wrapper">
      <div
        v-if="$slots.labelIcon"
        class="z-label__icon"
      >
        <slot name="labelIcon" />
      </div>
      <div class="z-label__text">
        <slot>
          {{ text }}
        </slot>
      </div>
    </div>
  </label>
</template>

<script lang="ts" setup>
const props = defineProps<{
    text?: string;
    color?: string;
    labelAlign?: 'center' | 'none';
}>();
</script>

<style lang="scss" scoped>
body.body .reset-library-styles .z-label.z-label {
  --z-font-family: var(--z-font-family-text);
  font-size: var(--z-font-size-text);
}

.z-label {
  --z-label-icon-size: 18px;

  &__wrapper {
    display: flex;

    :slotted(svg) {
      width: var(--z-label-icon-size);
      height: var(--z-label-icon-size);
    }
  }

  &--center {
    .z-label__wrapper {
      justify-content: center;
    }
  }

  &__icon {
    width: var(--z-label-icon-size);
    height: var(--z-label-icon-size);
    flex-shrink: 0;
    margin-right: var(--z-layout-gutter-sm);
    margin-top: -2px;
  }
}
</style>
