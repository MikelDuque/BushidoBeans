import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
// import { CarritoProvider } from './context/CarritoContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* <CarritoProvider> */}
          <App />
        {/* </CarritoProvider> */}
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
