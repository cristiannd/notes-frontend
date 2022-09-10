import { useState } from 'react'
import noteService from '../services/notes'
import Note from '../components/Note'
import NoteForm from '../components/NoteForm'
import { Box, List, Switch, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Notes = ({
  notes,
  setNotes,
  user,
  setUser,
  handleNotification,
}) => {
  const [showAll, setShowAll] = useState(true)
  const navigate = useNavigate()

  const notesToShow = showAll
    ? notes
    : notes.filter(note => user.favoriteNotes.includes(note.id))

  const toggleFavoriteOf = id => {
    if (!user) {
      handleNotification({
        message: 'Para dar favorito debes iniciar sesión',
        variant: 'error',
        time: 2000,
      })
      return navigate('/login')
    }

    noteService
      .update(id, user.token)
      .then(returnedNote => {
        setNotes(
          notes.map(note => (note.id !== id ? note : returnedNote))
        )

        if (user.favoriteNotes.includes(id)) {
          const filteredNotes = user.favoriteNotes.filter(
            n => n !== id
          )
          setUser({ ...user, favoriteNotes: filteredNotes })
        } else {
          const favoriteNotes = [...user.favoriteNotes, id]
          setUser({ ...user, favoriteNotes })
        }
      })
      .catch(error => console.error('Error -->', error))
  }

  const createNote = content => {
    noteService.create(content, user.token).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    })
  }

  return (
    <Box pt='2rem'>
      {user && (
        <NoteForm createNote={createNote} />
        // <Box
        //   textAlign='center'
        //   maxWidth='sm'
        //   display='flex'
        //   alignItems='center'
        // >
        //   <Switch
        //     checked={!showAll}
        //     onChange={() => setShowAll(!showAll)}
        //   />
        //   <Typography>
        //     {showAll ? 'All notes' : 'Favorite notes'}
        //   </Typography>
        // </Box>
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
    </Box>
  )
}

export default Notes
