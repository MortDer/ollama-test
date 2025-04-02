<template>
  <fieldset class="z-date-time-picker fieldset">
    <div :class="[{ 'disabled-text': !enabled }, 'z-date-time-picker__container']">
      <div class="z-date-time-picker__date">
        <!--        <label class="z-date-time-picker__label">-->
        <!--          <strong>Период:</strong>-->
        <!--        </label>-->
        <div class="z-date-time-picker__item">
          <div class="z-date-time-picker-item">
            <!--            <label class="z-date-time-picker-item__label q-pr-sm">С</label>-->
            <div class="z-date-time-picker__list">
              <div class="z-date-time-picker-list">
                <q-input
                  v-model="startDateFormatted"
                  dense
                  outlined
                  square
                  type="date"
                  dark
                  :disable="dateRadio !== DateRadioOptions.OtherPeriod || !enabled"
                  :class="['non-selectable', { otherPeriod: isOtherPeriod }, 'z-date-time-picker-list__item']"
                  @update:model-value="setDates"
                />
                <q-input
                  v-model="startTime"
                  dense
                  outlined
                  square
                  type="time"
                  dark
                  :disable="dateRadio !== DateRadioOptions.OtherPeriod || !enabled"
                  :class="['non-selectable', { otherPeriod: isOtherPeriod }, 'z-date-time-picker-list__item z-date-time-picker-list__item--small']"
                  @update:model-value="setDates"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="z-date-time-picker__item">
          <div class="z-date-time-picker-item">
            <!--            <label class="z-date-time-picker-item__label q-pr-sm">По</label>-->
            <div class="z-date-time-picker__list">
              <div class="z-date-time-picker-list">
                <q-input
                  v-model="endDateFormatted"
                  dense
                  outlined
                  square
                  type="date"
                  dark
                  :disable="dateRadio !== DateRadioOptions.OtherPeriod || !enabled"
                  :class="['non-selectable', { otherPeriod: isOtherPeriod }, 'z-date-time-picker-list__item']"
                  @update:model-value="setDates"
                />
                <q-input
                  v-model="endTime"
                  dense
                  outlined
                  square
                  type="time"
                  dark
                  :disable="dateRadio !== DateRadioOptions.OtherPeriod || !enabled"
                  :class="['non-selectable', { otherPeriod: isOtherPeriod }, 'z-date-time-picker-list__item z-date-time-picker-list__item--small']"
                  @update:model-value="setDates"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="z-date-time-picker__period q-mt-md">
        <div class="z-date-time-picker__radio-list">
          <div class="z-date-time-picker-radio-list">
            <div class="z-date-time-picker-radio-list__item">
              <q-radio
                v-model="dateRadio"
                dense
                class="col non-selectable"
                :val="DateRadioOptions.ExpiredFull"
                :label="dateRangeLabels[DateRadioOptions.ExpiredFull]"
                :size="radioSize"
                :disable="!enabled"
                color="white"
              />
            </div>
            <div class="z-date-time-picker-radio-list__item">
              <q-radio
                v-model="dateRadio"
                dense
                class="col non-selectable"
                :val="DateRadioOptions.CurrentFull"
                :label="dateRangeLabels[DateRadioOptions.CurrentFull]"
                :size="radioSize"
                :disable="!enabled"
              />
            </div>
          </div>
          <div class="z-date-time-picker-radio-list">
            <div class="z-date-time-picker-radio-list__item">
              <q-radio
                v-model="dateRadio"
                dense
                class="col non-selectable"
                :val="DateRadioOptions.ExpiredFirstHalf"
                :label="dateRangeLabels[DateRadioOptions.ExpiredFirstHalf]"
                :size="radioSize"
                :disable="!enabled"
              />
            </div>
            <div class="z-date-time-picker-radio-list__item">
              <q-radio
                v-model="dateRadio"
                dense
                class="col non-selectable"
                :val="DateRadioOptions.ExpiredSecondHalf"
                :label="dateRangeLabels[DateRadioOptions.ExpiredSecondHalf]"
                :size="radioSize"
                :disable="!enabled"
              />
            </div>
          </div>
          <div class="z-date-time-picker-radio-list">
            <div class="z-date-time-picker-radio-list__item">
              <q-radio
                v-model="dateRadio"
                dense
                class="col non-selectable"
                :val="DateRadioOptions.CurrentFirstHalf"
                :label="dateRangeLabels[DateRadioOptions.CurrentFirstHalf]"
                :size="radioSize"
                :disable="!enabled"
              />
            </div>
            <div class="z-date-time-picker-radio-list__item">
              <q-radio
                v-model="dateRadio"
                dense
                class="col non-selectable"
                :val="DateRadioOptions.CurrentSecondHalf"
                :label="dateRangeLabels[DateRadioOptions.CurrentSecondHalf]"
                :size="radioSize"
                :disable="!enabled"
              />
            </div>
          </div>
          <div class="z-date-time-picker-radio-list">
            <div class="z-date-time-picker-radio-list__item">
              <q-radio
                v-model="dateRadio"
                dense
                class="col non-selectable"
                :val="DateRadioOptions.OtherPeriod"
                :label="dateRangeLabels[DateRadioOptions.OtherPeriod]"
                :size="radioSize"
                :disable="!enabled"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import {
    computed, onMounted, ref, watch,
} from 'vue';
import { useFormatters } from '@/compositions/useFormatters';
import { DateRadioOptions } from '@/types/gidOptions';
import { dateRangeLabels } from '@/components/common/baseTableComponent';

