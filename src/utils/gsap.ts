import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(TextPlugin, ScrollTrigger)

// Custom GSAP animations for the feedback wall
export const gsapAnimations = {
  // Stagger animation for feedback items
  staggerFeedbackItems: (elements: HTMLElement[]) => {
    return gsap.fromTo(elements, 
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
        rotationX: -15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }
    )
  },

  // Enhanced like button animation
  likeButtonPulse: (element: HTMLElement) => {
    const tl = gsap.timeline()
    tl.to(element, {
      scale: 1.3,
      duration: 0.2,
      ease: "power2.out"
    })
    .to(element, {
      scale: 1,
      duration: 0.3,
      ease: "elastic.out(1, 0.3)"
    })
    return tl
  },

  // Success animation for form submission
  formSuccess: (element: HTMLElement) => {
    const tl = gsap.timeline()
    tl.to(element, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out"
    })
    .to(element, {
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)"
    })
    .to(element, {
      backgroundColor: "#10b981",
      color: "white",
      duration: 0.3,
      ease: "power2.out"
    })
    return tl
  },

  // Text reveal animation
  textReveal: (element: HTMLElement) => {
    return gsap.fromTo(element,
      {
        opacity: 0,
        y: 20,
        skewY: 2
      },
      {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 0.8,
        ease: "power3.out"
      }
    )
  },

  // Card hover animation
  cardHover: (element: HTMLElement, isHovering: boolean) => {
    if (isHovering) {
      gsap.to(element, {
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        duration: 0.3,
        ease: "power2.out"
      })
    } else {
      gsap.to(element, {
        y: 0,
        scale: 1,
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        duration: 0.3,
        ease: "power2.out"
      })
    }
  },

  // Loading spinner animation
  loadingSpinner: (element: HTMLElement) => {
    return gsap.to(element, {
      rotation: 360,
      duration: 1,
      repeat: -1,
      ease: "none"
    })
  },

  // Page entrance animation
  pageEntrance: (elements: HTMLElement[]) => {
    const tl = gsap.timeline()
    
    if (elements[0]) {
      tl.fromTo(elements[0], // Header
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
    }
    
    if (elements[1]) {
      tl.fromTo(elements[1], // Feedback list
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
    }
    
    if (elements[2]) {
      tl.fromTo(elements[2], // Feedback form
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
    }
    
    return tl
  },

  // Counter animation for likes
  counterAnimation: (element: HTMLElement, targetValue: number) => {
    return gsap.to(element, {
      innerHTML: targetValue,
      duration: 0.8,
      ease: "power2.out",
      snap: { innerHTML: 1 },
      onUpdate: function() {
        element.innerHTML = Math.ceil(Number(element.innerHTML)).toString()
      }
    })
  },

  // Morphing animation for theme toggle
  themeToggleMorph: (element: HTMLElement) => {
    return gsap.to(element, {
      scale: 0.8,
      rotation: 180,
      duration: 0.4,
      ease: "back.out(1.7)",
      yoyo: true,
      repeat: 1
    })
  }
}

// Custom hooks for GSAP animations
export const useGSAPAnimation = () => {
  const animateFeedbackItem = (element: HTMLElement) => {
    return gsap.fromTo(element,
      {
        opacity: 0,
        y: 30,
        scale: 0.9,
        rotationY: -10
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.7,
        ease: "back.out(1.7)"
      }
    )
  }

  const animateFormField = (element: HTMLElement, delay: number = 0) => {
    return gsap.fromTo(element,
      {
        opacity: 0,
        x: -20,
        scale: 0.95
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.5,
        delay,
        ease: "power2.out"
      }
    )
  }

  return {
    animateFeedbackItem,
    animateFormField
  }
}

// Scroll-triggered animations
export const setupScrollAnimations = () => {
  // Only enable ScrollTrigger on desktop and disable for now to fix scroll issues
  if (window.innerWidth >= 1024 && false) {
    gsap.utils.toArray('.feedback-item').forEach((item: any, index: number) => {
      gsap.fromTo(item,
        {
          opacity: 0,
          y: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })
  }
}

export default gsap 