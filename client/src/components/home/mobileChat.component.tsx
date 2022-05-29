import React from 'react'
import ChatForm from '../chatForm.component'
import MessagesContainer from '../messagesContainer.component'

function MobileChat() {
  return (
    <div style={{ height: '100vh', width: '100%', margin: '100px 0 0' }}>
      <MessagesContainer />
      <ChatForm />
    </div>
  )
}

export default MobileChat
