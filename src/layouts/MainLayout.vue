<template>
  <div class="main-layout">
    <LeftMenu />
    <main class="main-content">
      <OllamaChat />
    </main>
  </div>
</template>

<script setup lang="ts">
import OllamaChat from '@/components/OllamaChat.vue';
import LeftMenu from '@/components/menu/left/LeftMenu.vue';
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  padding: 20px;
  transition: margin-left 0.3s ease;
}

.side-menu--collapsed + .main-content {
  margin-left: 60px;
}
</style>


