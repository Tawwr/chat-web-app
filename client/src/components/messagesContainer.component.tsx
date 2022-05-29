import { Grid } from '@mui/material'
import { RootState } from '../redux/store'
import Message from './message.component'
import { useSelector } from 'react-redux'

const MessagesContainer = () => {
  const conversation = useSelector(
    (state: RootState) => state.conversationsState.selectedConversation
  )

  if (!conversation) return <div> No Conversation Found</div>
  return (
    <Grid
      container
      direction="column"
      /* alignItems="flex-end" */ sx={{ padding: '0 30px', width: '100%' }}
    >
      {conversation.messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          mobile={false}
        />
      ))}
    </Grid>
  )
}

export default MessagesContainer
