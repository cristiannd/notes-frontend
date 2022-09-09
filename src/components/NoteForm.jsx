import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  FormControl,
  TextField,
  Typography,
} from '@mui/material'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = event => {
    setNewNote(event.target.value)
  }

  const addNote = event => {
    event.preventDefault()

    createNote(newNote)
    setNewNote('')
  }

  return (
    <div className='formDiv'>
      <Typography component='h3' variant='h5'>
        Create a new note
      </Typography>

      <FormControl
        onSubmit={addNote}
        sx={{ gap: '0.5rem', paddingBottom: '0.5rem' }}
        fullWidth
        component='form'
      >
        <TextField
          label='Write a note'
          variant='filled'
          value={newNote}
          id='newNote'
          onChange={handleChange}
        />
        <Button
          sx={{ width: '100px' }}
          variant='contained'
          type='submit'
        >
          Save
        </Button>
      </FormControl>
    </div>
  )
}

NoteForm.propTypes = {
  createNote: PropTypes.func.isRequired,
}

export default NoteForm
