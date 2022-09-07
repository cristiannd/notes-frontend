import { useEffect, useState, useRef } from 'react'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import noteService from './services/notes'
import Notes from './pages/Notes'

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

  const noteFormRef = useRef()

  const addNote = noteObject => {
    noteFormRef.current.toggleVisibility()
    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedNoteappUser')
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>logout</button>
          {
            <Togglable buttonLabel='New note' ref={noteFormRef}>
              <NoteForm createNote={addNote} />
            </Togglable>
          }
        </div>
      )}
      <Notes
        setErrorMessage={setErrorMessage}
        notes={notes}
        setNotes={setNotes}
      />
      <Footer />
    </div>
  )
}

export default App
