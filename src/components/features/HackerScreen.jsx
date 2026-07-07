import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HACKER_MESSAGES } from '../../data/constants'
import { triggerScreenShake } from '../../utils/helpers'

export default function HackerScreen({ onNext }) {
  const [stage, setStage] = useState(0)
  const [displayedMessages, setDisplayedMessages] = useState([])

  useEffect(() => {
    if (stage === 1) {
      let messageIndex = 0
      const interval = setInterval(() => {
        if (messageIndex < HACKER_MESSAGES.length) {
          setDisplayedMessages(prev => [...prev, HACKER_MESSAGES[messageIndex]])
          messageIndex++
        } else {
          clearInterval(interval)
          setTimeout(() => {
            triggerScreenShake(300)
            setStage(2)
          }, 800)
        }
      }, 300)

      return () => clearInterval(interval)
    }
  }, [stage])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {stage === 0 && (
        <motion.div className="text-center">
          <h1 className="text-4xl font-bold mb-8 text-green-400">
            [HACKER MODE ACTIVATED]
          </h1>
          <motion.button
            onClick={() => setStage(1)}
            className="px-8 py-4 bg-green-600 text-black rounded-full font-bold text-lg hover:shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Hack My Brain 🧠
          </motion.button>
        </motion.div>
      )}

      {stage === 1 && (
        <motion.div
          className="w-full max-w-2xl glass p-8 rounded-2xl font-mono text-green-400 text-sm md:text-base h-96 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {displayedMessages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-2"
            >
              $ {msg}
            </motion.div>
          ))}
          {displayedMessages.length > 0 && displayedMessages.length < HACKER_MESSAGES.length && (
            <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>
              _
            </motion.div>
          )}
        </motion.div>
      )}

      {stage === 2 && (
        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div className="text-6xl mb-6">😂</div>
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Just kidding!
          </h2>
          <p className="text-xl opacity-75 mb-8">Your friendship is safe with me 🔐</p>
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
