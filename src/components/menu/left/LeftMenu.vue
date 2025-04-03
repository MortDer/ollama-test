<template>
  <div class="left-menu z-3d-main-color-theme" :class="{ 'is-collapsed': isCollapsed }">
    <div class="left-menu__container">
      <z-button-self-icon
          size="md"
          color="blue"
          class="left-menu__toggle"
          @click="toggleMenu"
      >
        <z-window-maximize-icon v-if="isCollapsed"/>
        <z-window-minimize-icon v-else/>
      </z-button-self-icon>
      <nav class="left-menu__nav">
        <ul class="left-menu__list">
          <li
              v-for="[key, item] in reversedChartsMap"
              :key="key"
              class="left-menu__item"
              :class="{ 'is-active': isActive === key }"
              @click="isActive = key"
          >
            <span class="left-menu__decor"></span>
            <span class="left-menu__text">{{ item.title }}</span>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {chartsMap, type IResponseFeed} from "@/store";
import ZWindowMaximizeIcon from "@/components/zIconList/ZWindowMaximizeIcon.vue";
import ZWindowMinimizeIcon from "@/components/zIconList/ZWindowMinimizeIcon.vue";
import ZButtonSelfIcon from "@/components/common/zButton/ZButtonSelfIcon.vue";

const isCollapsed = ref(false)
const isActive = ref()

const reversedChartsMap = computed(() => {
  return new Map<string, IResponseFeed>([...chartsMap.value].reverse());
})

