import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import confetti from 'canvas-confetti'

// Make confetti available globally
window.confetti = confetti

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
