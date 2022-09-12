import { useState } from 'react'
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const UserMenu = ({ user, setUser }) => {
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedNoteappUser')
    setOpen(false)
    navigate('/')
  }

  const styledAnchor = {
    width: '100%',
    height: '100%',
    padding: '6px 8px',
    textDecoration: 'none',
    color: 'var(--color-primary)',
    '&:visited': {
      color: 'var(--color-primary)',
    },
    '&:link': {
      color: 'var(--color-primary)',
    },
  }

  return (
    <>
      {user && (
        <ButtonGroup
          orientation='vertical'
          variant='text'
          fullWidth
          color='success'
          sx={{ bgcolor: '#fff' }}
          
        >
          <Button sx={{ padding: 0 }}>
            <Link to={`${user.username}/notes`} style={styledAnchor}>
              Perfil
            </Link>
          </Button>
          <Button sx={{ padding: 0 }}></Button>
          <Button onClick={() => setOpen(true)} color='inherit'>
            Cerrar sesión
          </Button>
        </ButtonGroup>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Cerrar sesión</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Quiéres cerrar la sesión?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleLogout}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserMenu
