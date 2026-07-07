import { useEffect, useState } from 'react'
import { triggerConfetti, triggerScreenShake, createSparkles } from '../utils/helpers'

export default function EasterEggs() {
  const [konami, setKonami] = useState([])

  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    
    const handleKeyDown = (e) => {
      const newKonami = [...konami, e.key]
      setKonami(newKonami.slice(-konamiCode.length))

      if (newKonami.slice(-konamiCode.length).join(',') === konamiCode.join(',')) {
        triggerConfetti()
        triggerScreenShake(300)
        document.body.style.filter = 'hue-rotate(360deg)'
        setTimeout(() => {
          document.body.style.filter = 'none'
        }, 1000)
      }

      // Single key codes
      if (e.key === 'f' || e.key === 'F') {
        triggerConfetti()
      }

      if (e.key === '?') {
        createSparkles(window.innerWidth / 2, window.innerHeight / 2, 50)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    // Double click logo
    let clickCount = 0
    const handleLogoClick = () => {
      clickCount++
      if (clickCount === 2) {
        triggerScreenShake()
        createSparkles(window.innerWidth / 2, 100, 30)
        clickCount = 0
      }
    }

    const logo = document.querySelector('[data-easter-egg="logo"]')
    if (logo) {
      logo.addEventListener('click', handleLogoClick)
    }

    // Triple click background
    let bgClickCount = 0
    let bgClickTimer
    const handleBgClick = (e) => {
      if (e.target === document.documentElement) {
        bgClickCount++
        clearTimeout(bgClickTimer)
        
        if (bgClickCount === 3) {
          document.body.style.animation = 'spin 0.5s ease-in-out'
          setTimeout(() => {
            document.body.style.animation = 'none'
          }, 500)
          bgClickCount = 0
        }
        
        bgClickTimer = setTimeout(() => {
          bgClickCount = 0
        }, 1000)
      }
    }

    document.documentElement.addEventListener('click', handleBgClick)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.documentElement.removeEventListener('click', handleBgClick)
      if (logo) {
        logo.removeEventListener('click', handleLogoClick)
      }
    }
  }, [konami])

  return null
}
