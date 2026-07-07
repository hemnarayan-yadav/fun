import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MILESTONES = [100, 500, 1000]

export default function ClickCounter() {
  const [clicks, setClicks] = useState(0)
  const [achievements, setAchievements] = useState([])

  useEffect(() => {
    const handleClick = () => {
      setClicks(c => c + 1)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    MILESTONES.forEach(milestone => {
      if (clicks === milestone && !achievements.includes(milestone)) {
        setAchievements(prev => [...prev, milestone])
        
        const badge = document.createElement('div')
        badge.className = 'fixed text-center pointer-events-none z-50'
        badge.innerHTML = `
          <div class="text-6xl mb-2">🏆</div>
          <div class="text-white font-bold bg-gradient-to-r from-primary via-secondary to-accent px-4 py-2 rounded-full">
            ${milestone} Clicks!
          </div>
        `
        badge.style.left = '50%'
        badge.style.top = '50%'
        badge.style.transform = 'translate(-50%, -50%)'

        document.body.appendChild(badge)

        setTimeout(() => badge.remove(), 3000)
      }
    })
  }, [clicks, achievements])

  return (
    <div className="fixed bottom-20 left-4 z-40 glass px-4 py-2 rounded-full">
      <p className="text-sm font-bold">
        Clicks: <span className="text-accent">{clicks}</span>
      </p>
    </div>
  )
}
