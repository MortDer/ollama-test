<template>
  <div class="z-button-direction-container">
    <button
      class="z-button-direction"
      :class="getButtonClasses"
      v-bind="disabled ? { disabled } : {}"
      @click="onClick"
    >
      <div class="z-button-direction__decor" />
      <div class="z-button-direction__content">
        <span
          v-if="props.text || $slots.default"
          class="z-button-direction__text"
        >
          <template v-if="props.text">{{ props.text }}</template>
          <template v-else><slot /></template>
        </span>
      </div>
    </button>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
    text?: string;
    size?: 'xs' | 'sm' | 'md';
    color?: 'blue' | 'red' | 'purple' | 'light-green';
    isShy?: boolean;
    disabled?: boolean;
    isLeft?: boolean;
    isActive?: boolean;
}>();

const emit = defineEmits<{
    (e: 'click', evt?: Event): void
}>();

const getButtonClasses = computed(() => {
    return [
        {
            'is-active': props.isActive,
            'is-shy': props.isShy,
            'is-left': props.isLeft,
        },
        `size-${props.size || 'sm'}`,
    ];
});

const getAccentColor = computed(() => {
    return `var(--z-button-direction-${props.color || 'blue'}-color)`;
});

const getAccentStroke = computed(() => {
    return `var(--z-button-direction-${props.color || 'blue'}-stroke)`;
});

const getAccentDecor = computed(() => {
    return `var(--z-button-direction-${props.color || 'blue'}-decor)`;
});

const onClick = (evt?: Event) => {
    emit('click', evt);
};
</script>
<style lang="scss" scoped>
body.body .reset-library-styles .z-button-direction-container.z-button-direction-container {
  &,
  *,
  &:deep(*) {
    line-height: 1;
    font-size: var(--z-font-size-button);
    --z-font-family: var(--z-font-family-header);
  }
}

.z-button-direction-container {
  --z-button-direction-blue-color: var(--z-accent-color);
  --z-button-direction-blue-stroke: var(--z-accent-color);
  --z-button-direction-blue-decor: var(--z-accent-color);
  --z-button-direction-red-color: var(--z-accent-color-canceled);
  --z-button-direction-red-stroke: var(--z-accent-color-canceled);
  --z-button-direction-red-decor: var(--z-accent-color-canceled);
  --z-button-direction-purple-color: var(--z-blue-lotus);
  --z-button-direction-purple-stroke: var(--z-blue-lotus);
  --z-button-direction-purple-decor: var(--z-blue-lotus);
  --z-button-direction-light-green-color: var(--z-honeysuckle);
  --z-button-direction-light-green-stroke: var(--z-honeysuckle);
  --z-button-direction-light-green-decor: var(--z-honeysuckle);

  --z-button-direction-background: var(--inverse-normal-bg);

  --z-button-direction-color: v-bind(getAccentColor);
  --z-button-direction-stroke: v-bind(getAccentStroke);
  --z-button-direction-decor: v-bind(getAccentDecor);
}

.z-button-direction {
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
  background-color: transparent;
  color: var(--z-button-direction-color);
  transition: var(--z-transition-duration);
  position: relative;
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: polygon(0 0,
        100% 0, 100% 6px,
        100% calc(100% - 6px), calc(100% - 6px) 100%,
        0 100%, 0px calc(100% - 4px),
        2px calc(100% - 6px), 2px 6px, 0 4px,
        0 0);
    background-color: var(--z-button-direction-stroke);
    z-index: 1;
    transition: var(--z-transition-duration);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: polygon(1px 1px,
        calc(100% - 1px) 1px, calc(100% - 1px) 7px,
        calc(100% - 1px) calc(100% - 7px), calc(100% - 7px) calc(100% - 1px),
        1px calc(100% - 1px), 1px calc(100% - 4px),
        3px calc(100% - 6px), 3px 6px, 1px 4px,
        1px 1px);
    background-color: var(--z-button-direction-background);
    z-index: 2;
  }

  &.is-left {
    &::before {
      clip-path: polygon(0 0,
          100% 0,
          100% 4px, calc(100% - 2px) 6px,
          calc(100% - 2px) calc(100% - 6px), 100% calc(100% - 4px),
          100% 100%, 6px 100%,
          0 calc(100% - 6px),
          0 0);
    }

    &::after {
      clip-path: polygon(1px 1px,
          calc(100% - 1px) 1px, calc(100% - 1px) 4px,
          calc(100% - 3px) 6px, calc(100% - 3px) calc(100% - 6px),
          calc(100% - 1px) calc(100% - 4px), calc(100% - 1px) calc(100% - 1px),
          7px calc(100% - 1px), 1px calc(100% - 7px),
          1px 1px);
    }
  }

  &:not(&:disabled):hover {
    &::after {
      background-color: var(--inverse-hover-bg);
    }
  }

  &:not(&:disabled):hover:focus,
  &:not(&:disabled):focus,
  &.is-active {
    color: var(--z-button-direction-color);

    &::after {
      background-color: var(--inverse-pressed-bg);
    }
  }

  &.size-sm {
    padding: var(--z-layout-gutter-xxs);
  }

  &.size-md {
    padding: var(--z-layout-gutter-sm);
  }

  &.is-shy {
    color: var(--main-layout-color);

    &::before {
      background-color: var(--z-accent-border);
    }

    &:not(&:disabled):hover,
    &:not(&:disabled):focus,
    &.is-active {
      color: var(--z-button-direction-color);

      &::before {
        background-color: var(--z-button-direction-stroke);
      }
    }
  }

  &:disabled {
    cursor: not-allowed;
    border-color: var(--inverse-disabled-bg);
    opacity: 1 !important;
    color: var(--inverse-disabled-color);

    &::before {
      background-color: var(--inverse-disabled-bg);
    }

    &::after {
      background-color: var(--inverse-disabled-bg);
    }
  }

  &__decor {
    position: absolute;
    top: 0;
    left: var(--z-layout-gutter-xxs);
    width: var(--z-layout-gutter-xxs);
    height: 100%;
    background-color: transparent;
    z-index: 0;
    transition: var(--z-transition-duration);

    .is-left > & {
      left: auto;
      right: var(--z-layout-gutter-xxs);
    }

    .z-button-direction:not(:disabled):hover &,
    .z-button-direction:not(:disabled):focus & {
      left: -1px;
      background-color: var(--z-button-direction-decor);
      filter: drop-shadow(0 0 8px var(--z-button-direction-decor));
    }

    .z-button-direction.is-left:not(:disabled):hover &,
    .z-button-direction.is-left:not(:disabled):focus & {
      left: auto;
      right: -1px;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--z-layout-gutter-xxs);
    position: relative;
    z-index: 3;
  }

  &__icon {
    .is-right & {
      order: 1;
    }
  }

  &__text {
    padding: var(--z-layout-gutter-xxs) var(--z-layout-gutter-sm);
  }
}
</style>
