import { RefreshCw } from 'lucide-react'

interface ErrorMessageProps {
  message: string
  onRetry: () => void
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <span className="text-red-600 dark:text-red-400 text-sm font-bold">!</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
              Error loading feedback
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
              {message}
            </p>
          </div>
        </div>
        
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 text-sm text-red-700 dark:text-red-300 hover:text-red-800 dark:hover:text-red-200 transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry</span>
        </button>
      </div>
    </div>
  )
}

export default ErrorMessage 