const toggleMenu = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped lang="scss">
.left-menu {
  background-color: var(--main-layout-bg);
  color: var(--main-layout-color);
  width: 300px;
  transition: width 0.3s ease-in-out;
  height: 100%;
  padding: calc(2.5 * var(--z-layout-gutter-md)) var(--z-layout-gutter-sm) var(--z-layout-gutter-md) var(--z-layout-gutter-sm);

  &.is-collapsed {
    width: calc(3.5 * var(--z-layout-gutter-md));
  }

  &__container {
    overflow: auto;
    overflow-x: hidden;
    height: 100%;
  }

  &__text {
    position: relative;
    z-index: 1;
    font-size: var(--z-font-size-label);
  }

  &__decor {
    display: block;

    background: transparent !important;
    opacity: 1 !important;

    position: absolute;
    z-index: 1;
    bottom: 0;
    right: 25px;
    top: auto;
    left: auto;

    width: 40px;
    height: 5px;
    transform: skewX(45deg);

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 3px;
      background: transparent !important;
      opacity: 1 !important;
      transition: var(--z-transition-duration);
    }

    &::before {
      background: var(--main-layout-bg) !important;
      top: 1px;
      left: 6px;
      width: calc(100% - 6px);
      height: 1px;
    }

    &::after {
      top: -1px;
      box-shadow: none;
      will-change: box-shadow;
      width: 100%;
      height: 100%;
    }

    .left-menu__item:hover &,
    .left-menu__item.is-active & {
      &::after {
        background-color: var(--z-accent-color) !important;
        box-shadow: 0 1px 8px var(--z-accent-color);
        border-color: var(--z-accent-color);
      }
    }
  }

  &__item {
    cursor: pointer;
    position: relative;
    padding: var(--z-layout-gutter-xxs) var(--z-layout-gutter-xs);
    padding-bottom: calc(var(--z-layout-gutter-sm));
    min-width: 100px;

    /* Декоративные элементы для заголовка */
    &::before,
    &::after {
      display: block !important;
      border: none !important;
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--inverse-input-icon-bg);
      z-index: 0;
      transition: var(--z-transition-duration);
    }

    /* Сложная форма для декоративного элемента */
    &::before {
      -webkit-clip-path: polygon(0 1px, 0.25px 0.5px, 0.4px 0.4px, 0.5px 0.25px, 1px 0,
          calc(100% - 1px) 0,
          calc(100% - 0.5px) 0.25px,
          calc(100% - 0.4px) 0.4px,
          calc(100% - 0.25px) 0.5px,
          100% 1px,
          100% calc(100% - 1px),
          calc(100% - 0.25px) calc(100% - 0.5px),
          calc(100% - 0.4px) calc(100% - 0.4px),
          calc(100% - 0.5px) calc(100% - 0.25px),
          calc(100% - 1px) 100%,
          calc(100% - 60px) 100%,
          calc(100% - 64px) calc(100% - 4px),
          1px calc(100% - 4px),
          0.5px calc(100% - 4.25px),
          0.4px calc(100% - 4.45px),
          0.25px calc(100% - 4.5px),
          0 calc(100% - 5px),
          0 1px);
      clip-path: polygon(0 1px, 0.25px 0.5px, 0.4px 0.4px, 0.5px 0.25px, 1px 0,
          calc(100% - 1px) 0,
          calc(100% - 0.5px) 0.25px,
          calc(100% - 0.4px) 0.4px,
          calc(100% - 0.25px) 0.5px,
          100% 1px,
          100% calc(100% - 1px),
          calc(100% - 0.25px) calc(100% - 0.5px),
          calc(100% - 0.4px) calc(100% - 0.4px),
          calc(100% - 0.5px) calc(100% - 0.25px),
          calc(100% - 1px) 100%,
          calc(100% - 60px) 100%,
          calc(100% - 64px) calc(100% - 4px),
          1px calc(100% - 4px),
          0.5px calc(100% - 4.25px),
          0.4px calc(100% - 4.45px),
          0.25px calc(100% - 4.5px),
          0 calc(100% - 5px),
          0 1px);
    }

    /* Внутренняя форма для декоративного элемента */
    &::after {
      -webkit-clip-path: polygon(1px 1px,
          calc(100% - 1px) 1px,
          calc(100% - 1px) calc(100% - 1px),
          calc(100% - 59px) calc(100% - 1px),
          calc(100% - 63px) calc(100% - 5px),
          1px calc(100% - 5px),
          1px 1px);
      clip-path: polygon(1px 1px,
          calc(100% - 1px) 1px,
          calc(100% - 1px) calc(100% - 1px),
          calc(100% - 59px) calc(100% - 1px),
          calc(100% - 63px) calc(100% - 5px),
          1px calc(100% - 5px),
          1px 1px);
    }

    & + & {
      margin-top: var(--z-layout-gutter-xxs);
    }

    &:hover,
    &.is-active {
      &::before {
        background: var(--z-accent-color);
      }
    }
  }

  &__toggle {
    position: absolute;
    top: var(--z-layout-gutter-xs);
    right: var(--z-layout-gutter-xs);
  }
}

//.left-menu {
//  position: fixed;
//  left: 0;
//  top: 0;
//  height: 100vh;
//  width: 250px;
//  background-color: #2c3e50;
//  color: white;
//  transition: width 0.3s ease;
//  z-index: 1000;
//}
//
//.left-menu--collapsed {
//  width: 60px;
//}
//
//.left-menu__toggle {
//  position: absolute;
//  right: -15px;
//  top: 20px;
//  width: 30px;
//  height: 30px;
//  border-radius: 50%;
//  background-color: #2c3e50;
//  color: white;
//  border: none;
//  cursor: pointer;
//  display: flex;
//  align-items: center;
//  justify-content: center;
//  z-index: 1001;
//  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
//}
//
//.left-menu__nav {
//  padding: 20px 0;
//}
//
//.left-menu__list {
//  list-style: none;
//  padding: 0;
//  margin: 0;
//}
//
//.left-menu__item {
//  margin: 5px 0;
//}
//
//.left-menu__link {
//  display: flex;
//  align-items: center;
//  padding: 12px 20px;
//  color: white;
//  text-decoration: none;
//  transition: background-color 0.3s ease;
//}
//
//.left-menu__link:hover {
//  background-color: #34495e;
//}
//
//.left-menu__icon {
//  margin-right: 15px;
//  font-size: 20px;
//}
//
//.left-menu__text {
//  font-size: 16px;
//}
</style>
