import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserMenu from './UserMenu'
import ProfileIcon from './ProfileIcon'

const Navbar = ({ user, setUser }) => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const userLoginPages = [
    {
      name: 'Información',
      pathname: '/info',
    },
  ]

  const userLogoutPages = [
    ...userLoginPages,
    {
      name: 'Iniciar sesión',
      pathname: '/login',
    },
    {
      name: 'Crear cuenta',
      pathname: '/register',
    },
  ]

  const pages = () => {
    if (user) {
      return userLoginPages
    }

    return userLogoutPages
  }

  const navigate = useNavigate()
  const location = useLocation()

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar
      position='fixed'
      sx={{ backgroundColor: 'var(--color-primary)' }}
    >
      <Container maxWidth='md'>
        <Toolbar disableGutters>
          <Typography
            variant='h5'
            noWrap
            component='a'
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              transform: 'rotate(-5deg)',
              cursor: 'pointer',
              transition: '.3s ease all',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            postIT
          </Typography>

          <Box
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages().map(
                page =>
                  location.pathname !== page.pathname && (
                    <MenuItem
                      key={page.name}
                      onClick={handleCloseNavMenu}
                    >
                      <Typography
                        textAlign='center'
                        onClick={() => navigate(page.pathname)}
                        component='a'
                      >
                        {page.name}
                      </Typography>
                    </MenuItem>
                  )
              )}
            </Menu>
          </Box>
          <Box
            width='100%'
            display='flex'
            justifyContent='center'
            sx={{
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <Typography
              variant='h4'
              noWrap
              component='a'
              onClick={() => navigate('/')}
              sx={{
                display: { xs: 'flex', md: 'none' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'underline',
                cursor: 'pointer',
                px: '0.5rem',
                transform: 'rotate(-5deg)',
                transition: '.3s ease all',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              postIT
            </Typography>
          </Box>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            {pages().map(page =>
              location.pathname === page.pathname ? (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    backgroundColor: '#fff',
                    mx: '5px',
                    '&:hover': {
                      backgroundColor: '#fff',
                    },
                  }}
                >
                  <Link
                    to={page.pathname}
                    style={{
                      color: 'var(--color-primary)',
                      textDecoration: 'none',
                      paddingTop: '2px',
                    }}
                  >
                    {page.name}
                  </Link>
                </Button>
              ) : (
                <Button key={page.name} onClick={handleCloseNavMenu}>
                  <Link
                    to={page.pathname}
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      paddingTop: '2px',
                    }}
                  >
                    {page.name}
                  </Link>
                </Button>
              )
            )}
          </Box>

          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Mi perfil'>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <Avatar
                    sx={{
                      bgcolor: '#fff',
                      color: 'var(--color-primary)',
                      fontSize: '1.2rem',
                    }}
                  >
                    {/* {`${user?.name.charAt(0)}`} */}
                    <ProfileIcon userId={user.id} />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Typography
                  textAlign='center'
                  px='0.5rem'
                  pb='0.5rem'
                >
                  Hola {user?.name} 👋
                </Typography>
                <MenuItem
                  onClick={handleCloseUserMenu}
                  sx={{ padding: 0 }}
                >
                  <UserMenu user={user} setUser={setUser} />
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
