import { Box } from '@mui/material'
import Note from 'components/Note'

const UserFavoriteNotes = ({ notes, user }) => {
  return (
    <Box>
      {notes.map(
        note =>
          user.favoriteNotes.includes(note.id) && (
            <Note key={note.id} note={note} user={user} />
          )
      )}
    </Box>
  )
}

export default UserFavoriteNotes