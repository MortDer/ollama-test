<template>
  <div class="main-layout">
    <div class="main-layout__left">
      <LeftMenu />
    </div>
    <div class="main-layout__content">
      <main class="main">
        <OllamaChat />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import OllamaChat from "@/components/OllamaChat.vue";
import LeftMenu from "@/components/menu/left/LeftMenu.vue";
</script>

<style scoped lang="scss">
.main-layout {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  gap: var(--z-layout-gutter-md);

  &__left {
    flex-shrink: 0;
    position: sticky;
    top: 0;
    border-top: 1px solid var(--inverse-border-color);
    border-bottom: 1px solid var(--inverse-border-color);
  }

  &__content {
    width: 100%;
    flex-grow: 1;
    padding: calc(2 * var(--z-layout-gutter-md)) var(--z-layout-gutter-md);
  }

  .main {
    width: 100%;
  }
}

//.main-layout {
//  display: flex;
//  min-height: 100vh;
//}
//
//.main-content {
//  flex: 1;
//  margin-left: 250px;
//  padding: 20px;
//  transition: margin-left 0.3s ease;
//}
//
//.side-menu--collapsed + .main-content {
//  margin-left: 60px;
//}
</style>
