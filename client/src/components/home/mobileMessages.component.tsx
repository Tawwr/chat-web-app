import { Grid, List, Paper, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Conversation from '../conversation.component'
function MobileMessages() {
  const conversations = useSelector(
    (state: RootState) => state.conversationsState.conversations
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
    </Grid>
  )
}

export default MobileMessages
