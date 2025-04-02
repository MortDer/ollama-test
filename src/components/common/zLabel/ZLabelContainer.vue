<template>
  <section
    class="z-label-container"
    :class="getClasses"
  >
    <div
      v-if="text || $slots.labelText"
      class="z-label-container__title"
    >
      <z-label
        :text="text"
        :color="labelColor"
        :label-align="labelAlign"
      >
        <template
          v-if="$slots.labelIcon"
          #labelIcon
        >
          <slot name="labelIcon" />
        </template>
        <slot
          v-if="$slots.labelText"
          name="labelText"
        />
      </z-label>
    </div>
    <div
      v-if="$slots.default"
      class="z-label-container__body"
    >
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
import ZLabel from '@/components/redisign/common/zLabel/ZLabel.vue';
import { computed } from 'vue';

interface IZLabelContainer {
    text?: string;
    labelColor?: string;
    backgroundClass?: string;
    noBorder?: boolean;
    labelAlign?: 'center' | 'none';
    paddingSize?: 'md' | 'sm';
    paddingHorizontal?: boolean;
}

const props = withDefaults(defineProps<IZLabelContainer>(), {
    paddingHorizontal: true,
});

const getClasses = computed(() => {
    return [
        props.backgroundClass || 'z-3d-main-color-theme',
        `padding-size--${props.paddingSize || 'md'}`,
        {
            'no-border': props.noBorder,
            'padding-horizontal-none': !props.paddingHorizontal,
        },
    ];
});

</script>

<style lang="scss" scoped>
.z-label-container {
  width: 100%;
  background-color: var(--main-layout-bg);
  border-top: 1px solid var(--inverse-border-color-label);

  &.no-border {
    border: none;
  }

  &.padding-size {
    &--md {
      padding: var(--z-layout-gutter-md);
    }
  }

  &.padding-size {
    &--sm {
      padding: var(--z-layout-gutter-sm);
    }
  }

  &.padding-horizontal-none {
    padding-left: 0;
    padding-right: 0;
  }

  &__title + &__body {
    margin-top: var(--z-layout-gutter-md);
  }

  &__body {
    color: var(--main-layout-color);
  }
}
</style>
