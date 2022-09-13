import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userService from 'services/users'

const Register = ({ user, setUser, handleNotification }) => {
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errorName, setErrorName] = useState('')
  const [errorLastname, setErrorLastname] = useState('')
  const [errorUsername, setErrorUsername] = useState('')
  const [errorPassword, setErrorPassword] = useState('')

  const navigate = useNavigate()
  user && navigate('/')

  const handleSubmit = async e => {
    e.preventDefault()

    handleErrorInputName()
    handleErrorInputLastname()
    handleErrorInputUsername()
    handleErrorInputPassword()

    const newUser = { name, lastname, username, password }

    try {
      await userService.register(newUser)
      handleNotification({
        message: '¡La cuenta se ha creado con éxito!',
        variant: 'success',
      })
      const user = await userService.login({ username, password })
      handleNotification({
        message: `¡Hola ${user.name}, bienvenid@ a postIT, disfruta de la aplicación!`,
        variant: 'success',
        time: 7000
      })

      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(user)
      )

      setUser(user)
      navigate('/')
    } catch (exception) {
      console.error(exception)
    }
  }

  const handleErrorInputName = () => {
    const regexLength = /^(?=[a-zA-Z]{2,20}$)/

    if (!regexLength.test(name)) {
      return setErrorName(
        'El nombre debe contener entre 2 y 20 caracteres alfabéticos.'
      )
    }

    setErrorName('')
  }

  const handleErrorInputLastname = () => {
    const regexLength = /^(?=[a-zA-Z]{2,20}$)/

    if (!regexLength.test(lastname)) {
      return setErrorLastname(
        'El apellido debe contener entre 2 y 20 caracteres alfabéticos.'
      )
    }

    setErrorLastname('')
  }

  const handleErrorInputUsername = () => {
    const regexLength = /^(?=[a-zA-Z0-9._]{5,20}$)/
    const regexStart = /^(?![_.])/
    const regex__ = /^(?!.*[_.]{2})/

    if (!regexLength.test(username)) {
      return setErrorUsername(
        'Debe contener entre 5 a 20 caracteres alfanuméricos, punto y guión bajo.'
      )
    }

    if (!regexStart.test(username)) {
      return setErrorUsername(
        'No puede comenzar con punto (.) ni guión bajo (_).'
      )
    }

    if (!regex__.test(username)) {
      return setErrorUsername(
        'No puede contener más de un punto o guión bajo seguido.'
      )
    }

    setErrorUsername('')
  }

  const handleErrorInputPassword = () => {
    const minLengthPassword = 8

    if (password.length < minLengthPassword) {
      return setErrorPassword(
        `La contraseña debe contener al menos ${minLengthPassword} caracteres.`
      )
    }

    if (password !== confirmPassword) {
      return setErrorPassword('Las contraseñas deben coincidir.')
    }

    setErrorPassword('')
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
        minHeight: '700px',
      }}
    >
      <Typography mb='2rem' component='h2' variant='p'>
        Crear cuenta
      </Typography>
      {!user && (
        <FormControl
          component='form'
          fullWidth
          onSubmit={e => handleSubmit(e)}
          sx={{ gap: '2rem' }}
        >
          <TextField
            variant='outlined'
            label='Nombre'
            error={Boolean(errorName)}
            helperText={errorName}
            type='text'
            id='name'
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={handleErrorInputName}
            fullWidth
            sx={styledInput}
          />
          <TextField
            variant='outlined'
            label='Apellido'
            error={Boolean(errorLastname)}
            helperText={errorLastname}
            type='text'
            id='lastname'
            value={lastname}
            onChange={e => setLastname(e.target.value)}
            onBlur={handleErrorInputLastname}
            fullWidth
            sx={styledInput}
          />
          <TextField
            variant='outlined'
            label='Nombre de usuario'
            error={Boolean(errorUsername)}
            helperText={errorUsername}
            type='text'
            id='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
            onBlur={handleErrorInputUsername}
            fullWidth
            sx={styledInput}
          />
          <TextField
            variant='outlined'
            label='Contraseña'
            error={Boolean(errorPassword)}
            helperText={errorPassword}
            type='password'
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            onBlur={handleErrorInputPassword}
            fullWidth
            sx={styledInput}
          />
          <TextField
            variant='outlined'
            label='Confirmar contraseña'
            error={Boolean(errorPassword)}
            helperText={errorPassword}
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            onBlur={handleErrorInputPassword}
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
            Crear cuenta
          </Button>
        </FormControl>
      )}
    </Container>
  )
}

export default Register
