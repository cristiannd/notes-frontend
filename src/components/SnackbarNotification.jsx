import { Alert, Snackbar } from '@mui/material'

const SnackbarNotification = ({
  notificationMessage,
  handleNotification,
}) => {
  const { type, content } = notificationMessage

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }

    handleNotification(null)
  }

  return (
    <Snackbar
      open={Boolean(content)}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        variant='filled'
        onClose={handleClose}
        severity={type || 'success'}
        elevation={6}
        sx={{ width: '100%' }}
      >
        {content}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarNotification
