import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { roasts } from '../../data/roasts'
import { getRandomElement, triggerScreenShake } from '../../utils/helpers'

export default function RoastGenerator({ onNext }) {
  const [currentRoast, setCurrentRoast] = useState(null)
  const [shake, setShake] = useState(false)

  const generateRoast = () => {
    const roast = getRandomElement(roasts)
    setCurrentRoast(roast)
    setShake(true)
    triggerScreenShake(300)
    setTimeout(() => setShake(false), 300)
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
        Roast Me! 🔥
      </motion.h1>

      <motion.button
        onClick={generateRoast}
        className={`px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold text-lg hover:shadow-xl ${shake ? 'shake' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Generate Roast
      </motion.button>

      <AnimatePresence>
        {currentRoast && (
          <motion.div
            className="mt-12 max-w-lg text-center glass p-8 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="text-6xl mb-6">💀</div>
            <p className="text-xl md:text-2xl font-bold">{currentRoast}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {currentRoast && (
        <div className="mt-12 flex gap-4">
          <motion.button
            onClick={generateRoast}
            className="px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold text-lg hover:shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            More Roasts
          </motion.button>
          <motion.button
            onClick={onNext}
            className="px-8 py-4 glass rounded-full font-bold text-lg hover:bg-white/20 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Next →
          </motion.button>
        </div>
      )}

      {!currentRoast && (
        <motion.button
          onClick={onNext}
          className="mt-12 px-6 py-3 glass rounded-full hover:bg-white/20 transition"
        >
          Skip →
        </motion.button>
      )}
    </motion.div>
  )
}
