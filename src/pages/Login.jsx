import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import userService from '../services/users'

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
  user && navigate('/')

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const user = await userService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(user)
      )

      setUser(user)
      navigate('/')
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const styledInput = {
    '& label.Mui-focused': {
      color: 'var(--color-primary)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'var(--color-primary)',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'var(--color-primary)',
      },
    },
  }

  return (
    <Container
      maxWidth='sm'
      sx={{
        height: 'calc(100vh - 7rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '500px',
      }}
    >
      <Typography mb='2rem' component='h2' variant='p'>
        Iniciar sesión
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
            sx={styledInput}
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
            sx={styledInput}
          />
          <Button
            sx={{
              backgroundColor: 'var(--color-primary)',
              '&:hover': {
                backgroundColor: '#2b2b2b',
              },
            }}
            variant='contained'
            type='submit'
            id='login-button'
          >
            ingresar
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
