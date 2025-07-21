import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Feedback } from '../types'
import FeedbackItem from './FeedbackItem'
import { gsapAnimations, setupScrollAnimations } from '../utils/gsap'
import gsap from '../utils/gsap'

interface FeedbackListProps {
  feedback: Feedback[]
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedback }) => {
  const listRef = useRef<HTMLDivElement>(null)

  // Setup GSAP scroll animations when feedback changes
  useEffect(() => {
    if (feedback.length > 0) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        setupScrollAnimations()
      }, 100)
    }
  }, [feedback])

  // Simple mobile animations without ScrollTrigger
  useEffect(() => {
    if (feedback.length > 0 && window.innerWidth < 1024) {
      const items = document.querySelectorAll('.feedback-item')
      items.forEach((item, index) => {
        gsap.fromTo(item,
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: index * 0.1,
            ease: "power2.out"
          }
        )
      })
    }
  }, [feedback])

  return (
    <div ref={listRef} className="space-y-2 lg:space-y-4 pb-40 lg:pb-8">
      <AnimatePresence>
        {feedback.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.1,
              ease: "easeOut"
            }}
          >
            <FeedbackItem feedback={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default FeedbackList 