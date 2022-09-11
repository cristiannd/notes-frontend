import { useState } from 'react'
import noteService from '../services/notes'
import Note from '../components/Note'
import NoteForm from '../components/NoteForm'
import { Box, List } from '@mui/material'

const Notes = ({
  notes,
  setNotes,
  user,
  setUser,
  handleNotification,
}) => {
  const createNote = content => {
    noteService.create(content, user.token).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    })
  }

  return (
    <Box pt='2rem'>
      {user && (
        <NoteForm createNote={createNote} />
      )}
      <List sx={{ p: 0 }}>
        {[...notes].reverse().map(note => (
          <Note
            key={note.id}
            notes={notes}
            note={note}
            setNotes={setNotes}
            user={user}
            setUser={setUser}
            handleNotification={handleNotification}
          />
        ))}
      </List>
    </Box>
  )
}

export default Notes
