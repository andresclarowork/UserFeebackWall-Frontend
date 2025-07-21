# User Feedback Wall - Frontend

A modern, responsive React frontend for the **FullStack Test Assignment**. This is the frontend part of a fullstack web application that displays and collects user feedback with beautiful animations and a responsive design.

## How to Run Locally

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Backend API** running (see backend repository for setup)

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd UserFeedbackWall-Frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Backend URL**
   
   Update the API configuration in `src/config/index.ts`:
   ```typescript
   export const API_BASE_URL = 'https://your-backend-url.com'
   ```
   
   **Note**: Replace `'https://your-backend-url.com'` with your actual backend URL. If you're running the backend locally, it might be something like `'http://localhost:3000'`.

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Live Demo

**Frontend (Vercel)**: [https://user-feedback-wall-frontend.vercel.app](https://user-feedback-wall-frontend.vercel.app)

## Assignment Overview

This project fulfills the **Frontend Requirements** from the FullStack Test Assignment:

### Completed Features

- **Responsive Layout**: Mobile-first design that works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme Toggle**: Smooth theme switching with persistent preferences
- **Feedback Form**: AJAX submission with name and message fields (no page reload)
- **Animated Submit Button**: Smooth animations using Framer Motion
- **Smooth Animations**: Fade-in and slide-in animations for new feedback messages
- **Like/Heart Button**: Animated count with micro-interactions
- **Loading States**: Beautiful loading spinners and skeleton states
- **Error Handling**: Comprehensive error states with retry functionality
- **Form Validation**: Client-side validation with React Hook Form

## Tech Stack

### Frontend Technologies
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **Framer Motion** for smooth animations and micro-interactions
- **GSAP** for advanced animations and performance optimization
- **React Hook Form** for form handling and validation
- **Lucide React** for beautiful icons
- **Vercel** for deployment

### Key Libraries
- **TypeScript** for type safety and better development experience
- **PostCSS** for CSS processing
- **ESLint** for code quality
- **GSAP** for professional-grade animations with ScrollTrigger and TextPlugin

## Project Structure

```
src/
├── components/          # React components
│   ├── ErrorMessage.tsx    # Error display with retry
│   ├── FeedbackForm.tsx    # Feedback submission form (mobile optimized)
│   ├── FeedbackItem.tsx    # Individual feedback display with GSAP animations
│   ├── FeedbackList.tsx    # List of feedback items with staggered animations
│   ├── FeedbackWall.tsx    # Main feedback container with scroll handling
│   ├── Header.tsx          # App header with theme toggle (fixed position)
│   └── LoadingSpinner.tsx  # Loading indicators
├── contexts/           # React contexts
│   └── ThemeContext.tsx    # Dark/light theme management
├── types/              # TypeScript definitions
│   └── index.ts
├── config/             # Configuration
│   └── index.ts            # API endpoints and app config
├── utils/              # Utility functions
│   ├── cn.ts               # Class name utilities
│   └── gsap.ts             # GSAP animations and utilities
├── App.tsx             # Main application component with responsive layout
├── main.tsx           # Application entry point
└── index.css          # Global styles with custom scrollbar
```

## Features in Detail

### Responsive Design
- **Desktop**: Two-column layout with fixed header, scrollable feedback list on the left, and sticky form on the right
- **Mobile**: Single-column layout with fixed header, scrollable feedback list, and fixed form at bottom
- **Tablet**: Adaptive layout that scales between mobile and desktop
- **Fixed Elements**: Header and form remain accessible while content scrolls
- **Custom Scrollbars**: Thin, styled scrollbars that match the theme

### Dark/Light Theme
- Toggle between themes with a smooth transition
- Theme preference is automatically saved and restored
- High contrast mode support for accessibility

### Feedback Form
- **Name Field**: Required, 1-100 characters (labels hidden on mobile for compact design)
- **Message Field**: Required, 1-1000 characters (labels hidden on mobile for compact design)
- **Real-time Validation**: Instant feedback on form errors
- **AJAX Submission**: No page reload, smooth user experience
- **Success Animation**: Visual confirmation with color morphing when feedback is submitted
- **Mobile Optimized**: Compact design with simplified placeholders
- **Desktop Sticky**: Form stays in position while scrolling on desktop

### Animations & Micro-interactions
- **Framer Motion**: Smooth page transitions and component animations
- **GSAP**: Advanced animations with custom easing, 3D transforms, and timeline management
- **Like Button**: Enhanced pulse animation with elastic easing and counter animation
- **Submit Button**: Loading states and success animations with color morphing
- **Feedback Items**: Staggered entrance animations with 3D transforms
- **Card Hover**: Advanced hover effects with scale, shadow, and 3D transforms
- **Theme Toggle**: Morphing animation with rotation and scale effects
- **Page Entrance**: Orchestrated entrance animation for all main components
- **Form Fields**: Staggered field animations with custom delays
- **Counter Animations**: Smooth number counting for like increments

### Error Handling
- **Network Errors**: Clear error messages with retry functionality
- **Form Validation**: Client-side validation with helpful error messages
- **Loading States**: Skeleton loaders and spinners
- **Graceful Degradation**: App works even when backend is unavailable

## GSAP Animation System

### Overview
This application features a comprehensive GSAP animation system that enhances the user experience with professional-grade animations. GSAP is used alongside Framer Motion to provide the best of both worlds - Framer Motion for React-specific animations and GSAP for advanced, performance-optimized animations.

### Key Features

#### 1. **Advanced Animation Utilities** (`src/utils/gsap.ts`)
- **Staggered Animations**: Feedback items animate in with staggered timing and 3D transforms
- **Custom Easing**: Professional easing functions like `back.out(1.7)` and `elastic.out(1, 0.3)`
- **3D Transforms**: Rotation and scale effects for depth and visual interest
- **Timeline Management**: Complex animation sequences with precise timing
- **Counter Animations**: Smooth number counting for like increments

#### 2. **Enhanced Component Animations**
- **Feedback Items**: Hover effects with scale, shadow, and 3D transforms
- **Like Button**: Elastic pulse animation with counter increment
- **Form Submission**: Success animation with color morphing
- **Page Entrance**: Orchestrated entrance animation for all main components
- **Form Fields**: Staggered field animations with custom delays

#### 3. **Performance Optimizations**
- **Hardware Acceleration**: GPU-accelerated transforms for smooth 60fps animations
- **Memory Management**: Proper cleanup of GSAP instances
- **Mobile Optimized**: Lightweight animations for mobile devices

### Animation Examples

```typescript
// Staggered feedback items animation
gsapAnimations.staggerFeedbackItems(elements)

// Enhanced like button with elastic easing
gsapAnimations.likeButtonPulse(buttonElement)

// Success animation with color morphing
gsapAnimations.formSuccess(submitButton)

// Page entrance orchestration
gsapAnimations.pageEntrance([header, feedbackList, form])
```

### GSAP Plugins Used
- **TextPlugin**: For text animations (ready for future enhancements)
- **ScrollTrigger**: Available but currently disabled for optimal scroll performance

## Configuration

### API Configuration
The application uses a centralized configuration system in `src/config/index.ts`:

```typescript
export const API_BASE_URL = 'https://your-backend-url.com'
export const API_ENDPOINTS = {
  feedback: `${API_BASE_URL}/api/feedback`,
  test: `${API_BASE_URL}/api/test`,
}
```

### Environment Variables
Create a `.env` file for environment-specific configuration:

```env
VITE_API_BASE_URL=https://your-backend-url.com
```

## Deployment

### Vercel Deployment (Current)
This frontend is deployed on **Vercel** with the following configuration:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework Preset**: Vite
- **Auto-deployment**: Enabled on every push to main branch

### Manual Deployment
```bash
# Build for production
npm run build

# The built files will be in the `dist` directory
# Upload these files to your hosting provider
```

## API Integration

The frontend communicates with the backend through RESTful API endpoints:

### Required Backend Endpoints
- **GET** `/api/feedback` - Fetch all feedback messages
- **POST** `/api/feedback` - Submit new feedback

### Request/Response Format
```typescript
// POST /api/feedback
interface CreateFeedbackRequest {
  name: string;
  message: string;
}

// Response
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

## Assignment Evaluation Criteria

### Code Structure and Readability
- Clean, modular component architecture
- TypeScript for type safety
- Consistent code formatting with ESLint
- Well-organized file structure

### Clean UI and UX
- Modern, minimalist design
- Intuitive user interface
- Smooth interactions and transitions
- Accessible design patterns

### Quality of Animations and Responsiveness
- **Framer Motion** for professional animations and micro-interactions
- **GSAP** for advanced animations with custom easing and 3D transforms
- Responsive design that works on all devices
- Micro-interactions for better user engagement
- Performance-optimized animations with hardware acceleration
- Custom scrollbar styling for better visual experience
- Fixed header and form positioning for optimal UX

### API Logic and Security
- Proper error handling
- Input validation and sanitization
- Secure API communication
- Graceful error states

### Deployment
- **Vercel deployment** with automatic CI/CD
- Production-ready build configuration
- Environment variable management
- Fast loading times

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Verify the backend URL in `src/config/index.ts`
   - Check if the backend server is running
   - Ensure CORS is properly configured on the backend

2. **Build Errors**
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Check TypeScript compilation errors
   - Verify all imports are correct

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for CSS conflicts
   - Verify PostCSS configuration

## Screenshots

*Screenshots will be added here showing the application on different devices and themes*

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [GSAP](https://greensock.com/gsap/) - Professional animation library
- [Lucide React](https://lucide.dev/) - Icon library
- [Vercel](https://vercel.com/) - Deployment platform

---

**Frontend Part of FullStack Test Assignment**

*This is the frontend component of a fullstack web application. The backend should be deployed separately and the API URL should be configured accordingly.* 