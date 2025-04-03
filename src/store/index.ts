import {ref} from "vue";

interface IResponseFeedMsg {
    role: 'user' | 'assistant',
    content: string,
}

export interface IResponseFeed {
    model: string,
    title: string,
    messages: IResponseFeedMsg[],
}

export const chartsMap = ref(new Map<string, IResponseFeed>());
export const currentKey = ref('');

export function setChartsMap(key: string, model: string, messages: IResponseFeedMsg[], title?: string) {
    chartsMap.value.set(key, {
        model,
        title: title || 'Новый чат',
        messages,
    });
}

export function getChartsMap(key: string) {
    return chartsMap.value.get(key);
}

export function deleteChartsMap(key: string) {
    chartsMap.value.delete(key);
}

export function clearChartsMap() {
    chartsMap.value.clear();
}

export function getCurrentKey() {
    return currentKey.value;
}

export function setCurrentKey(value: string) {
    currentKey.value = value;
}








