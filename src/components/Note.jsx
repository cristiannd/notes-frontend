import {
  Favorite,
  FavoriteBorderOutlined,
  Person,
} from '@mui/icons-material'
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import PropTypes from 'prop-types'

const Note = ({ note, user, toggleFavorite }) => {
  const isFavorite =
    user && user.favoriteNotes.includes(note.id) ? (
      <Favorite />
    ) : (
      <FavoriteBorderOutlined />
    )

  return (
    <ListItem
      className='note'
      secondaryAction={
        <IconButton onClick={toggleFavorite}>{isFavorite}</IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <Person />
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
  toggleFavorite: PropTypes.func.isRequired,
}

export default Note
