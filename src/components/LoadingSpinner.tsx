import { motion } from 'framer-motion'

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <motion.div
        className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <span className="ml-3 text-gray-600 dark:text-gray-400">Loading feedback...</span>
    </div>
  )
}

export default LoadingSpinner 