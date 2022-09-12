import { useCallback, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import noteService from 'services/notes'
import userService from 'services/users'
import Notes from 'pages/Notes'
import Login from 'pages/Login'
import User from 'pages/User/User'
import NotFound from 'pages/NotFound'
import UserFavoriteNotes from 'pages/User/components/UserFavoriteNotes'
import UserNotes from 'pages/User/components/UserNotes'
import Register from 'pages/Register'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { useSnackbar } from 'notistack'
import Loading from 'components/Loading'

const App = () => {
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    setIsLoading(true)
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
      setIsLoading(false)
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

  const handleNotification = useCallback(
    ({ message, variant, time }) => {
      enqueueSnackbar(message, {
        variant: variant,
        autoHideDuration: time || 5000,
      })
    },
    [enqueueSnackbar]
  )

  return (
    <>
      <Container
        maxWidth='md'
        sx={{
          minHeight: 'calc(100vh - 3rem)',
        }}
      >
        <Box component='header' pb='4rem'>
          <Navbar user={user} setUser={setUser} />
        </Box>


        {isLoading ? <Loading /> : ''}

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

          {user && (
            <Route
              path={`${user.username}`}
              element={<User user={user} />}
            >
              <Route
                path='notes'
                element={
                  <UserNotes
                    user={user}
                    setUser={setUser}
                    notes={notes}
                    setNotes={setNotes}
                    handleNotification={handleNotification}
                  />
                }
              />
              <Route
                path='favorites'
                element={
                  <UserFavoriteNotes
                    user={user}
                    setUser={setUser}
                    notes={notes}
                    setNotes={setNotes}
                    handleNotification={handleNotification}
                  />
                }
              />
            </Route>
          )}

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
            element={
              <Register
                user={user}
                setUser={setUser}
                handleNotification={handleNotification}
              />
            }
          />

          {!isLoading && <Route path='*' element={<NotFound />} />}
        </Routes>
      </Container>
      <Footer />
    </>
  )
}

export default App
