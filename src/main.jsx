import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './component/router/MainRouter.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </AuthProvider>
  </StrictMode>,
)
