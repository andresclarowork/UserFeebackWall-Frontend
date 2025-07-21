import { useState, useEffect, useRef } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import FeedbackWall from './components/FeedbackWall'
import FeedbackForm from './components/FeedbackForm'
import Header from './components/Header'
import { Feedback } from './types'
import { API_ENDPOINTS } from './config'
import { gsapAnimations } from './utils/gsap'

function App() {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const feedbackWallRef = useRef<HTMLDivElement>(null)
  const feedbackFormRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(API_ENDPOINTS.feedback,{
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        console.log("Error response text:", errorText)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        setFeedback(data.data)
      } else {
        setError(data.error || 'Failed to fetch feedback')
      }
    } catch (err) {
      console.error("Fetch error:", err)
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Cannot connect to server. Please check if the backend is running.')
      } else {
        setError(`Failed to fetch feedback: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const addFeedback = (newFeedback: Feedback) => {
    setFeedback(prev => [newFeedback, ...prev])
  }

  // GSAP page entrance animation
  useEffect(() => {
    if (!isLoading && headerRef.current && feedbackWallRef.current && feedbackFormRef.current) {
      // On mobile: header -> feedback list -> form (bottom)
      // On desktop: header -> feedback list -> form (side)
      const elements = [headerRef.current, feedbackWallRef.current, feedbackFormRef.current]
      gsapAnimations.pageEntrance(elements)
    }
  }, [isLoading])

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header ref={headerRef} />
        </div>
        
        <main className="pt-16 lg:pt-20 lg:container lg:mx-auto lg:px-4">
          {/* Mobile Layout */}
          <div className="flex flex-col h-[calc(100vh-4rem)] lg:hidden">
            {/* Scrollable Feedback List */}
            <div ref={feedbackWallRef} className="flex-1 scroll-container pb-32 custom-scrollbar">
              <FeedbackWall 
                feedback={feedback}
                isLoading={isLoading}
                error={error}
                onRetry={fetchFeedback}
              />
            </div>
            
            {/* Fixed Form Section at Bottom */}
            <div ref={feedbackFormRef} className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <FeedbackForm onAddFeedback={addFeedback} />
            </div>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-7xl lg:mx-auto lg:items-start lg:mt-6">
            <div ref={feedbackWallRef} className="order-1 lg:order-1 overflow-y-auto lg:h-[calc(100vh-8rem)] custom-scrollbar">
              <FeedbackWall 
                feedback={feedback}
                isLoading={isLoading}
                error={error}
                onRetry={fetchFeedback}
              />
            </div>
            
            <div ref={feedbackFormRef} className="order-2 lg:order-2 lg:sticky lg:top-40">
              <FeedbackForm onAddFeedback={addFeedback} />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App 