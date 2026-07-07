import { motion } from 'framer-motion'

export default function Landing({ onStart }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="text-6xl md:text-8xl mb-6"
        >
          😂
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold mb-4 text-gradient"
        >
          Welcome to the Friendship Test
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl mb-8 opacity-75"
        >
          Only legends can finish this.
        </motion.p>

        <motion.button
          variants={itemVariants}
          onClick={onStart}
          className="px-12 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold text-xl hover:shadow-2xl transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Start 🚀
        </motion.button>

        <motion.div
          variants={itemVariants}
          className="mt-12 text-sm opacity-50"
        >
          <p>Get ready for unlimited chaos...</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
