import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const messages = [
  "Nice try 😂",
  "Bro really wants to press NO.",
  "Server protected this button.",
  "You can't escape your destiny.",
  "Not today, buddy.",
  "That button is cursed.",
  "Stop trying, it won't work.",
]

export default function ImpossibleNO({ onNext }) {
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState('')
  const [clicked, setClicked] = useState(false)
  const noButtonRef = useRef(null)

  const getRandomPosition = () => ({
    x: Math.random() * (window.innerWidth - 100) - 50,
    y: Math.random() * (window.innerHeight - 100) - 50,
  })

  const handleNoHover = () => {
    if (clicked) return

    const actions = [
      () => {
        const pos = getRandomPosition()
        noButtonRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      },
      () => {
        noButtonRef.current.style.transform = 'scale(0.5)'
        setTimeout(() => {
          noButtonRef.current.style.transform = 'scale(1)'
        }, 200)
      },
      () => {
        noButtonRef.current.style.transform = 'rotateY(360deg)'
      },
      () => {
        noButtonRef.current.style.display = 'none'
        setTimeout(() => {
          noButtonRef.current.style.display = 'block'
        }, 2000)
      },
      () => {
        const pos = getRandomPosition()
        noButtonRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) rotate(${Math.random() * 360}deg)`
      },
    ]

    const action = actions[Math.floor(Math.random() * actions.length)]
    action()

    setAttempts(prev => prev + 1)
    if (attempts < messages.length) {
      setMessage(messages[attempts])
    }
  }

  const handleYes = () => {
    setClicked(true)
    onNext()
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-8 text-gradient"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
      >
        Do you think I'm awesome? 😎
      </motion.h1>

      <div className="flex gap-8 mb-8 relative h-20">
        <motion.button
          onClick={handleYes}
          className="px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold text-xl hover:shadow-xl transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          YES ❤️
        </motion.button>

        <motion.button
          ref={noButtonRef}
          onMouseEnter={handleNoHover}
          onClick={handleNoHover}
          className="px-8 py-4 bg-gray-600 text-white rounded-full font-bold text-xl hover:shadow-xl transition-all absolute"
          style={{
            left: '150px',
            transition: 'all 0.3s ease-out',
          }}
        >
          NO 😒
        </motion.button>
      </div>

      <AnimatePresence>
        {message && (
          <motion.p
            key={message}
            className="text-xl opacity-75 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      {attempts > 7 && (
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-2xl mb-4">You've earned it 👑</p>
          <motion.button
            onClick={handleYes}
            className="px-8 py-4 bg-gradient-to-r from-accent via-primary to-secondary text-white rounded-full font-bold text-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Click NO to proceed →
          </motion.button>
        </motion.div>
      )}

      <motion.button
        onClick={onNext}
        className="mt-12 px-6 py-3 glass rounded-full hover:bg-white/20 transition"
      >
        Skip →
      </motion.button>
    </motion.div>
  )
}
