import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { WHEEL_REWARDS } from '../../data/constants'
import gsap from 'gsap'

export default function LuckyWheel({ onNext }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)
  const wheelRef = useRef(null)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    const randomIndex = Math.floor(Math.random() * WHEEL_REWARDS.length)
    const spinAngle = randomIndex * (360 / WHEEL_REWARDS.length) + 1080 + Math.random() * 50

    gsap.to(wheelRef.current, {
      rotation: spinAngle,
      duration: 3,
      ease: 'power2.out',
      onComplete: () => {
        setSelectedReward(WHEEL_REWARDS[randomIndex])
        setIsSpinning(false)
      },
    })
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
        Lucky Wheel 🎡
      </motion.h1>

      <div className="relative w-80 h-80 mb-12">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-20 blur-xl" />
        
        <svg
          ref={wheelRef}
          className="w-full h-full"
          viewBox="0 0 360 360"
          style={{ filter: 'drop-shadow(0 0 20px rgba(255, 107, 107, 0.3))' }}
        >
          {WHEEL_REWARDS.map((reward, idx) => {
            const angle = (idx * 360) / WHEEL_REWARDS.length
            const startAngle = angle * (Math.PI / 180)
            const endAngle = ((angle + 360 / WHEEL_REWARDS.length) * Math.PI) / 180
            const radius = 150

            const x1 = 180 + radius * Math.cos(startAngle)
            const y1 = 180 + radius * Math.sin(startAngle)
            const x2 = 180 + radius * Math.cos(endAngle)
            const y2 = 180 + radius * Math.sin(endAngle)

            const colors = [
              '#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181',
              '#aa96da', '#fcbad3', '#a8edea', '#fed6e3', '#ffe0b2',
            ]

            return (
              <g key={idx}>
                <path
                  d={`M 180 180 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
                  fill={colors[idx % colors.length]}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                />
                <text
                  x={180 + (radius * 0.6) * Math.cos((startAngle + endAngle) / 2)}
                  y={180 + (radius * 0.6) * Math.sin((startAngle + endAngle) / 2)}
                  textAnchor="middle"
                  dy="0.3em"
                  fontSize="12"
                  fontWeight="bold"
                  fill="white"
                  className="pointer-events-none"
                >
                  {reward.text}
                </text>
              </g>
            )
          })}
          <circle cx="180" cy="180" r="20" fill="#fff" />
        </svg>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-primary z-10" />
      </div>

      <motion.button
        onClick={spinWheel}
        disabled={isSpinning}
        className="px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold text-lg hover:shadow-xl disabled:opacity-50"
        whileHover={{ scale: isSpinning ? 1 : 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSpinning ? 'Spinning...' : 'Spin Wheel'}
      </motion.button>

      {selectedReward && (
        <motion.div
          className="mt-12 text-center glass p-8 rounded-2xl max-w-md"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div className="text-6xl mb-4">{selectedReward.emoji}</div>
          <p className="text-2xl font-bold mb-4 text-gradient">{selectedReward.text}</p>
          <p className="opacity-75 mb-6">You won!</p>
          <motion.button
            onClick={onNext}
            className="w-full px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next →
          </motion.button>
        </motion.div>
      )}

      {!selectedReward && (
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
