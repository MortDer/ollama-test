<template>
  <div
    v-if="uploadStatus === UploadStatus.OnGoing"
    class="column flex flex-center z-uploader-progress"
  >
    <q-spinner-ios
      class="z-uploader-progress__spinner"
      color="light-blue"
      size="4em"
    />
    <div class="z-uploader-progress__loading">
      {{ t("statuses.loading") }}
    </div>
  </div>

  <div
    v-if="uploadStatus === UploadStatus.Success"
    class="column flex flex-center"
  >
    <div class="z-uploader-progress__loaded">
      {{ t("statuses.loaded") }}
    </div>
    <z-button v-close-popup="true" color="blue" text="Закрыть" />

    <!-- <q-btn
      v-close-popup="true"
      no-caps
      outline
      label="Закрыть"
    /> -->
  </div>

  <div v-if="uploadStatus === UploadStatus.Error" class="flex flex-center">
    {{ t("statuses.error") }}
    <div v-if="errorText" class="q-pa-md">
      {{ errorText }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UploadStatus } from "@/components/station/menu/nsi/utils/enums";
import { messages } from "@/components/station/menu/nsi/common/locale/UploadProgressLocale";
import { useI18n } from "vue-i18n";
import ZButton from "../zButton/ZButton.vue";

const props = defineProps<{
  uploadStatus: UploadStatus;
  errorText?: string;
}>();

const { t } = useI18n({
  messages,
});
</script>
<style lang="scss" scoped>
.z-uploader-progress {
  &__spinner {
    margin-top: calc(4 * var(--z-layout-gutter-md));
  }

  &__loading {
    margin-top: calc(var(--z-layout-gutter-md) + var(--z-layout-gutter-md));
    font-size: var(--z-font-size);
  }

  &__loaded {
    margin-top: calc(5 * var(--z-layout-gutter-md));
    margin-bottom: calc(var(--z-layout-gutter-md) + var(--z-layout-gutter-md));
  }
}
</style>
