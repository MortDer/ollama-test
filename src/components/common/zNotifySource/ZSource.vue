<template>
  <div class="z-source" :class="`is-${type || 'none'}`">
    <div class="z-source__container">
      <div v-if="isIndicator" class="z-source__indicator" />
      <div class="z-source__text">
        {{ label || "-" }}
      </div>
      <div v-if="isIndicator && type !== 'sent'" class="z-source__icon">
        <z-arrow-external-right-icon
          v-if="isArrow"
          :class="`is-${type || 'none'}`"
        />
        <span v-else>-</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import ZArrowExternalRightIcon from "@/components/redisign/zIconList/ZArrowExternalRightIcon.vue";

const props = defineProps<{
  label?: string;
  type?: "error" | "none" | "received" | "sent" | "human" | "scb" | "emd";
}>();

const notificationTypeList = ["error", "none", "received", "sent"];

const sourceTypeList = ["human", "scb", "emd"];

const arrowIndicatorList = ["error", "received"];

const isIndicator = computed(() =>
  notificationTypeList.includes(props.type || "none"),
);
const isArrow = computed(() =>
  arrowIndicatorList.includes(props.type || "none"),
);

const getSourceFill = computed(() => {
  return `var(--z-lp-${props.type || "none"}-fill)`;
});

const getSourceStroke = computed(() => {
  return `var(--z-lp-${props.type || "none"}-stroke)`;
});

const getSourceTextColor = computed(() => {
  if (isIndicator.value) {
    return `var(--z-lp-${props.type || "none"}-text)`;
  }
  return "var(--z-white)";
});

const getContainerWidth = computed(() => {
  if (isIndicator.value) {
    return "100%";
  }
  return "fit-content";
});

const getSourceGutter = computed(() => {
  if (isIndicator.value) {
    return "var(--z-layout-gutter-xs) var(--z-layout-gutter-md) var(--z-layout-gutter-xs) var(--z-layout-gutter-xs)";
  }
  return "var(--z-layout-gutter-xs)";
});
</script>
<style lang="scss" scoped>
body.body .reset-library-styles .z-source.z-source {
  &,
  * {
    line-height: 1;
    --z-font-family: var(--z-font-family-text);
  }

  &__text {
    font-size: var(--z-font-size-label);
  }
}

.z-source {
  --z-lp-human-stroke: var(--z-warm-purple);
  --z-lp-human-fill: var(--z-bleached-cedar-second);
  --z-lp-scb-stroke: var(--z-pale-sky);
  --z-lp-scb-fill: var(--z-baltic-sea-second);
  --z-lp-emd-stroke: var(--z-blue-orchid);
  --z-lp-emd-fill: var(--z-ebony-clay);

  --z-lp-error-stroke: var(--z-purple-brown);
  --z-lp-error-fill: var(--z-woody-brown);
  --z-lp-error-text: var(--z-bean-red);
  --z-lp-none-stroke: var(--z-bright-grey);
  --z-lp-none-fill: var(--z-charcoal);
  --z-lp-none-text: var(--z-cadet-blue);
  --z-lp-received-stroke: var(--z-mineral-green);
  --z-lp-received-fill: var(--z-plantation);
  --z-lp-received-text: var(--z-primary-green);
  --z-lp-sent-stroke: var(--z-yellow-metal);
  --z-lp-sent-fill: var(--z-judge-grey);
  --z-lp-sent-text: var(--z-attention-yellow);

  &__container {
    background-color: v-bind(getSourceFill);
    border: 1px solid v-bind(getSourceStroke);
    color: v-bind(getSourceTextColor);
    padding: v-bind(getSourceGutter);
    display: flex;
    flex-direction: row;
    gap: var(--z-layout-gutter-sm);
    align-items: center;
    border-radius: var(--z-border-radius-xs);
    width: v-bind(getContainerWidth);
  }

  &__indicator {
    --z-source-indicator-size: 12px;

    width: var(--z-source-indicator-size);
    height: var(--z-source-indicator-size);
    border-radius: 50%;
    background-color: v-bind(getSourceTextColor);
    flex-shrink: 0;
    position: relative;
    box-shadow: 0 0 8px v-bind(getSourceTextColor);

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(var(--z-source-indicator-size) / 3);
      height: calc(var(--z-source-indicator-size) / 3);
      border-radius: 50%;
      background-color: var(--z-white);
    }
  }

  &__icon {
    --z-source-icon-size: 8px;

    width: var(--z-source-icon-size);
    height: var(--z-source-icon-size);
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .is-received & {
      transform: rotate(270deg);
    }
  }
}
</style>
