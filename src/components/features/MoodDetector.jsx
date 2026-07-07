import { useState } from 'react'
import { motion } from 'framer-motion'
import { MOODS } from '../../data/constants'
import { createSparkles } from '../../utils/helpers'

const moodResponses = {
  Happy: "Your positivity is contagious! 🌟",
  Sad: "Don't worry, better days are coming! 💙",
  Angry: "Channel that energy into something awesome! 🔥",
  Sleepy: "Rest well, legend! 😴✨",
  Cool: "You're too cool for this planet! 😎",
}

export default function MoodDetector({ onNext }) {
  const [selectedMood, setSelectedMood] = useState(null)
  const [response, setResponse] = useState('')

  const handleMoodSelect = (mood, index) => {
    setSelectedMood(mood.name)
    setResponse(moodResponses[mood.name])
    createSparkles(window.innerWidth / 2, window.innerHeight / 2, 30)
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
        How are you feeling?
      </motion.h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {MOODS.map((mood, idx) => (
          <motion.button
            key={mood.name}
            onClick={() => handleMoodSelect(mood, idx)}
            className="aspect-square flex flex-col items-center justify-center gap-2 glass rounded-xl hover:bg-white/20 transition text-center p-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="text-4xl">{mood.emoji}</div>
            <div className="text-xs font-semibold">{mood.name}</div>
          </motion.button>
        ))}
      </div>

      {selectedMood && (
        <motion.div
          className="max-w-md text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-6xl mb-4">
            {MOODS.find(m => m.name === selectedMood)?.emoji}
          </div>
          <p className="text-2xl font-bold mb-6 text-gradient">{response}</p>
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

      {!selectedMood && (
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
