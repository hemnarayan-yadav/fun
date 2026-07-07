import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quotes } from '../data/quotes'
import { getRandomElement, getRandomNumber } from '../utils/helpers'

export default function FloatingQuotes() {
  const [floatingQuotes, setFloatingQuotes] = useState([])
  const [nextId, setNextId] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const id = nextId
      setNextId(prev => prev + 1)
      const quote = getRandomElement(quotes)
      const quote_obj = { id, text: quote }
      
      setFloatingQuotes(prev => [...prev, quote_obj])

      setTimeout(() => {
        setFloatingQuotes(prev => prev.filter(q => q.id !== id))
      }, 5000)
    }, 8000)

    return () => clearInterval(interval)
  }, [nextId])

  return (
    <div className="fixed inset-0 pointer-events-none">
      <AnimatePresence>
        {floatingQuotes.map((q, idx) => (
          <motion.div
            key={q.id}
            className="fixed glass px-4 py-2 rounded-full text-sm whitespace-nowrap"
            initial={{ opacity: 0, x: -50, y: 0 }}
            animate={{
              opacity: 1,
              x: getRandomNumber(50, window.innerWidth - 250),
              y: 0,
            }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 5 }}
            style={{
              top: `${getRandomNumber(10, window.innerHeight - 50)}px`,
            }}
          >
            {q.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
