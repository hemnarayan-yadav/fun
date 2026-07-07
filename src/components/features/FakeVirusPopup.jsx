import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VIRUS_MESSAGES } from '../../data/constants'
import { getRandomNumber } from '../../utils/helpers'

export default function FakeVirusPopup({ onNext }) {
  const [popups, setPopups] = useState([])
  const [showStart, setShowStart] = useState(true)
  const [nextId, setNextId] = useState(0)

  const createPopup = () => {
    const id = nextId
    setNextId(prev => prev + 1)
    const message = VIRUS_MESSAGES[Math.floor(Math.random() * VIRUS_MESSAGES.length)]
    
    const popup = {
      id,
      message,
      x: getRandomNumber(50, window.innerWidth - 250),
      y: getRandomNumber(50, window.innerHeight - 200),
    }

    setPopups(prev => [...prev, popup])
  }

  const handleOK = (id) => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createPopup(), i * 200)
    }
    setPopups(prev => prev.filter(p => p.id !== id))
  }

  const startVirus = () => {
    setShowStart(false)
    for (let i = 0; i < 2; i++) {
      setTimeout(() => createPopup(), i * 300)
    }
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {showStart && (
        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gradient">
            Fake Virus Alert 🚨
          </h1>
          <motion.button
            onClick={startVirus}
            className="px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold text-lg hover:shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Trigger Virus
          </motion.button>
        </motion.div>
      )}

      <AnimatePresence>
        {popups.map((popup, idx) => (
          <motion.div
            key={popup.id}
            className="fixed glass rounded-lg p-6 shadow-2xl max-w-xs z-50"
            style={{
              left: `${popup.x}px`,
              top: `${popup.y}px`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring' }}
            drag
            dragElastic={0.2}
          >
            <div className="text-5xl mb-4">⚠️</div>
            <p className="font-bold mb-4 text-sm">{popup.message}</p>
            <div className="flex gap-2">
              <motion.button
                onClick={() => handleOK(popup.id)}
                className="flex-1 px-4 py-2 bg-primary text-white rounded font-bold text-sm hover:bg-secondary transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                OK
              </motion.button>
              <motion.button
                onClick={() => setPopups(prev => prev.filter(p => p.id !== popup.id))}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded font-bold text-sm hover:bg-gray-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {popups.length === 0 && !showStart && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-6xl mb-6">😂</div>
          <p className="text-2xl font-bold mb-8 text-gradient">You survived the virus!</p>
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
