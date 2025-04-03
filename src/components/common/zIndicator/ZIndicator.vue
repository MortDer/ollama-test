<template>
  <div :class="`z-indicator z-indicator--${mod}`">
    <div
      ref="unitRef"
      class="z-indicator__value"
      :class="{ 'is-animate-decimals': isDecimals, 'is-animate': isNumber }"
    >
      <span v-if="!isNumber">{{ value }}</span>
      <span v-else-if="unit">&nbsp;{{ unit }}</span>
    </div>
    <div v-if="mod !== 'none'" class="z-indicator__icon">
      <z-arrow-external-right-icon />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import ZArrowExternalRightIcon from "../../zIconList/ZArrowExternalRightIcon.vue";

const props = withDefaults(
  defineProps<{
    value: number | string;
    unit?: string;
    mod?: "down" | "up" | "none";
    animateAction?: boolean;
  }>(),
  {
    mod: "none",
    unit: "",
  },
);

const unitRef = ref();
const timeout = ref();

const unitValue = computed(() => props.value);
const isNumber = computed(() => typeof unitValue.value === "number");
const isDecimals = computed(
  () =>
    isNumber.value &&
    (String(unitValue.value).indexOf(".") !== -1 ||
      String(unitValue.value).indexOf(",") !== -1),
);

const getUnitValue = (value: number | string) => {
  if (isNumber.value) {
    (unitRef.value as HTMLElement)?.style.setProperty(
      "--percent",
      String(value),
    );
  }
};

const getAnimateUnit = () => {
  clearTimeout(timeout.value);

  if (isDecimals.value || isNumber.value) {
    getUnitValue(0);

    timeout.value = setTimeout(() => {
      getUnitValue(unitValue.value);
    }, 200);
  }
};

onMounted(() => {
  getAnimateUnit();
});

watch(
  () => props.animateAction,
  () => {
    getAnimateUnit();
  },
);
</script>

<style lang="scss" scoped>
@property --percent {
  syntax: "<number>";
  initial-value: 0;
  inherits: false;
}

@property --temp {
  syntax: "<number>";
  initial-value: 0;
  inherits: false;
}

@property --v1 {
  syntax: "<integer>";
  initial-value: 0;
  inherits: false;
}

@property --v2 {
  syntax: "<integer>";
  initial-value: 0;
  inherits: false;
}

body.body .reset-library-styles .z-indicator.z-indicator {
  --z-font-family: var(--z-font-family-text);
}

.z-indicator {
  --z-icon-size: 8px;

  font-size: var(--z-font-size-input);
  font-weight: 400;
  display: flex;
  gap: var(--z-layout-gutter-xxs);
  padding: calc(0.5 * var(--z-layout-gutter-xxs)) var(--z-layout-gutter-xxs);
  border: 0.3px solid var(--z-white);
  border-radius: var(--z-border-radius-xs);

  &--down {
    color: var(--z-error);
    background-color: rgba(255, 90, 101, 0.2);
    border-color: rgba(255, 90, 101, 0.2);
  }

  &--up {
    color: var(--z-primary-green);
    background-color: rgba(35, 222, 146, 0.2);
    border-color: rgba(35, 222, 146, 0.2);

    .z-indicator__icon svg {
      transform: rotate(-90deg);
    }
  }

  &__icon {
    flex-shrink: 0;
    width: var(--z-icon-size);
    height: var(--z-icon-size);
  }

  &__value {
    &.is-animate {
      --number: 1234;
      --integer: calc(var(--number));

      transition: --percent 2s;
      --temp: var(--percent);
      --v1: max(var(--temp), 0);
      counter-reset: v1 var(--v1);

      &::before {
        content: counter(v1);
      }
    }

    &.is-animate-decimals {
      --number: 1234.5678;
      --integer: calc(var(--number));

      transition: --percent 2s;
      --temp: var(--percent);
      --v1: max(var(--temp) - 0.5, 0);
      --v2: max((var(--temp) - var(--v1)) * 100, 0);
      counter-reset: v1 var(--v1) v2 var(--v2);

      &::before {
        content: counter(v1) "," counter(v2, decimal-leading-zero);
      }
    }
  }
}
</style>
