import { Box } from '@mui/material'
import Note from 'components/Note'

const UserFavoriteNotes = ({
  user,
  setUser,
  notes,
  setNotes,
  handleNotification,
}) => {
  return (
    <Box>
      {notes.map(
        note =>
          user.favoriteNotes.includes(note.id) && (
            <Note
              key={note.id}
              note={note}
              user={user}
              setUser={setUser}
              notes={notes}
              setNotes={setNotes}
              handleNotification={handleNotification}
            />
          )
      )}
    </Box>
  )
}

export default UserFavoriteNotes
