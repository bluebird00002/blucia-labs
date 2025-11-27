import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiMessageCircle, FiArrowRight } from 'react-icons/fi'

const AvatarGuide = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTip, setCurrentTip] = useState(0)

  const tips = [
    {
      title: 'Welcome to BluCia Labs!',
      message: 'Explore our cutting-edge software solutions and innovative services.',
      action: 'Discover Services'
    },
    {
      title: 'Need Help?',
      message: 'Our team is available 24/7 to assist with your software needs.',
      action: 'Contact Us'
    },
    {
      title: 'Join Our Community',
      message: 'Create an account to track your projects and requests.',
      action: 'Get Started'
    }
  ]

  useEffect(() => {
    // Auto-rotate tips every 5 seconds
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Floating Avatar Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-gradient-purple rounded-full shadow-2xl shadow-blucia-light/50 flex items-center justify-center text-white hover:scale-110 transition-transform"
        aria-label="Open guide"
      >
        <FiMessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Chat Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-24 right-8 z-50 w-80 md:w-96 glass-effect rounded-2xl p-6 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-purple rounded-full flex items-center justify-center">
                    <span className="text-white font-heading font-bold">B</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white">BluCia Assistant</h3>
                    <p className="text-xs text-blucia-white/60 font-body">Always here to help</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-blucia-white/60 hover:text-white transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Tip Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTip}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-heading font-semibold text-blucia-accent mb-2">
                    {tips[currentTip].title}
                  </h4>
                  <p className="text-blucia-white/80 font-body mb-4">
                    {tips[currentTip].message}
                  </p>
                  <button className="flex items-center space-x-2 text-blucia-accent hover:text-blucia-light transition-colors font-body font-medium">
                    <span>{tips[currentTip].action}</span>
                    <FiArrowRight size={16} />
                  </button>
                </motion.div>
              </AnimatePresence>

              {/* Tip Indicators */}
              <div className="flex space-x-2 mt-4 pt-4 border-t border-white/10">
                {tips.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTip(index)}
                    className={`flex-1 h-1 rounded-full transition-all ${
                      index === currentTip ? 'bg-blucia-accent' : 'bg-white/20'
                    }`}
                    aria-label={`Tip ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default AvatarGuide

