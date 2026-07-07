import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function FakeLoading({ onNext }) {
  const [stage, setStage] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (stage === 1) {
      const timer = setInterval(() => {
        setProgress(p => {
          if (p >= 99) {
            clearInterval(timer)
            setTimeout(() => setStage(2), 500)
            return 99
          }
          return p + Math.random() * 20
        })
      }, 200)

      return () => clearInterval(timer)
    }
  }, [stage])

  useEffect(() => {
    if (stage === 2) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [stage])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {stage === 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-8 text-gradient">
            Checking friendship...
          </h1>
          <motion.button
            onClick={() => setStage(1)}
            className="px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold text-lg hover:shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Check
          </motion.button>
        </motion.div>
      )}

      {stage === 1 && (
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-2xl font-bold mb-6 text-center">Analyzing...</p>
          <div className="bg-gray-700 rounded-full h-4 overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-lg font-bold">{Math.floor(progress)}%</p>
        </motion.div>
      )}

      {stage === 2 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="text-7xl mb-6">✅</div>
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Friendship Verified!
          </h2>
          <p className="text-xl opacity-75 mb-8">
            System found unlimited bakchodi detected 😂
          </p>
          <motion.button
            onClick={onNext}
            className="px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold text-lg hover:shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Next →
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}
