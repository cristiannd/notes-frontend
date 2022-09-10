import { Box, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const User = ({ user }) => {
  const [tabValue, setTabValue] = useState(0)
  const navigate = useNavigate()

  const handleChange = (newValue) => {
    setTabValue(newValue)

    if(newValue === 0) {
      return navigate('notes')
    }
    
    if(newValue === 1) {
      return navigate('favorites')
    }
  }

  return (
    <Box mt='1rem' mb='2rem'>
      <Typography variant='h6' lineHeight='1'>
        {user.name} {user.lastname}
      </Typography>
      <Typography color='#535353'>@{user.username}</Typography>
      <Tabs
        value={tabValue}
        onChange={(_, newValue) => handleChange(newValue)}
      >
        <Tab label='Posts' />
        <Tab label='Favoritos' />
      </Tabs>
      <Outlet />
    </Box>
  )
}

export default User
