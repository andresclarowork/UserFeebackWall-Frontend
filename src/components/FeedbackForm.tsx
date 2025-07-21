import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Send, Check } from 'lucide-react'
import { Feedback, FeedbackFormData } from '../types'
import { API_ENDPOINTS } from '../config'
import { gsapAnimations, useGSAPAnimation } from '../utils/gsap'

interface FeedbackFormProps {
  onAddFeedback: (feedback: Feedback) => void
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onAddFeedback }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLTextAreaElement>(null)
  const { animateFormField } = useGSAPAnimation()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormData>()

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      setIsSubmitting(true)
      setIsSuccess(false)
      
      const response = await fetch(API_ENDPOINTS.feedback, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      console.log("Submit response status:", response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.log("Submit error response text:", errorText)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      console.log("Submit response data:", result)
      
      if (result.success) {
        onAddFeedback(result.data)
        reset()
        setIsSuccess(true)
        
        // GSAP success animation
        if (submitButtonRef.current) {
          gsapAnimations.formSuccess(submitButtonRef.current)
        }
        
        setTimeout(() => setIsSuccess(false), 2000)
      } else {
        throw new Error(result.error || 'Failed to submit feedback')
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Animate form fields on mount
  useEffect(() => {
    const nameInput = document.getElementById('name') as HTMLInputElement
    const messageInput = document.getElementById('message') as HTMLTextAreaElement
    
    if (nameInput) {
      animateFormField(nameInput, 0.1)
    }
    if (messageInput) {
      animateFormField(messageInput, 0.2)
    }
  }, [animateFormField])

  return (
    <div className="mobile-form lg:card">
      <h2 className="text-base lg:text-xl font-semibold text-gray-900 dark:text-white mb-2 lg:mb-4">
        New Feedback
      </h2>
      
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-2 lg:space-y-4">
        <div>
          <label htmlFor="name" className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { 
              required: 'Name is required',
              minLength: { value: 1, message: 'Name must be at least 1 character' },
              maxLength: { value: 100, message: 'Name must be less than 100 characters' }
            })}
            className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={2}
            {...register('message', { 
              required: 'Message is required',
              minLength: { value: 1, message: 'Message must be at least 1 character' },
              maxLength: { value: 1000, message: 'Message must be less than 1000 characters' }
            })}
            className={`input-field resize-none ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Message"
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.message.message}
            </p>
          )}
        </div>

        <motion.button
          ref={submitButtonRef}
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex items-center justify-center space-x-2 w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Send className="w-4 h-4" />
              </motion.div>
              <span>Sending...</span>
            </>
          ) : isSuccess ? (
            <>
              <Check className="w-4 h-4" />
              <span>Sent!</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Feedback</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  )
}

export default FeedbackForm 