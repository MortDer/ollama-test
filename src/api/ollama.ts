import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:11434/api',
})

interface GenerateRequest {
    model: string
    prompt: string
    stream?: boolean
}

interface ModelInfo {
    name: string
    modified_at: string
    size: number
}

export const generateText = async (params: GenerateRequest) => {
    const response = await api.post('/generate', params)
    return response.data
}

export const generateChat = async (params: GenerateRequest) => {
    const response = await api.post('/generate', params)
    return response.data
}

export const listModels = async (): Promise<{ models: ModelInfo[] }> => {
    const response = await api.get('/tags')
    return response.data
}
