import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import noteService from './services/notes'
import userService from 'services/users'
import Notes from './pages/Notes'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { Container, Typography } from '@mui/material'
import User from './components/User'

const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedNoteappUser'
    )

    if (loggedUserJSON) {
      const userLocalStorage = JSON.parse(loggedUserJSON)
      userService.getUser(userLocalStorage.id).then(user => {
        setUser({ ...user, token: userLocalStorage.token })
      })
    }
  }, [])

  return (
    <Container
      maxWidth='md'
      sx={{ minHeight: '100vh', paddingBottom: '50px' }}
    >
      <header>
        <Navbar user={user} />
        <Typography
          component='h1'
          variant='h1'
          mt={2}
          textAlign='center'
        >
          Notes App
        </Typography>
      </header>

      <User user={user} setUser={setUser} noteService={noteService} />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route
          path='/notes'
          element={
            <Notes
              setErrorMessage={setErrorMessage}
              notes={notes}
              setNotes={setNotes}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route
          path='/login'
          element={
            <Login
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              user={user}
              setUser={setUser}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              handleUsernameChange={({ target }) =>
                setUsername(target.value)
              }
              handlePasswordChange={({ target }) =>
                setPassword(target.value)
              }
            />
          }
        />
      </Routes>
      <Footer />
    </Container>
  )
}

export default App
