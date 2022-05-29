import SendIcon from '@mui/icons-material/Send'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { sendMessageAPI } from '../api'
import { useSocket } from '../contexts/socketProvider'
import { RootState } from '../redux/store'

const ChatForm = () => {
  const conversation = useSelector(
    (state: RootState) => state.conversationsState.selectedConversation
  )
  const [locked, setLocked] = useState(false)

  const socket = useSocket()
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      if (!locked) {
        try {
          setLocked(true)
          const message = await sendMessageAPI({
            id: conversation!.id,
            body: values.message,
          })
          socket.emit('send-message',message)
          formik.resetForm()
        } catch (error) {
          console.log({error})
        } finally {
          setLocked(false)
        }
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        error={
          Boolean(formik.errors.message) && Boolean(formik.touched.message)
        }
        helperText={formik.errors.message}
        name="message"
        value={formik.values.message}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        id="message"
        type="message"
        variant="outlined"
        color="success"
        fullWidth
        sx={{
          position: {
            xs: 'fixed',
            md: 'relative',
          },
          bottom: {
            xs: '0',
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                disableRipple
                type="submit"
                disabled={!formik.values.message && locked}
              >
                <SendIcon sx={{ color: '#6C89F4' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  )
}

export default ChatForm
