<template>
  <div class="z-operation">
    <div class="z-operation__label">
      <span>{{ label || '-' }}</span>
      <span
        v-if="fullLabel"
        :style="{color: getColorBorder}"
      >{{ fullLabel }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
    label?: string,
    fullLabel?: string,
    color?: string[],
    size?: number,
    mediaSize?: number,
}>();

const DEFAULT_SIZE = 14;
const WIDTH_KOEF = 0.56;

const getColorBorder = computed(() => (props.color ? `var(${props.color?.[0]})` : 'var(--z-second-text-color)'));
const getColor = computed(() => (props.color ? `var(${props.color?.[1]})` : 'var(--z-text-color)'));

const getSize = computed(() => `${props.size || DEFAULT_SIZE}px`);
const getWidth = computed(() => (`${(props.size || DEFAULT_SIZE) / WIDTH_KOEF}px`));

const getMediaSize = computed(() => `${props.mediaSize || DEFAULT_SIZE}px`);
const getMediaWidth = computed(() => (`${(props.mediaSize || DEFAULT_SIZE) / WIDTH_KOEF}px`));
</script>
<style lang="scss" scoped>
/* todo: удалить .base-table-layout */
body.body .base-table-layout .z-operation.z-operation,
body.body .reset-library-styles .z-operation.z-operation {
  .z-operation__label {
    font-size: v-bind(getSize);

    &,
    *,
    &:deep(*) {
      --z-font-family: var(--z-font-family-text);
    }

    @media (max-width: 1919px) {
      font-size: v-bind(getMediaSize);
    }
  }
}

.z-operation {
  --z-station-green-text: var(--z-green-text);
  --z-station-green-border: var(--z-green-h1);
  --z-station-blue-text: var(--z-blue-text);
  --z-station-blue-border: var(--z-blue-h1);
  --z-station-purple-text: var(--z-purple-text);
  --z-station-purple-border: var(--z-purple-h1);
}

.z-operation {
  &__label {
    border: 1px solid v-bind(getColorBorder);
    color: v-bind(getColor);
    min-width: v-bind(getWidth);
    min-height: v-bind(getWidth);
    padding: var(--z-layout-gutter-xxs);
    border-radius: 54px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    @media(max-width: 1919px) {
      min-width: v-bind(getMediaWidth);
      min-height: v-bind(getMediaWidth);
    }
  }
}
</style>
