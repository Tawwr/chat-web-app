import {
  Avatar,
  Badge,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setConversationView } from '../redux/reducers/app'
import { Conversation as ConversationType } from '../types'

type ConversationProps = {
  conversation: ConversationType
}

const Conversation = ({ conversation }: ConversationProps) => {
  const { messages, name } = conversation
  const navigate = useNavigate()
  const dispatch = useDispatch()

  let lastMessageText = ''

  let lastMessageSentAt = ''

  if (messages.length > 0) {
    const lastMessage = messages[messages.length - 1]

    lastMessageText = lastMessage.body.substring(0, 15)
    lastMessageSentAt = moment(lastMessage.createdAt).format('h:mm a')
  }

  const handleClick = () => {
    dispatch(setConversationView('chat'))
    navigate(`/${conversation.id}`, { replace: true })
  }

  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={{
          borderLeft: '10px solid #6C89F4',
          '&:hover': { cursor: 'pointer', background: '#f4f5fb' },
        }}
        onClick={handleClick}
      >
        <ListItemAvatar>
          <Badge
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            badgeContent=" "
            variant="dot"
            color="secondary"
            overlap="circular"
          >
            <Avatar alt="Remy Sharp" src="" />
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="subtitle2" sx={{ fontWeight: '600' }}>
              {name}
            </Typography>
          }
          secondary={
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {lastMessageText}
                </Typography>
              </Grid>
              <Grid item>{lastMessageSentAt}</Grid>
            </Grid>
          }
        />
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </>
  )
}

export default Conversation
