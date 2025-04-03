<template>
  <!--  <header class="header z-3d-main-color-theme">Header</header>-->
  <div class="page-wrapper z-main-color-theme">
    <MainLayout />
  </div>
  <!--  <footer class="footer z-3d-main-color-theme">footer</footer>-->
</template>

<script setup lang="ts">
import MainLayout from "./layouts/MainLayout.vue";
</script>

<style lang="scss" scoped>
.page-wrapper {
  background-color: var(--main-layout-bg);
  color: var(--main-layout-color);
}
</style>
