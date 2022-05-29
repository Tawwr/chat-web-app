import { Avatar, Grid, List, Paper, Typography } from '@mui/material'
import React from 'react'
import ChatForm from '../chatForm.component'
import MessagesContainer from '../messagesContainer.component'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Conversation from '../conversation.component'

function DesktopComponent() {
  const { conversations, selectedConversation } = useSelector(
    (state: RootState) => state.conversationsState
  )
  return (
    <Grid
      container
      justifyContent="center"
      // alignItems='center'
      spacing={3}
      sx={{ minHeight: '100vh', width: '100%', margin: '50px 0 0' }}
    >
      <Grid item xs={12} md={3} sx={{ height: '80vh', width: '100%' }}>
        <Paper elevation={0} sx={{ height: '100%' }}>
          <Typography
            component="div"
            color="#000"
            variant="h6"
            sx={{ marginLeft: '20px', fontWeight: '600' }}
          >
            Messages
          </Typography>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            {conversations?.map((conversation) => (
              <Conversation key={conversation.id} conversation={conversation} />
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item md={6} sx={{ height: '80vh', width: '100%' }}>
        <Grid container spacing={2} sx={{ height: '80vh', width: '100%' }}>
          <Grid item xs={12} sx={{ height: '100%', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '18px',
                background: '#fff',
                width: '90%',
              }}
            >
              <Avatar sx={{ display: 'inline-block' }} />
              <Typography component="span" variant="body1">
                {selectedConversation && selectedConversation.name}
              </Typography>
            </div>
            <Paper elevation={0} sx={{ height: '100%', overflowY: 'auto' }}>
              <MessagesContainer />
            </Paper>
          </Grid>
          <Grid item xs={12} sx={{ height: '20%' }}>
            <ChatForm />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DesktopComponent
