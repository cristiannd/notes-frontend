import { useRef, useState } from 'react'
import noteService from '../services/notes'
import Note from '../components/Note'
import Togglable from '../components/Togglable'
import NoteForm from '../components/NoteForm'
import { Box, List, Switch, Typography } from '@mui/material'

const Notes = ({ notes, setNotes, user, setUser }) => {
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll
    ? notes
    : notes.filter(note => user.favoriteNotes.includes(note.id))

  const toggleFavoriteOf = id => {
    console.log(user)

    noteService
      .update(id, user.token)
      .then(returnedNote => {
        setNotes(
          notes.map(note => (note.id !== id ? note : returnedNote))
        )

        if (user.favoriteNotes.includes(id)) {
          const filteredNotes = user.favoriteNotes.filter(n => n !== id)
          setUser({ ...user, favoriteNotes: filteredNotes })
        } else {
          const favoriteNotes = [...user.favoriteNotes, id]
          setUser({ ...user, favoriteNotes })
        }
      })
  }

  const noteFormRef = useRef()

  const createNote = content => {
    noteFormRef.current.toggleVisibility()
    noteService.create(content, user.token).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    })
  }

  return (
    <div>
      {user && (
        <>
          <Togglable buttonLabel='New note' ref={noteFormRef}>
            <NoteForm createNote={createNote} />
          </Togglable>
          <Box textAlign='center' maxWidth='sm' display='flex' alignItems='center'>
            <Switch
              checked={!showAll}
              onChange={() => setShowAll(!showAll)}
            />
            <Typography>
              {showAll ? 'All notes' : 'Favorite notes'}
            </Typography>
          </Box>
        </>
      )}
      <List>
        {[...notesToShow].reverse().map(note => (
          <Note
            key={note.id}
            note={note}
            user={user}
            toggleFavorite={() => toggleFavoriteOf(note.id)}
          />
        ))}
      </List>
    </div>
  )
}

export default Notes
