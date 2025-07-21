// API Configuration
export const API_BASE_URL = 'https://a8c9d01764ad.ngrok-free.app'

// API Endpoints
export const API_ENDPOINTS = {
  feedback: `${API_BASE_URL}/api/feedback`,
  test: `${API_BASE_URL}/api/test`, // Add a test endpoint for debugging
} as const

// App Configuration
export const APP_CONFIG = {
  name: 'User Feedback Wall',
  version: '1.0.0',
} as const 