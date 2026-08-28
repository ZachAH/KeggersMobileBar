import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Registered app-wide (not just when push is enabled) so the site is
// installable as a PWA from first visit. Also serves as the background
// push handler once notifications are turned on in the admin dashboard.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/firebase-messaging-sw.js').catch(() => {})
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
