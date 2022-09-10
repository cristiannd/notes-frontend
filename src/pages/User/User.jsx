import { Box, Typography } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <Box mt='1rem' mb='2rem'>
      <Typography variant='h6' lineHeight='1'>{user.name} {user.lastname}</Typography>
      <Typography color='#535353'>@{user.username}</Typography>
      
      <Outlet />
    </Box>
  )
}

export default User