import { useState } from 'react'
import { motion } from 'framer-motion'
import { getRandomNumber } from '../../utils/helpers'
import { FRIENDSHIP_RESULTS } from '../../data/constants'

export default function FriendshipMeter({ onNext }) {
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState('')

  const calculateFriendship = () => {
    const value = FRIENDSHIP_RESULTS[Math.floor(Math.random() * FRIENDSHIP_RESULTS.length)]
    setResult(value.percentage)
    setMessage(value.message)
  }

  const getProgressWidth = () => {
    if (!result) return 0
    if (result > 100) return 100
    return result
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
        Friendship Meter 💝
      </motion.h1>

      <motion.button
        onClick={calculateFriendship}
        className="px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold text-lg hover:shadow-xl mb-12"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Calculate Friendship
      </motion.button>

      {result !== null && (
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="glass p-8 rounded-2xl text-center">
            <motion.div
              className="text-6xl font-bold text-gradient mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              {result}%
            </motion.div>

            <div className="bg-gray-700 rounded-full h-6 overflow-hidden mb-6">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressWidth()}%` }}
                transition={{ duration: 1 }}
              />
            </div>

            <p className="text-xl font-bold mb-6 text-center">{message}</p>

            <motion.button
              onClick={calculateFriendship}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold mb-4 hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>

            <motion.button
              onClick={onNext}
              className="w-full px-6 py-3 glass rounded-full font-bold hover:bg-white/20 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next →
            </motion.button>
          </div>
        </motion.div>
      )}

      {result === null && (
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
