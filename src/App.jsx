import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Button({ onClick, children, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '12px 24px',
        background: disabled ? 'rgba(255,255,255,0.2)' : 'linear-gradient(90deg, #f472b6 0%, #a78bfa 50%, #818cf8 100%)',
        color: disabled ? 'rgba(255,255,255,0.5)' : 'black',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '16px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.3s ease',
      }}
    >
      {children}
    </button>
  )
}

function ImpossibleNO({ onNext }) {
  const [clicks, setClicks] = useState(0)

  const handleNoClick = () => {
    const newClicks = clicks + 1
    setClicks(newClicks)
    if (newClicks > 5) {
      setTimeout(onNext, 300)
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '36px', marginBottom: '20px', color: 'white' }}>Can you click NO?</h2>
      <div style={{ marginBottom: '40px', fontSize: '18px', color: 'rgba(255,255,255,0.8)' }}>
        Clicks: {clicks}/6
      </div>
      <button
        onClick={handleNoClick}
        style={{
          padding: '16px 32px',
          background: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '18px',
          cursor: 'pointer',
        }}
      >
        NO
      </button>
    </div>
  )
}

function FakeLoading({ onNext }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer)
          setTimeout(onNext, 1000)
          return 100
        }
        return p + Math.random() * 30
      })
    }, 300)
    return () => clearInterval(timer)
  }, [onNext])

  return (
    <div style={{ textAlign: 'center', maxWidth: '400px' }}>
      <h2 style={{ fontSize: '36px', marginBottom: '20px', color: 'white' }}>Testing Friendship...</h2>
      <div style={{
        width: '100%',
        height: '20px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '20px',
      }}>
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #f472b6 0%, #818cf8 100%)',
            width: `${progress}%`,
            transition: 'width 0.2s ease',
          }}
        />
      </div>
      <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)' }}>{Math.floor(progress)}%</p>
    </div>
  )
}

function MoodDetector({ onNext }) {
  const moods = ['Happy', 'Sad', 'Angry', 'Confused', 'Excited']
  const emojis = ['😊', '😢', '😠', '😕', '🤩']
  const [selected, setSelected] = useState(null)

  const handleSelect = (index) => {
    setSelected(index)
    setTimeout(onNext, 800)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '36px', marginBottom: '20px', color: 'white' }}>What's your mood?</h2>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {moods.map((mood, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            style={{
              padding: '20px 30px',
              background: selected === i ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              fontSize: '32px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {emojis[i]}
          </button>
        ))}
      </div>
    </div>
  )
}

function ComplimentGenerator({ onNext }) {
  const compliments = [
    'You light up the room!',
    'You make people smile!',
    'You have great taste!',
    'You are awesome!',
    'You rock!',
  ]
  const [compliment, setCompliment] = useState(compliments[0])

  const generate = () => {
    setCompliment(compliments[Math.floor(Math.random() * compliments.length)])
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '36px', marginBottom: '40px', color: 'white' }}>You deserve this:</h2>
      <div
        key={compliment}
        style={{
          fontSize: '28px',
          color: '#f472b6',
          marginBottom: '40px',
          minHeight: '60px',
        }}
      >
        {compliment}
      </div>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button onClick={generate}>Get Another</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}

function FriendshipMeter({ onNext }) {
  const [percentage, setPercentage] = useState(null)

  const calculate = () => {
    setPercentage(Math.floor(Math.random() * 100))
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '36px', marginBottom: '40px', color: 'white' }}>Friendship Meter</h2>
      {percentage === null ? (
        <Button onClick={calculate}>Calculate</Button>
      ) : (
        <>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#f472b6',
              marginBottom: '20px',
            }}
          >
            {percentage}%
          </div>
          <Button onClick={onNext}>Next</Button>
        </>
      )}
    </div>
  )
}

function LoveCalculator({ onNext }) {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (name1 && name2) {
      const combined = (name1 + name2).length
      setResult(Math.floor((combined % 100)))
    }
  }

  return (
    <div style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '36px', marginBottom: '30px', color: 'white' }}>Love Calculator</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Name 1"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '10px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '16px',
          }}
        />
        <input
          type="text"
          placeholder="Name 2"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '16px',
          }}
        />
      </div>
      {result !== null ? (
        <>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#f472b6',
              marginBottom: '20px',
            }}
          >
            {result}% Compatible!
          </div>
          <Button onClick={onNext}>Next</Button>
        </>
      ) : (
        <Button onClick={calculate}>Calculate</Button>
      )}
    </div>
  )
}

const features = [
  { name: 'Impossible NO', component: ImpossibleNO },
  { name: 'Fake Loading', component: FakeLoading },
  { name: 'Mood Detector', component: MoodDetector },
  { name: 'Compliment Generator', component: ComplimentGenerator },
  { name: 'Friendship Meter', component: FriendshipMeter },
  { name: 'Love Calculator', component: LoveCalculator },
]

export default function App() {
  const [state, setState] = useState('landing')
  const [currentFeature, setCurrentFeature] = useState(0)

  const handleStart = () => {
    setState('feature')
    setCurrentFeature(0)
  }

  const handleNext = () => {
    if (currentFeature < features.length - 1) {
      setCurrentFeature(currentFeature + 1)
    } else {
      setState('complete')
    }
  }

  const handlePlayAgain = () => {
    setState('landing')
    setCurrentFeature(0)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    }}>
      <AnimatePresence mode="wait">
        {state === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ textAlign: 'center', color: 'white' }}
          >
            <h1 style={{ fontSize: '56px', fontWeight: 'bold', marginBottom: '20px' }}>
              Friendship Test
            </h1>
            <p style={{ fontSize: '20px', marginBottom: '40px', maxWidth: '600px' }}>
              Take on 6 hilarious challenges to test your friendship!
            </p>
            <Button onClick={handleStart}>Start Adventure</Button>
          </motion.div>
        )}

        {state === 'feature' && (
          <motion.div
            key={`feature-${currentFeature}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ color: 'white', maxWidth: '800px', width: '100%' }}
          >
            <div style={{ marginBottom: '20px', fontSize: '14px', opacity: 0.8 }}>
              {currentFeature + 1} / {features.length}
            </div>
            {currentFeature === 0 && <ImpossibleNO onNext={handleNext} />}
            {currentFeature === 1 && <FakeLoading onNext={handleNext} />}
            {currentFeature === 2 && <MoodDetector onNext={handleNext} />}
            {currentFeature === 3 && <ComplimentGenerator onNext={handleNext} />}
            {currentFeature === 4 && <FriendshipMeter onNext={handleNext} />}
            {currentFeature === 5 && <LoveCalculator onNext={handleNext} />}
          </motion.div>
        )}

        {state === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ textAlign: 'center', color: 'white' }}
          >
            <h1 style={{ fontSize: '56px', fontWeight: 'bold', marginBottom: '20px' }}>
              You Made It!
            </h1>
            <p style={{ fontSize: '20px', marginBottom: '40px', maxWidth: '600px' }}>
              Friendship verified at unlimited levels!
            </p>
            <Button onClick={handlePlayAgain}>Play Again</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