import { messages } from '@/components/common/locale/DateTimePickerLocale';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({
    messages,
});

const props = withDefaults(defineProps<{
    startDate: string,
    endDate: string,
    period?: DateRadioOptions,
    currentDate: Date,
    onGoingTrains?: boolean,
    allSchedule?: boolean,
    enabled?: boolean,
    unlimited?: boolean,
    radioPaddingLeft?: number | null
    isFieldset?: boolean,
    radioSize?: string,
    defaultStartDate?: Date;
    defaultEndDate?: Date;
}>(), {
    onGoingTrains: false,
    allSchedule: false,
    period: DateRadioOptions.ExpiredFull,
    enabled: true,
    unlimited: false,
    radioPaddingLeft: null,
    isFieldset: false,
    radioSize: 'xs',
});

const emit = defineEmits<{
    (e: 'update:start-date', value: string): void;
    (e: 'update:end-date', value: string): void;
    (e: 'update:period', value: DateRadioOptions): void;
}>();

const {
    formatDate,
    formatDateToIso,
} = useFormatters();
const dateRadio = ref<DateRadioOptions>(props.period ? props.period : DateRadioOptions.ExpiredFull);

const startDate = ref<Date>(new Date(props.currentDate));
const startTime = ref('18:01');
const startDateFormatted = ref('');

const endDate = ref<Date>(new Date(props.currentDate));
const endTime = ref('18:00');
const endDateFormatted = ref('');

const ongoingDateFormatted = ref('');
const ongoingTime = ref('00:00');

const radioPaddingLeftComputed = computed(() => (props.radioPaddingLeft ? props.radioPaddingLeft : 4));
const isOtherPeriod = computed(() => dateRadio.value === DateRadioOptions.OtherPeriod);

watch(() => props.period, (value) => {
    if (value && value !== dateRadio.value) {
        dateRadio.value = value;
        emit('update:period', value);
    }
});

watch(dateRadio, (value) => {
    startDate.value = new Date(props.currentDate);
    endDate.value = new Date(props.currentDate);
    const currentDate = new Date(props.currentDate);

    switch (value) {
        case DateRadioOptions.ExpiredFull:
            startDate.value.setDate(currentDate.getDate() - 2);
            startTime.value = '18:01';
            endDate.value.setDate(currentDate.getDate() - 1);
            endTime.value = '18:00';
            break;
        case DateRadioOptions.ExpiredFirstHalf:
            startDate.value.setDate(currentDate.getDate() - 2);
            startTime.value = '18:01';
            endDate.value.setDate(currentDate.getDate() - 1);
            endTime.value = '06:00';
            break;
        case DateRadioOptions.ExpiredSecondHalf:
            startDate.value.setDate(currentDate.getDate() - 1);
            startTime.value = '06:01';
            endDate.value.setDate(currentDate.getDate() - 1);
            endTime.value = '18:00';
            break;
        case DateRadioOptions.CurrentFull:
            startDate.value.setDate(currentDate.getDate() - 1);
            startTime.value = '18:01';
            endDate.value = currentDate;
            endTime.value = '18:00';
            break;
        case DateRadioOptions.CurrentFirstHalf:
            startDate.value.setDate(currentDate.getDate() - 1);
            startTime.value = '18:01';
            endDate.value = currentDate;
            endTime.value = '06:00';
            break;
        case DateRadioOptions.OtherPeriod:
            if ((props.allSchedule || props.unlimited) && (!props.startDate || !props.endDate)) {
                startTime.value = '';
                endTime.value = '';
            } else if (props.startDate && props.endDate) {
                startDate.value = new Date(props.startDate);
                endDate.value = new Date(props.endDate);
                startTime.value = formatDate(props.startDate, 'HH:mm');
                endTime.value = formatDate(props.endDate, 'HH:mm');
            }
            break;
        case DateRadioOptions.CurrentSecondHalf:
            startDate.value = currentDate;
            startTime.value = '06:01';
            endDate.value = currentDate;
            endTime.value = '18:00';
            break;
        case DateRadioOptions.AllSchedule:
            startTime.value = '';
            endTime.value = '';
            break;
        case DateRadioOptions.OngoingTrains:
            startDate.value = currentDate;
            startTime.value = '18:01';
            endTime.value = '18:00';
            ongoingDateFormatted.value = formatDate(startDate.value, 'YYYY-MM-DD');
            ongoingTime.value = startTime.value;
            endDate.value.setDate(currentDate.getDate() + 1);
            break;
        default:
            break;
    }

    formatDatesForInput();
    setDates();
}, { immediate: true });

