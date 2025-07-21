import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, User } from 'lucide-react'
import { Feedback } from '../types'
import { gsapAnimations } from '../utils/gsap'

interface FeedbackItemProps {
  feedback: Feedback
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback }) => {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const likeButtonRef = useRef<HTMLButtonElement>(null)
  const likeCountRef = useRef<HTMLSpanElement>(null)

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1)
      setIsLiked(false)
    } else {
      setLikes(prev => prev + 1)
      setIsLiked(true)
      
      // GSAP animation for like button
      if (likeButtonRef.current) {
        gsapAnimations.likeButtonPulse(likeButtonRef.current)
      }
      
      // Counter animation
      if (likeCountRef.current) {
        gsapAnimations.counterAnimation(likeCountRef.current, likes + 1)
      }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    const diffInHours = Math.floor(diffInMinutes / 60)
    
    if (diffInMinutes < 1) {
      return 'Just now'
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }
  }

  // GSAP hover animation
  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsapAnimations.cardHover(cardRef.current, true)
    }
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsapAnimations.cardHover(cardRef.current, false)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 lg:p-4 hover:shadow-md transition-all duration-200 feedback-item"
      whileHover={{ y: -1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              {feedback.name}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(feedback.createdAt)}
            </span>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {feedback.message}
          </p>
          
          <div className="mt-3 flex items-center space-x-4">
            <motion.button
              ref={likeButtonRef}
              onClick={handleLike}
              className={`flex items-center space-x-1 text-sm transition-colors duration-200 ${
                isLiked 
                  ? 'text-red-500 dark:text-red-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.2 }}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </motion.div>
              <span ref={likeCountRef}>{likes}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default FeedbackItem 