<template>
  <div class="ollama-chat">
    <h1>Ollama Chat</h1>

    <q-select
        v-model="selectedModel"
        v-bind="zSelectProps"
        emit-value
        map-options
        :options="models"
        option-label="name"
        option-value="name"
    ></q-select>

    <div class="model-selector">
      <label for="model">Model:</label>
      <select id="model" v-model="selectedModel">
        <option
            v-for="model in models"
            :key="model.name"
            :value="model.name"
        >
          {{ model.name }} ({{ (model.size / 1024 / 1024).toFixed(1) }}MB)
        </option>
      </select>
    </div>

    <div class="prompt-area">
      <textarea
          v-model="prompt"
          placeholder="Введите свой запрос"
          rows="2"
      ></textarea>
    </div>

    <div class="file-upload">
      <input
          type="file"
          @change="handleFileUpload"
          accept=".txt,.md,.pdf,.docx"
      />
      <p v-if="selectedFile">
        Selected file: {{ selectedFile.name }} ({{ (selectedFile.size / 1024).toFixed(1) }}KB)
      </p>
    </div>

    <button
        @click="generate"
        :disabled="isLoading || !selectedModel"
    >
      {{ isLoading ? 'Обработка запроса...' : 'Отправить' }}
    </button>

    <button
        @click="startNewChat"
    >
      Новый чат
    </button>

    <div class="response" v-if="response">
      <h3>Response:</h3>
      <pre>{{ response }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {generateChat, listModels} from '../api/ollama'
import {v4 as uuidv4} from 'uuid';
import {zSelectProps} from '@/components/common/defaultProps.ts';
import {chartsMap, setChartsMap, getCurrentKey, setCurrentKey} from "@/store";

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



const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    selectedFile.value = input.files[0]
    readFileContent()
  }
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
  const ck = getCurrentKey();
  console.log('ck', ck);

  if (chartsMap.value.get(ck)?.messages.length === 0) {
    chartsMap.value.set(ck, {
      model: selectedModel,
      title: prompt.value,
      messages: [
        {
          role: 'user',
          content: prompt.value,
        }
      ],
    })
  } else {
    chartsMap.value.get(ck)?.messages.push({
      role: 'user',
      content: prompt.value
    })
  }

  if (!selectedModel.value || (!prompt.value && !fileContent.value)) return

  isLoading.value = true
  try {
    const fullPrompt = fileContent.value
        ? `${prompt.value}\n\nFile content:\n${fileContent.value}`
        : prompt.value

    const result = await generateChat({
      model: selectedModel.value,
      prompt: fullPrompt,
      stream: false,
    })

    response.value = result.response
    chartsMap.value.get(ck)?.messages.push({
      role: 'assistant',
      content: response.value
    })
  } catch (error) {
    console.error('Ошибка генерации:', error)
    response.value = 'Произошла ошибка при генерации ответа'
  } finally {
    isLoading.value = false
    selectedFile.value = null;
  }
}

function startNewChat() {
  const id = uuidv4();
  setCurrentKey(id);
  setChartsMap(id, selectedModel.value, [])
}

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
</script>

<style scoped>
.ollama-chat {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.model-selector, .prompt-area, .file-upload {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

textarea {
  width: 100%;
  padding: 0.5rem;
  font-family: inherit;
}

button {
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.response {
  margin-top: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
  color: black;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
