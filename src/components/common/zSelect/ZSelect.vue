<template>
  <q-select
    :model-value="modelValue"
    :options="opts"
    :option-label="optionLabel"
    v-bind="attrs"
    class="z-select"
    @filter="filterFn"
    @update:model-value="emit('update:model-value', $event)"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-italic text-grey">
          {{ computedNoOptionsText }}
        </q-item-section>
      </q-item>
    </template>
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";
import { QSelect } from "quasar";
import { messages } from "@/components/common/locale/SelectLocale";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
  messages,
});

// todo По необходимости добавить возможность принятия uri и делать по нему запрос на опции

const attrs = useAttrs();

const props = withDefaults(
  defineProps<{
    modelValue: any;
    options?: any[]; // Опции, переданные напрямую (опционально)
    optionsList?: any | null | undefined; // Объект с набором опций (опционально)
    optionsKey?: string | null | undefined; // Ключ для optionsList (опционально)
    noOptionsText?: string;
    optionLabel?: string | undefined;
  }>(),
  {
    options: () => [],
    optionsList: null,
    optionsKey: null,
    optionLabel: "",
  },
);
const computedNoOptionsText = computed(
  () => props.noOptionsText || t("noData.label"),
);
const emit = defineEmits<{
  (e: "update:model-value", value: any): void;
}>();

const getOptions = (optionsList: any, key: any, options: any[]) => {
  if (key) {
    return optionsList[key] || [];
  }
  return options;
};

const opts = ref(
  getOptions(props.optionsList, props.optionsKey, props.options),
);

function filterFn(
  val: string,
  update: (
    callbackFn: () => void,
    afterFn?: ((ref: QSelect) => void) | undefined,
  ) => void,
) {
  update(() => {
    const needle = val.toString().toLowerCase();
    const options =
      getOptions(props.optionsList, props.optionsKey, props.options) || [];

    opts.value = options.filter((v: any) => {
      // поиск по лейблу, если он присутствует (для опций-объектов)
      const optionsValue = props.optionLabel ? v[props.optionLabel] : v;

      return optionsValue.toString().toLowerCase().indexOf(needle) > -1;
    });
  });
}
</script>
