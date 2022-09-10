import { useCallback, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import noteService from 'services/notes'
import userService from 'services/users'
import Notes from 'pages/Notes'
import Info from 'pages/Info'
import Login from 'pages/Login'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import Register from 'pages/Register'

import { useSnackbar } from 'notistack'

const App = () => {
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
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

  const { enqueueSnackbar } = useSnackbar();

  const handleNotification = useCallback(({message, variant, time}) => {
    enqueueSnackbar(message, {
      variant: variant,
      autoHideDuration: time || 5000
    });
  }, [enqueueSnackbar])

  return (
    <>
      <Container
        maxWidth='sm'
        sx={{
          minHeight: 'calc(100vh - 3rem)',
        }}
      >
        <Box component='header' pb='4rem'>
          <Navbar user={user} setUser={setUser} />
        </Box>
        <Routes>
          <Route
            path='/'
            element={
              <Notes
                notes={notes}
                setNotes={setNotes}
                user={user}
                setUser={setUser}
                handleNotification={handleNotification}
              />
            }
          />

          <Route path='/info' element={<Info />} />

          <Route
            path='/login'
            element={
              <Login
                user={user}
                setUser={setUser}
                handleNotification={handleNotification}
              />
            }
          />

          <Route
            path='/register'
            element={<Register
              user={user}
              setUser={setUser}
              handleNotification={handleNotification}
            />}
          />
        </Routes>
      </Container>
      <Footer />
    </>
  )
}

export default App
