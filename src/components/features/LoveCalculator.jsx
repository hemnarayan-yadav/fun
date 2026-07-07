import { useState } from 'react'
import { motion } from 'framer-motion'
import { getRandomNumber } from '../../utils/helpers'
import confetti from 'canvas-confetti'

const loveComments = [
  "Absolute legends! 🔥",
  "The universe approves!",
  "Soulmates confirmed.",
  "Written in the stars! ⭐",
  "Love level: MAXIMUM",
  "Recipe for perfection!",
  "Too good to be true!",
  "Meant to be! 💕",
]

export default function LoveCalculator({ onNext }) {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!name1.trim() || !name2.trim()) return

    const percentage = getRandomNumber(1, 100)
    const comment = loveComments[Math.floor(Math.random() * loveComments.length)]

    setResult({ percentage, comment })

    if (percentage > 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      calculate()
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
        Love Calculator 💕
      </motion.h1>

      <motion.div
        className="w-full max-w-md glass p-8 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Name 1</label>
          <input
            type="text"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter first name"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-bold mb-2">Name 2</label>
          <input
            type="text"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter second name"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <motion.button
          onClick={calculate}
          className="w-full px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold text-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Calculate Love
        </motion.button>
      </motion.div>

      {result && (
        <motion.div
          className="mt-12 text-center glass p-8 rounded-2xl max-w-md"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <div className="text-6xl mb-4">❤️</div>
          <motion.div
            className="text-8xl font-bold text-gradient mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            {result.percentage}%
          </motion.div>
          <p className="text-2xl font-bold mb-6">{result.comment}</p>
          <div className="flex gap-4">
            <motion.button
              onClick={() => setResult(null)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
            <motion.button
              onClick={onNext}
              className="flex-1 px-6 py-3 glass rounded-full font-bold hover:bg-white/20 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next →
            </motion.button>
          </div>
        </motion.div>
      )}

      {!result && (name1 || name2) && (
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
