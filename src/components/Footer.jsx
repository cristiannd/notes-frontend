import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      component='footer'
      bgcolor='greenyellow'
      width='100%'
      textAlign='center'
      height='3rem'
      display='flex'
      alignItems='center'
      justifyContent='center'
      position='fixed'
      bottom='0'
      left='0'
    >
      <Typography>
        Note app from{' '}
        <Typography fontWeight='900' component='strong' variant='p'>Cristian Donalicio</Typography>
      </Typography>
    </Box>
  )
}

export default Footer
