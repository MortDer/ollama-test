<template>
  <div class="ollama-chat">
    <div class="ollama-chat__header">
      <h1>Ollama Chat</h1>
      <div class="ollama-chat__model">
        <z-label-container text="Выберите модель">
          <q-select
              v-model="selectedModel"
              v-bind="zSelectProps"
              :options="models"
              map-options
              emit-value
              option-value="name"
              :option-label="(opt: Model) => `${opt.name} (${(opt.size / 1024 / 1024).toFixed(1)}MB)`"
              class="q-mb-md"
          />
        </z-label-container>
      </div>
    </div>
    <z-label-container
        text="Ответы"
        class="ollama-chat__history"
        v-if="chartsMapToShow?.messages.length"
        background-class="z-3d-main-color-theme"
    >
      <template
          v-for="(message, index) in chartsMapToShow.messages"
          :key="index"
      >
        <div
            v-if="message.role !== 'system'"
            class="ollama-chat__history-item"
        >
          <div
              class="ollama-chat__history-message z-main-color-theme"
              :class="[`ollama-chat__history-message--${message.role}`]"
          >
            <pre v-html="formatResponse(message.content)"></pre>
          </div>
        </div>
      </template>
    </z-label-container>
    <div class="ollama-chat__body">
      <div class="ollama-chat__prompt">
        <z-label-container text="Введите свой запрос">
          <q-input
              v-model="prompt"
              v-bind="zInputProps"
              type="textarea"
              autogrow
              @input="adjustTextareaHeight"
              ref="textareaRef"
              class="ollama-chat__textarea"
          >
          </q-input>
        </z-label-container>
      </div>
      <div class="ollama-chat__file">
        <z-label-container text="Загрузить файл">
          <q-file
              :model-value="selectedFile"
              v-bind="zInputProps"
              stack-label
              clearable
              accept=".txt,.md,.pdf,.docx"
              @update:model-value="handleFileUpload"
          />
          <p v-if="selectedFile">
            Загружен файл: {{ selectedFile.name }} (Размер: {{ (selectedFile.size / 1024).toFixed(1) }}KB)
          </p>
        </z-label-container>
      </div>
      <div class="ollama-chat__actions">
        <z-button-list-container>
          <z-button-direction
              :text="isLoading ? 'Обработка запроса...' : 'Отправить'"
              :disabled="isLoading || !selectedModel"
              @click="generate"
          />
          <z-button-direction
              text="Новый чат"
              is-shy
              color="purple"
              @click="startNewChat"
          />
        </z-button-list-container>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import {generateChat, type IChatResponse, listModels} from '@/api/ollama'
import {v4 as uuidv4} from 'uuid';
import {zInputProps, zSelectProps} from '@/components/common/defaultProps';
import {chartsMap, getChartsMap, getCurrentKey, type IResponseFeed, setChartsMap, setCurrentKey} from "@/store";
import ZLabelContainer from "@/components/common/zLabel/ZLabelContainer.vue";
import ZButtonListContainer from "@/components/common/zButton/ZButtonListContainer.vue";
import ZButtonDirection from "@/components/common/zButton/ZButtonDirection.vue";

interface Model {
  name: string
  size: number
}

const models = ref<Model[]>([])
const selectedModel = ref<string>('')
const prompt = ref<string>('')
const response = ref<string>('')
const isLoading = ref<boolean>(false)
const selectedFile = ref<File | null>(null)
const fileContent = ref<string>('')
const textareaRef = ref<HTMLElement | null>(null)
const chartsMapToShow = ref<IResponseFeed | undefined>()

const adjustTextareaHeight = () => {
  if (textareaRef.value) {
    const textarea = textareaRef.value.querySelector('textarea')
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }
}

const handleFileUpload = (event: File) => {
    selectedFile.value = event
    readFileContent()
}

// Чтение содержимого файла
const readFileContent = () => {
  if (!selectedFile.value) return

  const reader = new FileReader()
  reader.onload = (e) => {
    fileContent.value = e.target?.result as string
  }
  reader.readAsText(selectedFile.value)
}

