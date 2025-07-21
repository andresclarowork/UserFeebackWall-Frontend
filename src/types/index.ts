// Shared types between frontend and backend

export interface Feedback {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

export interface CreateFeedbackRequest {
  name: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FeedbackListResponse extends ApiResponse<Feedback[]> {}
export interface CreateFeedbackResponse extends ApiResponse<Feedback> {}

// Form validation types
export interface FeedbackFormData {
  name: string;
  message: string;
}

// Theme types
export type Theme = 'light' | 'dark';

// API error types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
} 