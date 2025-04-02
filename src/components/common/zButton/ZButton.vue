<template>
  <div class="z-button-container">
    <button
      class="z-button"
      :class="getButtonClasses"
      v-bind="disabled ? { disabled } : {}"
      @click="onClick"
    >
      <div class="z-button__content">
        <span
          v-if="$slots.icon"
          class="z-button__icon"
        >
          <slot name="icon" />
        </span>
        <span
          v-if="props.text || $slots.default"
          class="z-button__text"
        >
          <span v-if="props.text">{{ props.text }}</span>
          <span v-else><slot /></span>
        </span>
      </div>
    </button>
  </div>
</template>
<script lang="ts" setup>
import { computed, useSlots } from 'vue';

const props = defineProps<{
    text?: string;
    size?: 'sm' | 'md';
    color?: 'blue' | 'red' | 'purple' | 'light-green';
    isShy?: boolean;
    iconPosition?: 'left' | 'right';
    disabled?: boolean;
    isAnimate?: boolean;
    isClickAnimate?: boolean;
    isActive?: boolean;
}>();

const emit = defineEmits<{
    (e: 'click', evt?: Event): void
}>();

const slots = useSlots();

const getButtonClasses = computed(() => {
    return [
        {
            'is-active': props.isActive,
            'is-shy': props.isShy,
            'is-animate': props.isAnimate && slots.icon && (slots.default || props.text),
            'is-click-animate': props.isClickAnimate && slots.icon && (slots.default || props.text),
        },
        `size-${props.size || 'sm'}`,
        slots.icon ? `is-${props.iconPosition || 'right'}` : '',
    ];
});

const getContainerAlign = computed(() => {
    return props.iconPosition === 'left' ? 'flex-start' : 'flex-end';
});

const getAccentColor = computed(() => {
    return `var(--z-button-${props.color || 'blue'}-color)`;
});

const getAccentStroke = computed(() => {
    return `var(--z-button-${props.color || 'blue'}-stroke)`;
});

const getAccentDecor = computed(() => {
    return `var(--z-button-${props.color || 'blue'}-decor)`;
});

const onClick = (evt?: Event) => {
    emit('click', evt);
};
</script>
<style lang="scss" scoped>
body.body .reset-library-styles .z-button-container.z-button-container {
  &,
  *,
  &:deep(*) {
    line-height: 1;
    font-size: var(--z-font-size-button);
    --z-font-family: var(--z-font-family-header);
  }
}

.z-button-container {
  --z-button-blue-color: var(--z-accent-color);
  --z-button-blue-stroke: var(--z-accent-color);
  --z-button-blue-decor: var(--z-accent-color);
  --z-button-red-color: var(--z-accent-color-canceled);
  --z-button-red-stroke: var(--z-accent-color-canceled);
  --z-button-red-decor: var(--z-accent-color-canceled);
  --z-button-purple-color: var(--z-blue-lotus);
  --z-button-purple-stroke: var(--z-blue-lotus);
  --z-button-purple-decor: var(--z-blue-lotus);
  --z-button-light-green-color: var(--z-honeysuckle);
  --z-button-light-green-stroke: var(--z-honeysuckle);
  --z-button-light-green-decor: var(--z-honeysuckle);

  --z-button-background: var(--inverse-normal-bg);
  --z-button-background-hover: var(--inverse-hover-bg-simple);
  --z-button-background-hover-inverse: var(--inverse-hover-bg);
  --z-button-background-pressed-inverse: var(--inverse-pressed-bg);

  --z-button-color: v-bind(getAccentColor);
  --z-button-stroke: v-bind(getAccentStroke);
  --z-button-decor: v-bind(getAccentDecor);
  --z-button-icon-size: 24px;
  --z-button-decor-size: var(--z-button-icon-size);

  display: flex;
  justify-content: v-bind(getContainerAlign);

  .z-button-search-container & {
    --z-button-background: var(--main-layout-bg);
    --z-button-background-hover: var(--main-layout-bg);
    --z-button-background-hover-inverse: var(--main-layout-bg);
    --z-button-background-pressed-inverse: var(--main-layout-bg);
  }
}

