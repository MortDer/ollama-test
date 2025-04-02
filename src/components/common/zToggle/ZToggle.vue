import { ref } from "vue";

<template>
  <div class="z-toggle">
    <input
      :id="toggleId"
      v-model="toggleModelValue"
      type="checkbox"
      class="z-toggle__checkbox"
    >
    <label
      :for="toggleId"
      class="z-toggle__switch"
    >
      <span class="z-toggle__switch-norm">По графику</span>
      <span class="z-toggle__switch-noncompliance">Без графика</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:model-value', value: boolean): void;
}>();

const toggleId = `${getCurrentInstance()?.uid}` || 'toggle';

const toggleModelValue = computed({
    get: () => {
        return props.modelValue;
    },
    set: (value) => {
        emit('update:model-value', value);
    },
});
</script>
<style lang="scss" scoped>
body.body .reset-library-styles .z-toggle.z-toggle {
  --z-toggle-font-size: 12px;

  &,
  *,
  &:deep(*) {
    --z-font-family: var(--z-font-family-header);
    line-height: 1;
    font-size: var(--z-toggle-font-size);
  }
}

.z-toggle {
  --z-icon-width: 24px;
  --z-icon-hight: 22px;

  position: relative;
  width: 100%;
  height: 28px;
  display: inline-block;
  user-select: none;
  margin-bottom: var(--z-layout-gutter-sm);
  margin-right: var(--z-layout-gutter-sm);

  & > &__checkbox {
    display: none;
  }

  & > &__switch {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: var(--z-transition-duration);
    cursor: pointer;
    background-color: var(--z-3d-main-color);
    clip-path: polygon(
            14px 0,
            calc(100% - 14px) 0,
            100% 14px,
            calc(100% - 14px) 100%,
            14px 100%,
            0 14px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 22px;
  }

  &__switch-norm {
    color: var(--z-accent-color);
  }

  &__switch-noncompliance {
    color: var(--z-accent-color-canceled);
  }

  & > &__switch::before {
    position: absolute;
    content: "";
    width: var(--z-icon-width);
    height: var(--z-icon-hight);
    left: 6px;
    bottom: 3px;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='22' viewBox='0 0 24 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_2274_1327)'%3E%3Cpath d='M0.289696 11.79L10.4089 21.7173C10.4998 21.8068 10.6078 21.8778 10.7267 21.9264C10.8456 21.9749 10.9731 21.9999 11.1019 22C14.9998 22 18.8977 22 22.7957 22C22.9895 22.0003 23.1791 21.9441 23.3403 21.8385C23.5016 21.733 23.6273 21.5829 23.7015 21.4072C23.7757 21.2316 23.7951 21.0382 23.7572 20.8518C23.7193 20.6653 23.6258 20.494 23.4886 20.3597L17.824 14.8025C17.6871 14.6679 17.5125 14.5762 17.3224 14.539C17.1323 14.5019 16.9352 14.5209 16.7562 14.5937C16.5771 14.6665 16.4241 14.7898 16.3165 14.948C16.209 15.1062 16.1517 15.2922 16.1519 15.4823V19.2536L8.5334 11.79C8.35042 11.6093 8.24772 11.3649 8.24772 11.1102C8.24772 10.8555 8.35042 10.6111 8.5334 10.4304L16.1519 2.96881V6.74012C16.1517 6.93028 16.209 7.11624 16.3165 7.27444C16.4241 7.43263 16.5771 7.55595 16.7562 7.62875C16.9352 7.70156 17.1323 7.72058 17.3224 7.68341C17.5125 7.64624 17.6871 7.55455 17.824 7.41996L23.7154 1.64241C23.8523 1.5078 23.9455 1.33643 23.9832 1.14992C24.0209 0.963409 24.0015 0.770117 23.9274 0.594429C23.8532 0.418741 23.7277 0.268528 23.5667 0.162737C23.4056 0.0569458 23.2162 0.000318527 23.0224 -1.90735e-06C19.1245 -1.90735e-06 15.2266 -1.90735e-06 11.3286 -1.90735e-06C11.1998 9.72748e-05 11.0723 0.0251236 10.9534 0.0736408C10.8345 0.122158 10.7265 0.193218 10.6357 0.282743L0.289696 10.4304C0.198578 10.5196 0.126289 10.6255 0.0769691 10.7422C0.027647 10.8588 0.00226021 10.9839 0.00226021 11.1102C0.00226021 11.2365 0.027647 11.3615 0.0769691 11.4782C0.126289 11.5948 0.198578 11.7008 0.289696 11.79Z' fill='%235EC9F5'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_2274_1327'%3E%3Crect width='24' height='22' fill='white' transform='matrix(1 0 0 -1 0 22)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
    transition: var(--z-transition-duration);
    background-repeat: no-repeat;
  }

  & > &__switch::after {
    position: absolute;
    content: "";
    width: var(--z-icon-width);
    height: var(--z-icon-hight);
    right: 6px;
    bottom: 3px;
    background-image: url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.7093 11.79L11.5901 21.7173C11.4992 21.8068 11.3913 21.8778 11.2723 21.9264C11.1534 21.9749 11.0259 21.9999 10.8971 22C6.99921 22 3.10129 22 -0.796635 22C-0.990472 22.0003 -1.18003 21.9441 -1.34128 21.8385C-1.50254 21.733 -1.62823 21.5829 -1.70245 21.4072C-1.77666 21.2316 -1.79605 21.0382 -1.75817 20.8518C-1.72028 20.6653 -1.62681 20.494 -1.48961 20.3597L4.17502 14.8025C4.31195 14.6679 4.48653 14.5762 4.67663 14.539C4.86672 14.5019 5.06379 14.5209 5.24286 14.5937C5.42193 14.6665 5.57494 14.7898 5.6825 14.948C5.79006 15.1062 5.84734 15.2922 5.84707 15.4823V19.2536L13.4656 11.79C13.6486 11.6093 13.7513 11.3649 13.7513 11.1102C13.7513 10.8555 13.6486 10.6111 13.4656 10.4304L5.84707 2.96881V6.74012C5.84734 6.93028 5.79006 7.11624 5.6825 7.27444C5.57494 7.43263 5.42193 7.55595 5.24286 7.62875C5.06379 7.70156 4.86672 7.72058 4.67663 7.68341C4.48653 7.64624 4.31195 7.55455 4.17502 7.41996L-1.71637 1.64241C-1.85326 1.5078 -1.94644 1.33643 -1.98417 1.14992C-2.02189 0.963409 -2.00246 0.770117 -1.92833 0.594429C-1.85421 0.418741 -1.7287 0.268528 -1.56765 0.162737C-1.40659 0.0569458 -1.21721 0.000318527 -1.02339 -1.90735e-06C2.87454 -1.90735e-06 6.77245 -1.90735e-06 10.6704 -1.90735e-06C10.7992 9.72748e-05 10.9267 0.0251236 11.0456 0.0736408C11.1645 0.122158 11.2725 0.193218 11.3634 0.282743L21.7093 10.4304C21.8004 10.5196 21.8727 10.6255 21.9221 10.7422C21.9714 10.8588 21.9968 10.9839 21.9968 11.1102C21.9968 11.2365 21.9714 11.3615 21.9221 11.4782C21.8727 11.5948 21.8004 11.7008 21.7093 11.79Z' fill='%23F74E6B'/%3E%3C/svg%3E%0A");
    transition: var(--z-transition-duration);
    transform: translateX(100%);
    opacity: 0;
    background-repeat: no-repeat;
  }

  &__checkbox:checked + &__switch::before {
    transform: translateX(-100%);
    opacity: 0;
  }

  &__checkbox:checked + &__switch::after {
    transform: translateX(0);
    opacity: 1;
  }

  &__checkbox:checked + &__switch {
    padding-left: 0;
    padding-right: 22px;
  }

  &__checkbox:checked + &__switch {
    background-color: var(--z-3d-main-color);

    & .z-toggle__switch-noncompliance {
      display: inline;
    }

    & .z-toggle__switch-norm {
      display: none;
    }
  }

  &__switch-noncompliance {
    display: none;
  }
}
</style>
