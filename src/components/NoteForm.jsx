import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  FormControl,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = event => {
    setNewNote(event.target.value)
  }

  const addNote = async event => {
    event.preventDefault()

    await createNote(newNote)
    setNewNote('')
  }

  return (
    <Box sx={{
      py: '1rem',
      px: '2rem',
      border: '1px solid #dedede'
    }}>
      <Typography component='h3' variant='h6'>
        Publica un post
      </Typography>

      <FormControl
        onSubmit={addNote}
        sx={{ gap: '0.5rem', paddingBottom: '0.5rem' }}
        fullWidth
        component='form'
      >
        <TextField
          variant='standard'
          multiline
          placeholder='¿En qué piensas?'
          value={newNote}
          id='newNote'
          onChange={handleChange}
          color='success'
        />
        <Button
          size='small'
          variant='contained'
          type='submit'
          disabled={!newNote.trim()}
          sx={{
            width: '100px',
            bgcolor: 'var(--color-primary)',
            '&:hover': {
              bgcolor: 'var(--color-primary)',
            },
          }}
        >
          Postear
        </Button>
      </FormControl>
    </Box>
  )
}

NoteForm.propTypes = {
  createNote: PropTypes.func.isRequired,
}

export default NoteForm
