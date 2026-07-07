import { useEffect } from 'react'
import { triggerConfetti, triggerScreenShake, triggerFlash, createSparkles, getRandomNumber } from '../utils/helpers'

export default function RandomEffects() {
  useEffect(() => {
    const effects = [
      () => triggerScreenShake(300),
      () => triggerFlash(),
      () => triggerConfetti(),
      () => createSparkles(window.innerWidth / 2, window.innerHeight / 2, 30),
      () => {
        document.body.style.filter = 'brightness(1.5)'
        setTimeout(() => {
          document.body.style.filter = 'brightness(1)'
        }, 500)
      },
      () => {
        const angle = Math.random() * 360
        document.documentElement.style.transform = `rotate(${angle}deg)`
        setTimeout(() => {
          document.documentElement.style.transform = 'rotate(0deg)'
        }, 300)
      },
    ]

    const interval = setInterval(() => {
      const randomEffect = effects[Math.floor(Math.random() * effects.length)]
      randomEffect()
    }, getRandomNumber(15000, 25000))

    return () => clearInterval(interval)
  }, [])

  return null
}
