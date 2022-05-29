import { Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Message as MessageType } from '../types'

type MessageProps = {
  mobile: boolean
  message: MessageType
}
const Message = ({ mobile, message }: MessageProps) => {
  const { sender } = message
  const user = useSelector((state: RootState) => state.app.user)

  const isSender = sender.id === user?.id

  return (
    <Grid
      item
      sx={{
        alignSelf: isSender ? 'flex-end' : 'flex-start',
        width: mobile ? '60%' : '40%',
        minHeight: '20px',
        borderRadius: isSender ? '10px 10px 0 10px' : '10px 10px 10px 0',
        background: isSender ? '#6C89F4' : '#03ccbb',
        padding: '10px',
        margin: '5px 0',
      }}
    >
      <Typography variant="body1" color="#fff">
        {message.body}
      </Typography>
    </Grid>
  )
}

export default Message
