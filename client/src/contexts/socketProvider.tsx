import React, { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connect, Socket } from 'socket.io-client'
import { BASE_URL } from '../constants'
import { addMessage } from '../redux/reducers/conversation'
import { RootState } from '../redux/store'
import { Message } from '../types'

const SocketContext = createContext<Socket | null>(null)

export const useSocket = () => {
  const context = useContext(SocketContext)

  if (context === null) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

type SocketProviderProps = {
  children: React.ReactNode
}
function SocketProvider({ children }: SocketProviderProps) {
  const dispatch = useDispatch()
  const [socket, setSocket] = useState<Socket>(
    connect(BASE_URL, { autoConnect: false })
  )
  const user = useSelector((state: RootState) => state.app.user)

  useEffect(() => {
    if (user) {
      const newSocket = connect(BASE_URL, {
        query: { id: user.id },
      })

      socket.on('update-ui', (message:Message) => {
        console.log('received payload')
        dispatch(addMessage(message))
      })

      setSocket(newSocket)
    }
    return () => {
      socket.disconnect()
    }
  }, [user])
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export default SocketProvider
