import { motion, AnimatePresence } from 'framer-motion'
import FeedbackList from './FeedbackList'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import { Feedback } from '../types'

interface FeedbackWallProps {
  feedback: Feedback[]
  isLoading: boolean
  error: string | null
  onRetry: () => void
}

const FeedbackWall: React.FC<FeedbackWallProps> = ({
  feedback,
  isLoading,
  error,
  onRetry,
}) => {
  return (
    <div className="h-full flex flex-col lg:block">      
      {isLoading && (
        <div className="flex-1 flex items-center justify-center p-4">
          <LoadingSpinner />
        </div>
      )}
      
      {error && (
        <div className="flex-1 flex items-center justify-center p-4">
          <ErrorMessage 
            message={error} 
            onRetry={onRetry} 
          />
        </div>
      )}
      
      {!isLoading && !error && (
        <div className="h-full lg:overflow-visible">
          <div className="p-3 pb-20 lg:p-4">
            <AnimatePresence mode="wait">
              {feedback.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <div className="text-gray-500 dark:text-gray-400 text-lg">
                    No feedback yet. Be the first to share your thoughts!
                  </div>
                </motion.div>
              ) : (
                <FeedbackList feedback={feedback} />
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeedbackWall 