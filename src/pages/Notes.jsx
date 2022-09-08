import { useRef, useState } from 'react'
import noteService from '../services/notes'
import Note from '../components/Note'
import Togglable from '../components/Togglable'
import NoteForm from '../components/NoteForm'

const Notes = ({ setErrorMessage, notes, setNotes, user }) => {
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = {
      ...note,
      important: !note.important,
      user: note.user.id,
    }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const noteFormRef = useRef()

  const addNote = noteObject => {
    noteFormRef.current.toggleVisibility()
    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    })
  }

  return (
    <div>
      {user !== null && (
        <div>
          {
            <Togglable buttonLabel='New note' ref={noteFormRef}>
              <NoteForm createNote={addNote} />
            </Togglable>
          }
        </div>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
    </div>
  )
}

export default Notes
