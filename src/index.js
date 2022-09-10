import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <SnackbarProvider maxSnack={3}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SnackbarProvider>
)
