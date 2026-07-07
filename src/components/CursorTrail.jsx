import { useEffect } from 'react'

export default function CursorTrail() {
  useEffect(() => {
    const particles = []
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (Math.random() > 0.7) {
        const particle = document.createElement('div')
        particle.className = 'fixed pointer-events-none rounded-full'
        particle.style.left = mouseX + 'px'
        particle.style.top = mouseY + 'px'
        particle.style.width = '8px'
        particle.style.height = '8px'
        particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`
        particle.style.zIndex = '10'
        particle.style.opacity = '0.6'

        document.body.appendChild(particle)
        particles.push({ element: particle, life: 1 })

        if (particles.length > 50) {
          particles[0].element.remove()
          particles.shift()
        }

        let i = 0
        const fadeOut = setInterval(() => {
          i++
          if (i > 30) {
            particle.remove()
            clearInterval(fadeOut)
          } else {
            particle.style.opacity = 0.6 - i / 50
          }
        }, 16)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      particles.forEach(p => p.element.remove())
    }
  }, [])

  return null
}
