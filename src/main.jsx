import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom'

const AppWrapper = () => {
  const param = useParams();
  const tab = param.tab || "home";
 
  return <App tab={tab} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/:tab" element={<AppWrapper />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
