import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:11434/api',
})

interface IGenerateRequest {
    model: string
    prompt: string
    stream?: boolean
}

interface IChatMsg {
    role: 'system' | 'user' | 'assistant'
    content: string
}

interface IGenerateChatRequest {
    model: string
    messages: IChatMsg[]
    stream?: boolean
}

interface IModelInfo {
    name: string
    modified_at: string
    size: number
}

export const generateText = async (params: IGenerateRequest) => {
    const response = await api.post('/generate', params)
    return response.data
}

export const generateChat = async (params: IGenerateChatRequest) => {
    const response = await api.post('/chat', params)
    return response.data
}

export const listModels = async (): Promise<{ models: IModelInfo[] }> => {
    const response = await api.get('/tags')
    return response.data
}
