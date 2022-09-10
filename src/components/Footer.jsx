import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      component='footer'
      borderTop='1px solid var(--color-primary)'
      width='100%'
      textAlign='center'
      height='3rem'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Box display='flex' alignItems='center' gap='8px'>
        <Typography
          component='i'
          lineHeight='1'
        >
          Made by
        </Typography>
        <Typography
          fontWeight='900'
          component='strong'
          variant='p'
          color='var(--color-primary)'
          fontSize='1.5rem'
        >
          Cristian Donalicio
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer
