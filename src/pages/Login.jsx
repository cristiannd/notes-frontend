import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userService from '../services/users'

const Login = ({
  setUser,
  user,
  handleNotification
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()
  user && navigate('/')

  const handleSubmit = async event => {
    event.preventDefault()

    if(!username) {
      return setUsernameError('Debes ingresar un nombre de usuario para continuar')
    } else {
      setUsernameError('')
    }

    if(!password) {
      return setPasswordError('Debes ingresar un contraseña para continuar')
    } else {
      setPasswordError('')
    }

    try {
      const user = await userService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(user)
      )

      handleNotification({
        message: `Hola ${user.name} 👋`,
        variant: 'success'
      })

      setUser(user)
      navigate('/')
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleNotification({
        message: `El nombre de usuario "${username}" o la contraseña no existe, intentalo de nuevo`,
        variant: 'error'
      })
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
            label='Nombre de usuario'
            type='text'
            id='username'
            error={Boolean(usernameError)}
            helperText={usernameError}
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            sx={styledInput}
          />
          <TextField
            variant='outlined'
            label='Contraseña'
            type='password'
            id='password'
            error={Boolean(passwordError)}
            helperText={passwordError}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
  setUser: PropTypes.func.isRequired,
  handleNotification: PropTypes.func.isRequired,
}

export default Login
