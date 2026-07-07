import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import confetti from 'canvas-confetti'

// Make confetti available globally
window.confetti = confetti

console.log('[v0] Initializing main.jsx')
console.log('[v0] React version:', React.version)
console.log('[v0] Root element:', document.getElementById('root'))

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
  console.log('[v0] React rendered successfully')
} catch (err) {
  console.error('[v0] Error rendering React:', err)
}