const generate = async () => {
  if (!selectedModel.value || (!prompt.value && !fileContent.value)) return

  isLoading.value = true
  try {
    const ck = getCurrentKey();
    console.log('ck', ck);

    const fullPrompt = fileContent.value
        ? `${prompt.value}\n\nFile content:\n${fileContent.value}`
        : prompt.value

    if (chartsMap.value.get(ck)?.messages.length === 0) {
      chartsMap.value.set(ck, {
        model: selectedModel.value,
        title: prompt.value,
        messages: [
          {
            role: 'system',
            content: fullPrompt,
          }
        ],
      })

      chartsMap.value.get(ck)
          ?.messages
          .push({
            role: 'user',
            content: fullPrompt
          })
    } else {
      chartsMap.value.get(ck)
          ?.messages
          .push({
            role: 'user',
            content: fullPrompt
          })
    }

    const result = await generateChat({
      model: selectedModel.value,
      messages: chartsMap.value.get(ck)?.messages || [],
      stream: false,
    }) as IChatResponse

    response.value = result.message.content

    chartsMap.value.get(ck)
        ?.messages
        .push({
          role: 'assistant',
          content: response.value
        })

    chartsMapToShow.value = getChartsMap(ck)

    prompt.value = '';
    selectedFile.value = null
    fileContent.value = ''
  } catch (error) {
    console.error('Ошибка генерации:', error)
    response.value = 'Произошла ошибка при генерации ответа'

    const ck = getCurrentKey();
    const messages = chartsMap.value.get(ck)?.messages
    
    if (messages && messages.length > 0) {
      messages.pop()
    }
  } finally {
    isLoading.value = false
  }
}

function startNewChat() {
  const id = uuidv4();

  setCurrentKey(id);
  setChartsMap(id, selectedModel.value, [])

  response.value = '';
  prompt.value = '';
  selectedFile.value = null;
  fileContent.value = '';

  chartsMapToShow.value = getChartsMap(id)
}

const formatResponse = (text: string) => {
  return text
      .replace(/File content:[\s\S]*$/, '')
      .replace(/\n/g, '<br/>')
      .replace(/<br\/>\s*<br\/>/g, '<br/>')
      .replace(/^<br\/>/g, '')
      .replace(/<br\/>$/g, '')
      .replace(/<think>\n/g, '<think>')
      .replace(/<\/think><br\/>/g, '</think>')
      .replace(
          /<think>([\s\S]*?)<\/think>/g,
          (_, content) => {
            const cleanContent = content.replace(/^<br\/>/, '');
            return `<span class="ollama-chat__think">${cleanContent}</span>`;
          }
      );
};

onMounted(async () => {
  try {
    const data = await listModels()
    models.value = data.models
    if (models.value.length > 0) {
      selectedModel.value = models.value[0].name
    }
  } catch (error) {
    console.error('Ошибка загрузки списка моделей', error)
  }

  startNewChat();
})

watch(getCurrentKey, (value, oldValue) => {
  if (value !== oldValue) {
    chartsMapToShow.value = getChartsMap(value)
  }
})
</script>

<style scoped lang="scss">
.ollama-chat {
  width: 100%;
  background-color: var(--main-layout-bg);
  color: var(--main-layout-color);

  &__header {
    margin-bottom: calc(2 * var(--z-layout-gutter-md));
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: var(--z-layout-gutter-md);
    position: sticky;
    bottom: 0;
    background-color: var(--main-layout-bg);
  }

  &__prompt {
    &:deep(.q-field__inner) {
      background-color: var(--inverse-textarea-bg);

      .q-field__control {
        height: 100%;
        border: none;

        textarea {
          max-height: calc(50vh - 4px);
        }
      }
    }
  }

  &__textarea {
    &:deep(.q-field__control) {
      max-height: 50vh;

      textarea {
        min-height: 50px !important;
      }
    }
  }

  &__file {
    &:deep(.q-field--outlined) {
      .q-field__control::after {
        height: 100%;
      }
    }
  }

  &__actions {
    margin-top: var(--z-layout-gutter-xs);
  }

  &__history {
    background-color: var(--main-layout-bg);
    color: var(--main-layout-color);
    margin-bottom: calc(2 * var(--z-layout-gutter-md));

    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }

  &__history-item {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__history-message {
    padding: var(--z-layout-gutter-sm);
    border-radius: 4px;

    &--user {
      background-color: var(--z-purple-h1);
      width: fit-content;
      margin-left: auto;
    }

    &--assistant {
      background-color: var(--main-layout-bg);
      max-width: 90%;
    }

    pre {
      margin: 0;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }

  &:deep(.ollama-chat__think) {
    display: block;
    background-color: var(--inverse-textarea-bg);
    padding: var(--z-layout-gutter-md);
    border-radius: var(--z-border-radius);
    margin: var(--z-layout-gutter-md) 0;
    font-style: italic;
    color: var(--z-fifth-text-color);
    font-size: var(--z-font-size-label);
    border-left: 1px solid var(--z-purple-h1);

    &:empty {
      display: none;
    }
  }
}
</style>
