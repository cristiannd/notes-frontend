import { Box, CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <Box
      width='100%'
      display='flex'
      justifyContent='center'
      pt='2rem'
    >
      <CircularProgress color='success' />
    </Box>
  )
}

export default Loading
