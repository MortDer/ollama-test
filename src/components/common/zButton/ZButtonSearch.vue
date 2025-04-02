<template>
  <div class="z-button-search-container">
    <z-button
      icon-position="left"
      is-shy
    >
      <template #icon>
        <z-close-icon
          v-if="searchQuery"
          style="color: var(--z-fourth-text-color)"
          @click="searchQuery = ''"
        />
        <z-search-icon
          v-else
          style="color: var(--z-fourth-text-color)"
        />
      </template>

      <q-input
        v-model="searchQuery"
        outlined
        dense
        color="white"
        :placeholder="placeholder"
        class="z-button-search"
        dark
        debounce="debounceTime"
        @click.prevent
      />
    </z-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ZSearchIcon from '@/components/redisign/zIconList/ZSearchIcon.vue';
import ZButton from '@/components/redisign/common/zButton/ZButton.vue';
import ZCloseIcon from '@/components/redisign/zIconList/ZCloseIcon.vue';

const props = withDefaults(defineProps<{
    modelValue: string;
    placeholder?: string;
    debounceTime?: number;
    bordered?: boolean;
}>(), {
    placeholder: 'Найти форму...',
    debounceTime: 300,
    bordered: false,
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const searchQuery = ref(props.modelValue);

watch(searchQuery, (newValue) => {
    emit('update:modelValue', newValue.trim());
});
</script>

<style lang="scss" scoped>
.z-button-search-container {
  padding-top: var(--z-layout-gutter-xs);
}
</style>
