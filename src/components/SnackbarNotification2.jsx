import { Alert, Snackbar } from '@mui/material'

const SnackbarNotification = ({
  notificationMessage,
  handleNotification,
}) => {
  const { open, type, content } = notificationMessage

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }

    handleNotification({
      type: null
    })
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        variant='filled'
        onClose={handleClose}
        severity={type || 'error'}
        elevation={6}
        sx={{ width: '100%' }}
      >
        {content}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarNotification
