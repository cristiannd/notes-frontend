import { useEffect, useState } from 'react'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import Notes from './pages/Notes'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    noteService.setToken('')
    window.localStorage.removeItem('loggedNoteappUser')
  }

  return (
    <div>
      <header>
        <Navbar />
        <h1>Notes App</h1>
      </header>
      {user && (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/login'
          element={
            <Login
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              setUser={setUser}
              setErrorMessage={setErrorMessage}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
            />
          }
        />
        <Route
          path='/notes'
          element={
            <Notes
              setErrorMessage={setErrorMessage}
              notes={notes}
              setNotes={setNotes}
            />
          }
        />
      </Routes>

      <Notification message={errorMessage} />

      <Footer />
    </div>
  )
}

export default App
