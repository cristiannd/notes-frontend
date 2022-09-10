import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'

const NotFound = () => {
  return (
    <Box textAlign='center' pt='2rem'>
      <Typography component='p' variant='h6'>
        Esta página no existe, intenta hacer otra busqueda
      </Typography>
      <Button
        href='/'
        sx={{
          width: '100px',
          color: 'var(--color-primary)',
          marginTop: '1rem',
          '&:hover': {
            bgcolor: 'var(--color-primary-20)',
          },
        }}
      >
        Ir a inicio
      </Button>
    </Box>
  )
}

export default NotFound
