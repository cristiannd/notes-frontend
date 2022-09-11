import { Box, Chip, Typography } from '@mui/material'

const Strong = ({children}) => {
  return (
    <Typography fontWeight={900}>{children}</Typography>
  )
}

const Info = () => {
  return (
    <Box>
      <Typography variant='h4' mt={2}>
        ¡Bienvenidos a{' '}
        <Typography
          component='b'
          variant='strong'
          sx={{ textDecoration: 'underline' }}
        >
          postIT
        </Typography>
        !
      </Typography>
      <Typography>
        Una aplicación inspirada en Twitter, en la cual podrás crear
        notas y dar favoritos a tus propias notas o incluso a las de
        otro usuario.
      </Typography>
      <Typography>
        Este proyecto fue realizado con fines didácticos.
      </Typography>
      <Typography>
        El objetivo fue aprender y mejorar el manejo de tecnologías
        FullStack.
      </Typography>
      <Typography>
        Para desarrollar la parte del Frontend se utilizó
      </Typography>{' '}<Strong>ReactJS</Strong>
      <Typography>
        . La maquetación fue realizada con la ayuda de Material UI. Se
        utiliza Axios para realizar las peticiones a la API. La
        aplicación es una SPA que utiliza React Router Dom.
      </Typography>
    </Box>
  )
}

export default Info
