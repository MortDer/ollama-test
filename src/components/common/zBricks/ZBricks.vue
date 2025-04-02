<template>
  <fieldset class="z-bricks fieldset">
    <legend
      v-if="props.title"
      class="fieldset__legend"
    >
      <strong>{{ props.title }}:</strong>
    </legend>
    <div
      class="z-bricks__list"
      :class="{'z-bricks__list--row': brickCount}"
    >
      <q-btn
        v-for="(item, index) in list"
        :key="item.value"
        :label="item.label"
        no-caps
        square
        class="z-bricks__item"
        :class="getButtonClasses(item, index)"
        :disable="disabled"
        @click="brickValue = item.value"
      />
    </div>
  </fieldset>
</template>

<script setup lang="ts" generic="T extends string | number">
import { isDefined } from '@/utils';
import { computed, onMounted } from 'vue';

interface BrickItem<P> {
    label: string,
    value: P
}

const props = defineProps<{
    modelValue: T,
    list: BrickItem<T>[],
    title?: string,
    brickCount?: number,
    disabled?: boolean
}>();

const emit = defineEmits<{
    (e: 'update:model-value', value: T): void;
    (e: 'update:init', value: boolean): void;
}>();

const brickValue = computed({
    get(): T {
        return props.modelValue;
    },

    set(value: T) {
        emit('update:model-value', value);
    },
});

const getBrickCount = computed(() => {
    return `${props.brickCount || '1'}`;
});

const getReminder = computed(() => {
    if (!isDefined(props.brickCount)) return undefined;

    return props.list.length % props.brickCount;
});

const getListLength = computed(() => {
    return props.list.length - 1;
});

const getCountIndex = computed(() => {
    if (!isDefined(props.brickCount)) return undefined;

    return props.brickCount - 1;
});

const getLastChild = () => {
    return getReminder.value
        ? undefined
        : getListLength.value;
};

const getLastRow = () => {
    if (!isDefined(getCountIndex.value)) return undefined;

    if (props.brickCount === 1) return getListLength.value;

    return getReminder.value
        ? getListLength.value - getReminder.value + 1
        : getListLength.value - getCountIndex.value;
};

const getButtonClasses = (item: BrickItem<T>, index: number) => {
    return {
        'is-active': brickValue.value === item.value,
        'is-top-left': index === 0,
        'is-top-right': index === getCountIndex.value,
        'is-bottom-right': index === getLastChild(),
        'is-bottom-left': index === getLastRow(),
    };
};

onMounted(() => emit('update:init', true));
</script>

<style scoped lang="scss">
body.body .reset-library-styles .z-bricks.z-bricks {
  &,
  *,
  &:deep(*) {
    line-height: 1;
    --z-font-family: var(--z-font-family-header);
  }
}

.z-bricks {
  min-width: 0;
  width: 100%;

  &__list {
    position: relative;
    padding: var(--z-layout-gutter-xxs) 3px;
    display: flex;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--z-accent-border);
      clip-path: polygon(6px 0,
          calc(100% - 6px) 0, 100% 6px,
          100% calc(100% - 6px), calc(100% - 6px) 100%,
          6px 100%, 0 calc(100% - 6px),
          0 6px);
      z-index: 0;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--main-layout-bg);
      clip-path: polygon(7px 1px,
          calc(100% - 7px) 1px, calc(100% - 1px) 7px,
          calc(100% - 1px) calc(100% - 7px), calc(100% - 7px) calc(100% - 1px),
          7px calc(100% - 1px), 1px calc(100% - 7px),
          1px 7px);
      z-index: 1;
    }

    &--row {
      --z-brick-count: v-bind(getBrickCount);

      flex-wrap: wrap;

      .z-bricks__item {
        --z-brick-width: calc((100% / var(--z-brick-count)) - 2px);

        max-width: var(--z-brick-width);
        flex-basis: var(--z-brick-width);

        &.q-btn {
          &.is-top-left {
            clip-path: polygon(4px 0,
                100% 0,
                100% 100%,
                0 100%, 0 calc(100% - 4px),
                0 4px);
          }

          &.is-top-right {
            clip-path: polygon(0 0,
                calc(100% - 4px) 0,
                100% 4px,
                100% 100%, 100% 100%,
                0 100%);
          }

          &.is-top-left.is-top-right {
            clip-path: polygon(4px 0,
                calc(100% - 4px) 0, 100% 4px,
                100% 100%,
                0 100%,
                0 4px);
          }

          &.is-bottom-right {
            clip-path: polygon(0 0,
                calc(100% - 4px) 0,
                100% 0,
                100% calc(100% - 4px), calc(100% - 4px) 100%,
                0 100%);
          }

          &.is-bottom-left {
            clip-path: polygon(0 0,
                100% 0,
                100% 100%,
                4px 100%, 0 calc(100% - 4px),
                0 4px);
          }

          &.is-bottom-right.is-bottom-left {
            clip-path: polygon(0 0,
                100% 0,
                100% calc(100% - 4px),
                calc(100% - 4px) 100%,
                4px 100%,
                0 calc(100% - 4px));
          }

          &.is-top-right.is-bottom-right {
            clip-path: polygon(0 0,
                calc(100% - 4px) 0,
                100% 4px,
                100% calc(100% - 4px),
                calc(100% - 4px) 100%,
                0 100%);
          }

          &.is-top-left.is-bottom-left {
            clip-path: polygon(4px 0,
                100% 0,
                100% 100%,
                4px 100%,
                0 calc(100% - 4px),
                0 4px);
          }

          &.is-top-left.is-top-right.is-bottom-right.is-bottom-left {
            clip-path: polygon(4px 0,
                calc(100% - 4px) 0,
                100% 4px,
                100% calc(100% - 4px),
                calc(100% - 4px) 100%,
                4px 100%,
                0 calc(100% - 4px),
                0 4px);
          }
        }
      }
    }
  }

  &__item {
    z-index: 2;
    width: 100%;
    background-color: var(--inverse-input-icon-bg);
    border: none;
    box-shadow: none;
    margin: 1px 1px;

    &::before {
      box-shadow: none;
    }

    &:first-child {
      clip-path: polygon(4px 0,
          100% 0,
          100% 100%,
          4px 100%, 0 calc(100% - 4px),
          0 4px);
    }

    &:last-child {
      clip-path: polygon(0 0,
          calc(100% - 4px) 0,
          100% 4px,
          100% calc(100% - 4px), calc(100% - 4px) 100%,
          0 100%);
    }

    &:first-child:last-child {
      clip-path: polygon(4px 0,
          calc(100% - 4px) 0,
          100% 4px,
          100% calc(100% - 4px),
          calc(100% - 4px) 100%,
          4px 100%,
          0 calc(100% - 4px),
          0 4px);
    }

    &.q-btn {
      --z-font-family: var(--z-font-family-text);
      font-size: 12px;
      font-weight: 400;
      line-height: 1;

      &:hover {
        color: var(--z-text-color);
      }

      &.is-active {
        color: var(--z-text-color);
        background-color: var(--z-accent-border);
      }
    }
  }
}
</style>
