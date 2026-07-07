import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { EMOJIS } from '../../data/constants'
import { getRandomNumber } from '../../utils/helpers'

export default function EmojiRain({ onNext }) {
  const [emojis, setEmojis] = useState([])
  const [isRaining, setIsRaining] = useState(false)
  const [nextId, setNextId] = useState(0)

  const startRain = () => {
    setIsRaining(true)
    setEmojis([])
    setNextId(0)

    const rainInterval = setInterval(() => {
      if (!isRaining) {
        clearInterval(rainInterval)
        return
      }

      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const id = nextId + i
          setNextId(prev => prev + 1)
          const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
          const x = Math.random() * window.innerWidth
          const duration = getRandomNumber(2, 4)
          
          setEmojis(prev => [...prev, { id, emoji, x, duration }])

          setTimeout(() => {
            setEmojis(prev => prev.filter(e => e.id !== id))
          }, duration * 1000)
        }, i * 50)
      }
    }, 200)

    setTimeout(() => {
      setIsRaining(false)
      clearInterval(rainInterval)
    }, 5000)
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-12 text-gradient relative z-10"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
      >
        Emoji Rain 🌧️
      </motion.h1>

      <motion.button
        onClick={startRain}
        disabled={isRaining}
        className="px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold text-lg hover:shadow-xl disabled:opacity-50 relative z-10"
        whileHover={{ scale: isRaining ? 1 : 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isRaining ? 'Raining...' : 'Start Rain'}
      </motion.button>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {emojis.map((item) => (
          <motion.div
            key={item.id}
            className="fixed text-4xl"
            initial={{
              y: -50,
              x: item.x,
              opacity: 1,
            }}
            animate={{
              y: window.innerHeight + 50,
              rotate: 360,
              opacity: 0,
            }}
            transition={{
              duration: item.duration,
              ease: 'linear',
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={onNext}
        className="mt-12 px-8 py-4 glass rounded-full font-bold text-lg hover:bg-white/20 transition relative z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Next →
      </motion.button>
    </motion.div>
  )
}
