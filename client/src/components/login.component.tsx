import { Button, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { signInAPI } from '../api'
import { setToken, setUser } from '../redux/reducers/app'

const Login = () => {
  const [error, setError] = useState<string>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        setError('')
        const data = await signInAPI(values)
        dispatch(setUser(data))
        dispatch(setToken(data.token!))
      } catch (error: any) {
        setError(error.response.data.error)
      }
    },
  })

  const handleClick = () => {
    navigate('/signup')
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        item
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
        }}
      >
        <img src={require('../assets/logo.svg').default} alt="logo" />
      </Grid>

      <Grid item>
        <TextField
          error={Boolean(formik.errors.email) && Boolean(formik.touched.email)}
          helperText={formik.errors.email}
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="email"
          label="Email"
          type="email"
          variant="standard"
          color="success"
          fullWidth
          sx={{ marginBottom: '20px' }}
        />

        <TextField
          error={
            Boolean(formik.errors.password) && Boolean(formik.touched.password)
          }
          helperText={formik.errors.password}
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="password"
          label="Password"
          type="password"
          variant="standard"
          color="success"
          fullWidth
          sx={{ marginBottom: '20px' }}
        />

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <Button
          className="form-btn"
          variant="contained"
          sx={{ background: '#03CCBB' }}
          size="large"
          type="submit"
          fullWidth
        >
          Login
        </Button>

        <Typography align="center" variant="subtitle2">
          Don't have an account?{' '}
          <Button variant="text" onClick={handleClick}>
            Signup
          </Button>
        </Typography>
      </Grid>
    </form>
  )
}

export default Login
