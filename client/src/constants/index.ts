
export const BASE_URL = 'http://localhost:7171'

export const CHAT_AUTH_TOKEN_NAME = 'chat-auth-token'
export const localStorageToken = () => localStorage.getItem(CHAT_AUTH_TOKEN_NAME) || ''