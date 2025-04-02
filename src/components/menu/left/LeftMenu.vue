<template>
  <div class="side-menu" :class="{ 'side-menu--collapsed': isCollapsed }">
    <button class="side-menu__toggle" @click="toggleMenu">
      {{ isCollapsed ? '>' : '<' }}
    </button>
    <nav class="side-menu__nav">
      <ul class="side-menu__list">
        <li
            v-for="[key, item] in chartsMap"
            :key="key"
            class="side-menu__item cursor-pointer"
        >
          <span v-show="!isCollapsed" class="side-menu__text">{{ item.title }}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {chartsMap} from "@/store";

const isCollapsed = ref(false)

const toggleMenu = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.side-menu {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 250px;
  background-color: #2c3e50;
  color: white;
  transition: width 0.3s ease;
  z-index: 1000;
}

.side-menu--collapsed {
  width: 60px;
}

.side-menu__toggle {
  position: absolute;
  right: -15px;
  top: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #2c3e50;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.side-menu__nav {
  padding: 20px 0;
}

.side-menu__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.side-menu__item {
  margin: 5px 0;
}

.side-menu__link {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.side-menu__link:hover {
  background-color: #34495e;
}

.side-menu__icon {
  margin-right: 15px;
  font-size: 20px;
}

.side-menu__text {
  font-size: 16px;
}
</style>
