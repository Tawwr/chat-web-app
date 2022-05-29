

//-----------------------------------------------------------------------------
// STATE TYPES
//-----------------------------------------------------------------------------

export type AppStateType = {
  token: string
  user: User | null
  conversationView: 'chat' | 'messages'
}

export type ConversationStateType = {
  conversations: Conversation[]
  selectedConversation: Conversation | null
}

//-----------------------------------------------------------------------------
// ENTITY TYPES
//-----------------------------------------------------------------------------

export interface BaseEntity {
  id: number
  createdAt: Date
  updatedAt: Date
}

export interface User extends BaseEntity {
  username: string
  email: string
  firstName: string
  lastName: string
  password: string

  token?: string
  conversations?: Conversation[]
  messages?: Message[]
}

export interface Conversation extends BaseEntity {
  name: string
  users: User[]
  messages: Message[]
}

export interface Message extends BaseEntity {
  body: string
  sender: User
  conversation: Conversation
}

//-----------------------------------------------------------------------------
// API REQUEST TYPES
//-----------------------------------------------------------------------------

export interface UserRequest {
  username: string
  email: string
  firstName: string
  lastName: string
  password: string
}

export type LoginRequest = {
  email: string
  password: string
}




//-----------------------------------------------------------------------------
// MISC TYPES
//-----------------------------------------------------------------------------
export type ConversationViewType = 'chat' | 'messages'