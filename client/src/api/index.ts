import axios from 'axios'
import { BASE_URL, localStorageToken } from '../constants'
import { Conversation, LoginRequest, Message, User, UserRequest } from '../types'


const api = axios.create({
  baseURL: BASE_URL,
})


//-----------------------------------------------------------------------------
// AUTH ENDPOINTS
//-----------------------------------------------------------------------------

export const signUpAPI = async (user: UserRequest): Promise<User> => {
  const response = await api.post('/auth/signup', user)
  return response.data
}

export const signInAPI = async (user: LoginRequest): Promise<User> => {
  const response = await api.post('/auth/login', user)
  return response.data
}

export const meAPI = async (): Promise<User> => {
  const response = await api.get('/auth/me', {
    headers: {
      Authorization: localStorageToken(),
    },
  })
  return response.data
//-----------------------------------------------------------------------------
}

//-----------------------------------------------------------------------------
// USER ENDPOINTS
//-----------------------------------------------------------------------------

export const getUserFriendsAPI = async (): Promise<User[]> => {
  const response = await api.get('/user/friends', {
    headers: {
      Authorization: localStorageToken(),
    },
  })
  return response.data
}

export const getUserConversationsAPI = async (): Promise<Conversation[]> => {
  const response = await api.get('/user/conversations', {
    headers: {
      Authorization: localStorageToken(),
    },
  })
  return response.data
}


//-----------------------------------------------------------------------------
// CONVERSATION ENDPOINTS
//-----------------------------------------------------------------------------

export const createConversationAPI = async (conversation:{ name?:string, users: string[]}): Promise<Conversation> => {
  const response = await api.post('/conversation', conversation,{
    headers: {
      Authorization: localStorageToken(),
    },
  })
  return response.data
}

export const sendMessageAPI = async ({id, body}:{ id:number, body: string}): Promise<Message> => {
  const response = await api.post(`/conversation/${id}/message`, {body},{
    headers: {
      Authorization: localStorageToken(),
    },
  })
  return response.data
}

export const getConversationByIdAPI = async (id:number): Promise<Conversation> => {
  const response = await api.get(`/conversation/${id}`, {
    headers: {
      Authorization: localStorageToken(),
    },
  })
  return response.data
}