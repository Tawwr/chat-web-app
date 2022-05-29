import { Button, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { signUpAPI } from '../api'
import { setToken, setUser } from '../redux/reducers/app'

const Signup = () => {
  const [error, setError] = useState<string>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        setError('')
        const data = await signUpAPI(values)
        dispatch(setUser(data))
        dispatch(setToken(data.token!))
      } catch (error: any) {
        setError(error.response.data.error)
      }
    },
  })

  const handleClick = () => {
    navigate('/login')
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
          error={
            Boolean(formik.errors.username) && Boolean(formik.touched.username)
          }
          helperText={formik.errors.username}
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Username"
          type="text"
          variant="standard"
          color="success"
          fullWidth
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          error={
            Boolean(formik.errors.firstName) &&
            Boolean(formik.touched.firstName)
          }
          helperText={formik.errors.firstName}
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="First Name"
          type="text"
          variant="standard"
          color="success"
          fullWidth
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          error={
            Boolean(formik.errors.lastName) && Boolean(formik.touched.lastName)
          }
          helperText={formik.errors.lastName}
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Last Name"
          type="text"
          variant="standard"
          color="success"
          fullWidth
          sx={{ marginBottom: '20px' }}
        />
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
          Signup
        </Button>

        <Typography align="center" variant="subtitle2">
          Already have an account?{' '}
          <Button variant="text" onClick={handleClick}>
            Login
          </Button>
        </Typography>
      </Grid>{' '}
    </form>
  )
}

export default Signup
