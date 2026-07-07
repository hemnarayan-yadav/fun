export const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const triggerConfetti = () => {
  if (typeof window !== 'undefined' && window.confetti) {
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }
}

export const triggerScreenShake = (duration = 500) => {
  const element = document.documentElement
  const originalTransform = element.style.transform
  let start = Date.now()

  const shake = () => {
    const elapsed = Date.now() - start
    if (elapsed > duration) {
      element.style.transform = originalTransform
      return
    }
    const magnitude = 5 * Math.sin((elapsed / duration) * Math.PI * 8)
    element.style.transform = `translateX(${magnitude}px)`
    requestAnimationFrame(shake)
  }

  shake()
}

export const triggerFlash = (duration = 200) => {
  const flash = document.createElement('div')
  flash.className = 'fixed inset-0 bg-white pointer-events-none z-50'
  flash.style.animation = `fadeOut ${duration}ms ease-out`
  document.body.appendChild(flash)

  setTimeout(() => flash.remove(), duration)
}

export const playSound = (frequency = 440, duration = 100) => {
  if (typeof window === 'undefined') return
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.frequency.value = frequency
    oscillator.type = 'sine'
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration / 1000)
  } catch (e) {
    // Audio context not available
  }
}

export const createSparkles = (x, y, count = 20) => {
  if (typeof window === 'undefined') return

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div')
    sparkle.className = 'fixed pointer-events-none text-2xl'
    sparkle.textContent = '✨'
    sparkle.style.left = x + 'px'
    sparkle.style.top = y + 'px'
    sparkle.style.zIndex = '9999'
    
    const angle = (Math.PI * 2 * i) / count
    const velocity = 5 + Math.random() * 3
    const vx = Math.cos(angle) * velocity
    const vy = Math.sin(angle) * velocity
    
    let opacity = 1
    let px = x
    let py = y
    
    const animate = () => {
      px += vx
      py += vy
      opacity -= 0.02
      
      sparkle.style.transform = `translate(${px}px, ${py}px)`
      sparkle.style.opacity = opacity
      
      if (opacity > 0) {
        requestAnimationFrame(animate)
      } else {
        sparkle.remove()
      }
    }
    
    document.body.appendChild(sparkle)
    animate()
  }
}