function formatDatesForInput() {
    startDateFormatted.value = startTime.value ? formatDate(startDate.value, 'YYYY-MM-DD') : '';
    endDateFormatted.value = endTime.value ? formatDate(endDate.value, 'YYYY-MM-DD') : '';
}

function setDates() {
    const startDateExport = `${startDateFormatted.value} ${startTime.value}`;
    const endDateExport = `${endDateFormatted.value} ${endTime.value}`;

    emit('update:start-date', startDateFormatted.value && startTime.value ? formatDateToIso(dayjs(startDateExport)
        .toDate()) : '');
    emit('update:end-date', endDateFormatted.value && endTime.value ? formatDateToIso(dayjs(endDateExport)
        .toDate()) : '');
    emit('update:period', dateRadio.value);
}

function setOnGoingDates() {
    const nextEndDay = new Date(ongoingDateFormatted.value);

    nextEndDay.setDate(nextEndDay.getDate() + 1);

    const startDateExport = `${ongoingDateFormatted.value} ${ongoingTime.value}`;
    const endDateExport = `${formatDate(new Date(nextEndDay), 'YYYY-MM-DD')} ${ongoingTime.value}`;

    emit('update:start-date', startTime.value ? formatDateToIso(dayjs(startDateExport)
        .toDate()) : '');
    emit('update:end-date', endTime.value ? formatDateToIso(dayjs(endDateExport)
        .toDate()) : '');
    emit('update:period', dateRadio.value);
}

onMounted(() => {
    if (props.defaultStartDate) {
        startDate.value = props.defaultStartDate;
        startTime.value = formatDate(props.defaultStartDate, 'HH:mm');
    }

    if (props.defaultEndDate) {
        endDate.value = props.defaultEndDate;
        endTime.value = formatDate(props.defaultEndDate, 'HH:mm');
    }

    formatDatesForInput();

    if (props.defaultStartDate || props.defaultEndDate) {
        setDates();
    }
});
</script>

<style scoped lang="scss">
body.body .reset-library-styles .z-date-time-picker.z-date-time-picker {
  &,
  *,
  &:deep(*) {
    --z-font-family: var(--z-font-family-text);
    font-size: var(--z-font-size-input);
  }
}

.z-date-time-picker {
  :deep(.q-radio) {
    .q-radio__inner {
      color: var(--z-white);
    }

    .q-radio__inner--truthy,
    .q-radio__inner--indet {
      color: var(--z-accent-color) !important;
    }
  }

  &__label {
    display: block;
    margin-bottom: 4px;
  }

  &__item {
    & + & {
      margin-top: 8px;
    }
  }
}

.z-date-time-picker-item {
  display: flex;
  gap: 8px;
  align-items: center;

  &__label {
    width: 18px;
    font-size: 12px;
  }
}

.z-date-time-picker-list {
  display: flex;
  gap: 4px;

  &__item {
    width: 120px;

    &--small {
      width: 90px;
    }

    :deep(input) {
      color-scheme: dark;
      font-size: 12px;
      color: $gid-white;
    }
  }

  :deep(.q-field--dense .q-field__control) {
    height: 28px;
    padding: 0 4px;
  }
}

.z-date-time-picker-radio-list {
  display: flex;
  gap: 0 12px;
  flex-wrap: wrap;
}
</style>
