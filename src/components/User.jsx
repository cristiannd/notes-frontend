import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const User = ({ user, setUser }) => {
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedNoteappUser')
    setOpen(false)
  }

  return (
    <>
      {user && (
        <Button onClick={() => setOpen(true)}>
          Cerrar sesión
        </Button>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Cerrar sesión</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Quiéres cerrar la sesión?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout}>Aceptar</Button>
          <Button onClick={() => setOpen(false)} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default User
