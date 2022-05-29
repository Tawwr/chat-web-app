import { createSlice } from '@reduxjs/toolkit'
import { Conversation, ConversationStateType, Message } from '../../types'

//TODO: For each conversation add status (read or not)
// Sort conversations by date

const initialState: ConversationStateType = {
  conversations: [],
  selectedConversation: null,
}

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversations: (state, { payload }: { payload: Conversation[] }) => {
      state.conversations = payload
    },
    setSelectedConversation: (
      state,
      { payload }: { payload: Conversation }
    ) => {
      state.selectedConversation = payload
    },
    addConversation: (state, { payload }: { payload: Conversation }) => {
      state.conversations.push(payload)
    },
    addMessage: (state, { payload }: { payload: Message }) => {
      const conversation = state.conversations.find(
        (c) => c.id === payload.conversation.id
      )
      if (conversation) {
        conversation.messages.push(payload)

        const selectedConversation = state.selectedConversation
        if (
          selectedConversation &&
          selectedConversation.id === conversation.id
        ) {
          state.selectedConversation = conversation
        }
      } else {
        state.conversations.push(payload.conversation)
      }
    },
  },
})

export const {
  setConversations,
  setSelectedConversation,
  addConversation,
  addMessage,
} = conversationSlice.actions

export default conversationSlice.reducer
