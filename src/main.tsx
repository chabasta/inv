import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { useHashRoute } from './hooks/useHashRoute'
import { InvitationPage } from './pages/InvitationPage'
import { AdminPage } from './pages/AdminPage'
function App() { const h = useHashRoute(); return h.startsWith('#/admin') ? <AdminPage /> : <InvitationPage /> }
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
