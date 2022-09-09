import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'

const Login = ({
  handleUsernameChange,
  handlePasswordChange,
  username,
  setUsername,
  password,
  setPassword,
  setUser,
  errorMessage,
  setErrorMessage,
  user,
}) => {
  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(user)
      )

      setUser(user)
      navigate('/notes')
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  user && navigate('/')
  return (
    <Container maxWidth='sm'>
      <Typography mb='2rem' component='h2' variant='h3'>
        Login
      </Typography>
      {!user && (
        <FormControl
          component='form'
          fullWidth
          onSubmit={handleSubmit}
          sx={{ gap: '2rem' }}
        >
          <TextField
            variant='outlined'
            label='Username'
            error={errorMessage === 'Wrong credentials'}
            helperText={errorMessage}
            type='text'
            id='username'
            value={username}
            onChange={handleUsernameChange}
            fullWidth
          />
          <TextField
            variant='outlined'
            label='Password'
            error={errorMessage === 'Wrong credentials'}
            helperText={errorMessage}
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            fullWidth
          />
          <Button
            sx={{
              backgroundColor: '#ADFF2F',
              color: '#242424',
              '&:hover': {
                backgroundColor: '#2b2b2b',
                color: '#fff',
              },
            }}
            variant='contained'
            type='submit'
            id='login-button'
          >
            LOGIN
          </Button>
        </FormControl>
      )}
    </Container>
  )
}

Login.propTypes = {
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default Login
