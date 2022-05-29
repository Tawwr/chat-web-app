import { createSlice } from '@reduxjs/toolkit'
import { localStorageToken } from '../../constants'
import { AppStateType, ConversationViewType, User } from '../../types'

const initialState: AppStateType = {
  user: null,
  token: localStorageToken(),
  conversationView: 'messages'
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToken(state, { payload }: { payload: string }) {
      state.token = payload
    },
    setUser: (state, { payload }: { payload: User }) => {
      state.user = payload
    },
    signOut: (state) => {
      state.user = null
      state.token = ''
    },
    setConversationView: (state, { payload }: { payload: ConversationViewType }) => { 
      state.conversationView = payload
    }
  },
})

export const { setUser, signOut, setToken,setConversationView } = appSlice.actions

export default appSlice.reducer
