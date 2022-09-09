import { Logout } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { useState } from 'react'

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
        <Box display='flex' alignItems='center'>
          <Typography>Hi, {user.name} 👋</Typography>
          <IconButton onClick={() => setOpen(true)}>
            <Logout />
          </IconButton>
        </Box>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Log out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to close your sesion?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout}>Logout</Button>
          <Button onClick={() => setOpen(false)} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default User
