import { Box } from '@mui/material'
import Note from 'components/Note'
import React from 'react'

const UserNotes = ({ user, notes }) => {
  console.log(notes[0]?.user.id)
  console.log(user?.id)

  return (
    <Box>
      {notes.map(
        note =>
          note.user.id === user.id && (
            <Note key={note.id} note={note} user={user} />
          )
      )}
    </Box>
  )
}

export default UserNotes