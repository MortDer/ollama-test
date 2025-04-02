<template>
  <div class="z-button-search-container">
    <z-button
      icon-position="left"
      is-shy
      is-click-animate
      :is-active="searchOpenedComputed"
      @click="toggleSearchOpened"
    >
      <template #icon>
        <z-search-icon style="color: var(--z-fourth-text-color)" />
      </template>
      <div @click.stop>
        <q-input
          v-model="searchQuery"
          outlined
          dense
          color="white"
          :placeholder="placeholder"
          class="z-button-search"
          dark
          debounce="500"
          @click.prevent
        />
      </div>
    </z-button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import ZSearchIcon from '@/components/redisign/zIconList/ZSearchIcon.vue';
import ZButton from '@/components/redisign/common/zButton/ZButton.vue';

const props = withDefaults(defineProps<{
    modelValue: string;
    placeholder?: string;
    debounceTime?: number;
    bordered?: boolean;
    isActive: boolean;
}>(), {
    placeholder: 'Найти форму...',
    debounceTime: 300,
    bordered: false,
});

const emit = defineEmits<{
    (e: 'update:model-value', value: string): void;
    (e: 'update:is-active', value: boolean): void;
}>();

const searchQuery = ref(props.modelValue);

const searchOpenedComputed = computed({
    get() {
        return props.isActive;
    },
    set(value: boolean) {
        emit('update:is-active', value);
    },
});

const toggleSearchOpened = () => {
    searchOpenedComputed.value = !searchOpenedComputed.value;
};

watch(searchQuery, (newValue) => {
    emit('update:model-value', newValue);
});
</script>
