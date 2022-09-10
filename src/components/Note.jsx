import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material'
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import noteService from '../services/notes'
import ProfileIcon from './ProfileIcon'

const Note = ({
  notes,
  note,
  setNotes,
  user,
  setUser,
  handleNotification,
}) => {
  const navigate = useNavigate()

  const isFavorite = user && user.favoriteNotes.includes(note.id)

  const favoriteIcon = isFavorite ? (
    <Favorite />
  ) : (
    <FavoriteBorderOutlined />
  )

  const toggleFavorite = id => {
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

        if (isFavorite) {
          const filteredNotes = user.favoriteNotes.filter(
            n => n !== id
          )
          setUser({ ...user, favoriteNotes: filteredNotes })
        } else {
          const favoriteNotes = [...user.favoriteNotes, id]
          setUser({ ...user, favoriteNotes })
        }
      })
      .catch(error => console.error(error))
  }

  return (
    <ListItem
      className='note'
      secondaryAction={
        <Tooltip
          title={isFavorite ? 'Quitar favorito' : 'Dar favorito'}
        >
          <IconButton onClick={() => toggleFavorite(note.id)}>
            {favoriteIcon}
          </IconButton>
        </Tooltip>
      }
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            bgcolor: 'transparent',
            border: '1px solid #dedede',
            display: 'grid',
            placeContent: 'center'
          }}
        >
          <ProfileIcon userId={note.user.id} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={note.content}
        secondary={`@${note.user.username}`}
      />
    </ListItem>
  )
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
}

export default Note
