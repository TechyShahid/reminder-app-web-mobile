import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ReminderProvider } from './context/ReminderContext'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReminderProvider>
      <App />
    </ReminderProvider>
  </React.StrictMode>,
)