.z-button {
  outline: none;
  border: 1px solid var(--z-button-stroke);
  cursor: pointer;
  margin: 0;
  padding: 0;
  background-color: transparent;
  color: var(--z-button-color);
  transition: var(--z-transition-duration);
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: var(--z-border-radius-xs);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--z-button-background);
    transition: var(--z-transition-duration);
    border-radius: var(--z-border-radius-xs);
  }

  &:not(&:disabled):hover,
  &.is-active {
    &::after {
      background-color: var(--z-button-background-hover);
    }
  }

  &:not(&:disabled):hover:focus,
  &:not(&:disabled):focus,
  &.is-active {
    &::after {
      background-color: var(--z-button-background-hover);
    }
  }

  &.is-left,
  &.is-right {
    &:not(&:disabled):hover,
    &.is-active {
      &::after {
        background-color: var(--z-button-background-hover-inverse);
      }
    }

    &:not(&:disabled):hover:focus,
    &:focus,
    &.is-active {
      color: var(--z-button-color);

      &::after {
        background-color: var(--z-button-background-pressed-inverse);
      }
    }
  }

  &.is-right,
  &.is-left {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: calc(0.5 * var(--z-layout-gutter-xxs));
      width: calc(var(--z-button-icon-size) + var(--z-button-decor-size));
      z-index: 0;
      transition: var(--z-transition-duration);
      border-bottom: var(--z-layout-gutter-xxs) solid var(--z-button-decor);
      border-left: var(--z-layout-gutter-xxs) solid transparent;
      border-right: var(--z-layout-gutter-xxs) solid transparent;
      height: 0;
      background-color: transparent;
      will-change: filter;
      filter: drop-shadow(0 1px 4px transparent);
    }

    &:not(&:disabled):hover {
      &::before {
        top: calc(-1 * var(--z-layout-gutter-xxs));
        filter: drop-shadow(0 1px 4px var(--z-button-decor));
      }
    }

    &:not(&:disabled):hover:focus,
    &:focus {
      &::before {
        top: calc(-1 * var(--z-layout-gutter-xxs));
      }
    }
  }

  &.is-right {
    &::before {
      left: auto;
      right: calc(0.5 * var(--z-layout-gutter-xxs));
    }
  }

  &.size-sm {
    --z-button-decor-size: 4px;
    padding: var(--z-layout-gutter-xxs);

    &.is-animate {
      width: 34px;

      &:not(:disabled):hover,
      &:not(:disabled):focus {
        width: 100%;
      }
    }

    &.is-click-animate {
      width: 34px;

      &.is-active {
        width: 100%;
      }
    }
  }

  &.size-md {
    --z-button-decor-size: 16px;
    padding: var(--z-layout-gutter-sm);

    &.is-animate {
      width: 46px;

      &:not(:disabled):hover,
      &:not(:disabled):focus {
        width: 100%;
      }
    }

    &.is-click-animate {
      width: 46px;

      &.is-active {
        width: 100%;
      }
    }
  }

  &.is-shy {
    border-color: var(--z-accent-border);
    color: var(--main-layout-color);

    &:not(&:disabled):hover,
    &:not(&:disabled):focus {
      border-color: var(--z-button-stroke);
      color: var(--z-button-color);
    }
  }

  &:disabled {
    cursor: not-allowed;
    border-color: var(--inverse-disabled-bg);
    opacity: 1 !important;
    color: var(--inverse-disabled-color);

    &::after {
      background-color: var(--inverse-disabled-bg);
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;

    .is-left > & {
      justify-content: flex-start;
    }

    .is-right > & {
      justify-content: flex-end;
    }
  }

  &__text {
    display: block;
    overflow: hidden;
    flex-grow: 1;

    span {
      display: block;
      white-space: nowrap;
      padding: var(--z-layout-gutter-xxs) var(--z-layout-gutter-sm);
    }
  }

  &__icon {
    flex-shrink: 0;
    width: var(--z-button-icon-size);
    height: var(--z-button-icon-size);

    .is-left > .z-button__content > & {
      order: 0;
    }

    .is-right > .z-button__content > & {
      order: 1;
    }
  }

  &:deep(.z-button-search) {
    width: 100%;

    .q-field__control {
      padding: 0;
      height: auto;
      border-radius: 0;
      line-height: 1;
      width: 100%;
    }

    .q-field__native,
    .q-field__input {
      line-height: 1 !important;
      padding: 0;
    }

    .q-field__native::placeholder {
      color: var(--z-fourth-text-color);
      opacity: 1;
    }

    .q-field__control::before,
    .q-field__control::after {
      display: none;
    }

    .q-field__append,
    .q-field__prepend {
      height: 100%;
    }
  }
}
</style>
