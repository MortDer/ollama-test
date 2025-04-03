<template>
  <div class="z-tab-list-container" :class="`size-${props.size || 'md'}`">
    <q-tabs
      v-model="getModelValue"
      class="z-tab-list"
      dense
      no-caps
      outside-arrows
    >
      <div
        v-for="(tab, index) in tabList"
        :key="index"
        class="z-tab-list__item"
      >
        <q-tab
          :id="tab.name"
          class="z-tab-list-item"
          :name="tab.name"
          :label="tab.label"
        />
      </div>
    </q-tabs>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: string;
  tabList: { name: string; label: string }[];
  size?: "sm" | "lg";
}>();

const emit = defineEmits<{
  (e: "update:model-value", value: string): void;
}>();

const getModelValue = computed({
  get() {
    return props.modelValue;
  },

  set(value: string) {
    emit("update:model-value", value);
  },
});
</script>
<style lang="scss" scoped>
body.body .reset-library-styles .z-tab-list-container.z-tab-list-container {
  &,
  &:deep(*) {
    line-height: 1;
    font-size: var(--z-font-size-button);
    font-weight: 400;
  }

  &.size-lg {
    font-size: var(--z-font-size-large);
    --z-font-family: var(--z-font-family-header);
  }

  &:deep(.q-tab__label) {
    --z-font-family: var(--z-font-family-header);
  }
}

.z-tab-list-container {
  max-width: 100%;
  border-bottom: 1px solid var(--z-fourth-text-color);

  &.size-lg {
    &:deep(.q-tabs__content) {
      padding-top: var(--z-layout-gutter-md);
    }
  }

  &:deep(.q-tabs__arrow) {
    width: 10px !important;
    height: 10px !important;
    top: auto !important;
    bottom: 16px !important;
  }
}

.z-tab-list-item {
  color: var(--z-fifth-text-color);
  padding: var(--z-layout-gutter-sm) var(--z-layout-gutter-md);
  text-transform: uppercase;

  .size-lg & {
    padding: 20px 40px;

    &.q-tab--active {
      color: var(--z-accent-color);
    }
  }

  &:hover,
  &:focus {
    color: var(--z-accent-color);
  }

  &:deep(.q-tab__indicator) {
    position: absolute;
    bottom: 0;
    left: 8px;
    right: 8px;
    width: calc(100% - 16px);
    z-index: 0;
    transition: var(--z-transition-duration);
    border-bottom: var(--z-layout-gutter-xxs) solid var(--z-accent-color);
    border-left: var(--z-layout-gutter-xxs) solid transparent;
    border-right: var(--z-layout-gutter-xxs) solid transparent;
    height: 0;
    background-color: transparent;
    will-change: filter;
    filter: drop-shadow(0 1px 8px var(--z-accent-color));

    .size-lg & {
      bottom: auto;
      top: 0;
      filter: drop-shadow(0 1px 4px var(--z-accent-color));
    }
  }

  &:deep(.q-focus-helper) {
    display: none;
  }

  &:deep(.q-ripple) {
    display: none;
  }
}
</style>
