import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Landing from './components/Landing'
import ImpossibleNO from './components/features/ImpossibleNO'
import FakeLoading from './components/features/FakeLoading'
import MoodDetector from './components/features/MoodDetector'
import RoastGenerator from './components/features/RoastGenerator'
import ComplimentGenerator from './components/features/ComplimentGenerator'
import FriendshipMeter from './components/features/FriendshipMeter'
import HackerScreen from './components/features/HackerScreen'
import LuckyWheel from './components/features/LuckyWheel'
import EmojiRain from './components/features/EmojiRain'
import FakeVirusPopup from './components/features/FakeVirusPopup'
import LoveCalculator from './components/features/LoveCalculator'
import ClickCounter from './components/features/ClickCounter'
import EasterEggs from './components/EasterEggs'
import FloatingQuotes from './components/FloatingQuotes'
import RandomEffects from './components/RandomEffects'
import CursorTrail from './components/CursorTrail'

const features = [
  { id: 'impossible', component: ImpossibleNO, name: 'Impossible NO Button' },
  { id: 'loading', component: FakeLoading, name: 'Fake Loading' },
  { id: 'mood', component: MoodDetector, name: 'Mood Detector' },
  { id: 'roast', component: RoastGenerator, name: 'Roast Generator' },
  { id: 'compliment', component: ComplimentGenerator, name: 'Compliment Generator' },
  { id: 'meter', component: FriendshipMeter, name: 'Friendship Meter' },
  { id: 'hacker', component: HackerScreen, name: 'Hacker Screen' },
  { id: 'wheel', component: LuckyWheel, name: 'Lucky Wheel' },
  { id: 'emoji-rain', component: EmojiRain, name: 'Emoji Rain' },
  { id: 'virus', component: FakeVirusPopup, name: 'Fake Virus Popup' },
  { id: 'love', component: LoveCalculator, name: 'Love Calculator' },
]

export default function App() {
  const [currentFeature, setCurrentFeature] = useState(null)
  const [showLanding, setShowLanding] = useState(true)

  const handleStart = () => {
    setShowLanding(false)
    setCurrentFeature(0)
  }

  const handleNext = () => {
    if (currentFeature < features.length - 1) {
      setCurrentFeature(currentFeature + 1)
    } else {
      setCurrentFeature(null)
    }
  }

  const handlePrev = () => {
    if (currentFeature > 0) {
      setCurrentFeature(currentFeature - 1)
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden gradient-bg">
      <CursorTrail />
      <ClickCounter />
      <EasterEggs />
      <FloatingQuotes />
      <RandomEffects />

      <AnimatePresence mode="wait">
        {showLanding ? (
          <Landing key="landing" onStart={handleStart} />
        ) : currentFeature === null ? (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-4 flex-col"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-center mb-6 text-gradient"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              You Made It! 🎉
            </motion.h1>
            <motion.p className="text-xl md:text-2xl text-center mb-8 max-w-2xl opacity-75">
              Friendship verified at unlimited bakchodi levels!
            </motion.p>
            <motion.button
              onClick={() => setCurrentFeature(0)}
              className="px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold text-lg hover:scale-110 transition-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={`feature-${currentFeature}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center p-4"
          >
            {features[currentFeature] && features[currentFeature].component && 
              React.createElement(features[currentFeature].component, {
                onNext: handleNext,
                onPrev: handlePrev,
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
