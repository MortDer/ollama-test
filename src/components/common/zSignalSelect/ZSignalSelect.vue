<template>
  <div class="z-signal-select">
    <z-row :cell-count="1">
      <z-cell>
        <z-button
          is-shy
          text="Выбрать сигнал"
          @click.prevent="signalListModalIsOpen = true"
        />
      </z-cell>
      <z-cell>
        <q-input
          :model-value="modelValue.sigName"
          v-bind="zInputProps"
          disable
          placeholder="Идентификатор"
        />
      </z-cell>
    </z-row>
  </div>

  <SignalsListModal
    key="1"
    v-model="signalListModalIsOpen"
    :esr="esr"
    :type-ob="typeOb"
    :state="state"
    :rows="filteredRows"
    :signal="signal"
    :select-first="selectFirst"
    @update:signal="handleSelect"
    @open-all-signals-modal="openAllSignalsModal"
  />

  <SignalsListModal
    key="2"
    v-model="allSignalListModalIsOpen"
    :esr="esr"
    :type-ob="typeOb"
    :state="state"
    :rows="allRows"
    :signal="signal"
    :select-first="selectFirst"
    show-all
    @update:signal="handleSelect"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { StateArrow, StationElementType } from "@/components/station/types";

import SignalsListModal from "@/components/station/stationEntities/atoms/SignalsListModal.vue";
import useRequest from "@/compositions/useRequest";
import { SchemeSignalDirectory } from "@/api/data-contracts";
import { createTabloDkInstance } from "@/api";
import { All } from "@/apiTabloDk/All";
import { messages } from "@/components/station/stationEntities/atoms/locale/SignalsSelectLocale";
import { useI18n } from "vue-i18n";
import ZRow from "@/components/redisign/common/zGrid/ZRow.vue";
import ZCell from "@/components/redisign/common/zGrid/ZCell.vue";
import { zInputProps } from "../../defaultProps";
import ZButton from "../zButton/ZButton.vue";

const allApi = createTabloDkInstance(All);

const props = defineProps<{
  modelValue: SchemeSignalDirectory;
  esr: string;
  signal?: SchemeSignalDirectory;
  typeOb: StationElementType;
  state?: StateArrow;
  selectFirst?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:model-value", value: SchemeSignalDirectory): void;
}>();

const { t } = useI18n({
  messages,
});
const signalListModalIsOpen = ref(false);
const allSignalListModalIsOpen = ref(false);
const rows = ref<SchemeSignalDirectory[]>([]);

const allRows = ref<SchemeSignalDirectory[]>([]);

const filteredRows = computed(() => {
  return props.typeOb === StationElementType.Bu
    ? rows.value.filter((row) => row.presence === "нет")
    : rows.value;
});

const getAllSignalsList = async (payload: {
  esrst: number;
  typeOb?: StationElementType;
  state?: StateArrow;
}) => {
  let val: SchemeSignalDirectory[] = [];

  await useRequest({
    request: async () => {
      const { data } = await allApi.getAllSignalNameListOnStation(payload);

      return data.data;
    },
    successCallback: (value) => {
      val = value || [];
    },
  }).sendRequest();

  return val;
};

const openAllSignalsModal = async () => {
  const { esr } = props;

  const payload = {
    esrst: Number(esr),
  };

  allRows.value = await getAllSignalsList(payload);
  allSignalListModalIsOpen.value = true;
};

const handleSelect = (value: SchemeSignalDirectory) => {
  signalListModalIsOpen.value = false;
  allSignalListModalIsOpen.value = false;
  emit("update:model-value", value);
};

onMounted(async () => {
  const { esr, typeOb, state } = props;
  const payload = {
    esrst: Number(esr),
    typeOb,
    state: state || undefined,
  };

  rows.value = await getAllSignalsList(payload);
});
</script>

<style lang="scss" scoped></style>
