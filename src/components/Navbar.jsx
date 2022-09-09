import { Home, FormatListBulleted, Login } from '@mui/icons-material'
import {
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = ({ user }) => {
  const [value, setValue] = useState('')

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    pathname.slice(1) ? setValue(pathname.slice(1)) : setValue('home')
  }, [pathname])

  const handleChange = (e, newValue) => {
    setValue(newValue)

    if (newValue === 'home') {
      return navigate('/')
    }

    if (newValue === 'notes') {
      return navigate('/notes')
    }

    if (newValue === 'login') {
      return navigate('/login')
    }
  }

  return (
    <BottomNavigation
      sx={{ backgroundColor: 'red' }}
      value={value}
      onChange={handleChange}
      aria-label='icon label tabs example'
    >
      <BottomNavigationAction
        value='home'
        icon={<Home />}
        label='Home'
      />
      <BottomNavigationAction
        value='notes'
        icon={<FormatListBulleted />}
        label='Notes'
      />
      {!user && (
        <BottomNavigationAction
          value='login'
          icon={<Login />}
          label='Login'
        />
      )}
    </BottomNavigation>
  )
}

export default Navbar
