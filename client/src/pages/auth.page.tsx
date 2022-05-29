import { Grid, Paper, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Login from '../components/login.component'
import Signup from '../components/signup.component'
import { RootState } from '../redux/store'

type AuthProps = {
  type: 'login' | 'signup'
}
const Auth = ({ type }: AuthProps) => {
  const token = useSelector((state: RootState) => state.app.token)

  if (token) return <Navigate to="/" replace />

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        margin: '100px 0 0 0',
        display: 'flex',
        justifyContent: 'center',
        background: '#f4f5fb',
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ padding: '16px', height: '600px' }}
      >
        <Grid
          item
          md={5}
          sx={{
            height: '100%',
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              background: '#373759',
              height: '100%',
              borderRadius: '35px 0 0 35px',
            }}
          >
            <Grid item>
              <img src={require('../assets/logo.svg').default} alt="logo" />
              <Typography align="center" variant="h4" color="#fff">
                Welcome Back!
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={3} sx={{ height: '100%' }}>
          <Paper
            sx={{
              height: '100%',
              padding: '0 30px',
              borderRadius: '0 35px  35px 0',
            }}
          >
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ height: '100%' }}
            >
              {type === 'login' ? <Login /> : <Signup />}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Auth
