import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { compliments } from '../../data/compliments'
import { getRandomElement } from '../../utils/helpers'
import confetti from 'canvas-confetti'

export default function ComplimentGenerator({ onNext }) {
  const [hearts, setHearts] = useState([])
  const [nextId, setNextId] = useState(0)

  const generateCompliment = () => {
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.5 },
    })

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const id = nextId + i
        setNextId(prev => prev + 1)
        const compliment = getRandomElement(compliments)
        setHearts(prev => [...prev, { id, text: compliment }])

        setTimeout(() => {
          setHearts(prev => prev.filter(h => h.id !== id))
        }, 4000)
      }, i * 200)
    }
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-12 text-gradient"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
      >
        Compliment Generator ✨
      </motion.h1>

      <motion.button
        onClick={generateCompliment}
        className="px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold text-lg hover:shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Generate Compliments
      </motion.button>

      <AnimatePresence>
        {hearts.map((heart, idx) => (
          <motion.div
            key={heart.id}
            className="fixed text-center glass px-6 py-4 rounded-2xl max-w-xs"
            initial={{ 
              opacity: 0, 
              y: window.innerHeight / 2,
              x: window.innerWidth / 2,
            }}
            animate={{
              opacity: 1,
              y: window.innerHeight / 2 - 200 - idx * 60,
              x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
            }}
            exit={{ opacity: 0, y: -200 }}
            transition={{ duration: 4 }}
          >
            <div className="text-4xl mb-2">❤️</div>
            <p className="font-bold">{heart.text}</p>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.button
        onClick={onNext}
        className="mt-12 px-8 py-4 glass rounded-full font-bold text-lg hover:bg-white/20 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Next →
      </motion.button>
    </motion.div>
  )
}
