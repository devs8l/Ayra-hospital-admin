import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <div style={{
          backgroundImage: 'url(/login-bg.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }} className='bg-[#D3E4F9] p-4 h-screen flex items-center justify-center'>
          <App />
        </div>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)
