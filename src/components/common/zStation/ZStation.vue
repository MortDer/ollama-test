<template>
  <div class="z-station-container flex">
    <div
      class="z-station"
      :class="[isFinish ? 'z-station--finish' : `is-${align}`]"
    >
      <q-icon
        v-if="isFinish"
        name="arrow_right_alt"
        class="z-station__arrow"
        :color="getColor"
        size="24px"
      />
      <div class="z-station__label text-uppercase">
        {{ label || "-" }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  label?: string;
  isFinish?: boolean;
  color?: string[];
  align: "left" | "right";
  size?: number;
  mediaSize?: number;
}>();

const DEFAULT_SIZE = 14;

const getColorBorder = computed(() =>
  props.color ? `var(${props.color?.[0]})` : "var(--z-second-text-color)",
);
const getColor = computed(() =>
  props.color ? `var(${props.color?.[1]})` : "var(--z-text-color)",
);
const getSize = computed(() => `${props.size || DEFAULT_SIZE}px`);
const getMediaSize = computed(() => `${props.mediaSize || DEFAULT_SIZE}px`);
</script>
<style lang="scss" scoped>
body.body .reset-library-styles .z-station.z-station {
  &,
  *,
  &:deep(*) {
    --z-font-family: var(--z-font-family-text);
  }

  &__label {
    font-size: v-bind(getSize);
    line-height: 1.29;

    @media (max-width: 1919px) {
      font-size: v-bind(getMediaSize);
    }
  }
}

.z-station-container {
  --z-station-green-text: var(--z-green-text);
  --z-station-green-border: var(--z-green-h1);
  --z-station-blue-text: var(--z-blue-text);
  --z-station-blue-border: var(--z-blue-h1);
  --z-station-purple-text: var(--z-purple-text);
  --z-station-purple-border: var(--z-purple-h1);
}

.z-station {
  --arrow-width: 24px;

  border: 1px solid v-bind(getColorBorder);
  border-radius: 54px;
  color: v-bind(getColor);
  display: inline-block;

  position: relative;

  &.is-right {
    margin-left: auto;
    padding: var(--z-layout-gutter-xxs) 0 var(--z-layout-gutter-xxs)
      var(--z-layout-gutter-xs);
  }

  &--finish,
  &.is-left {
    position: relative;
    margin-left: 0;
    padding: var(--z-layout-gutter-xxs) var(--z-layout-gutter-xs)
      var(--z-layout-gutter-xxs) 0;
  }

  &__arrow {
    position: absolute;
    top: 0;
    left: -30px;
    width: var(--arrow-width);
    height: var(--arrow-width);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__label {
    position: relative;
    white-space: nowrap;

    .is-right & {
      padding-right: 22px;
    }

    .z-station--finish &,
    .is-left & {
      padding-right: 0;
      padding-left: 22px;
    }

    &::before {
      position: absolute;
      content: "";
      top: 50%;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: currentColor;
      transform: translateY(-50%);

      .is-right & {
        right: 8px;
      }

      .z-station--finish &,
      .is-left & {
        right: auto;
        left: 8px;
      }
    }
  }
}
</style>
