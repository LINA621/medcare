/**
 * Image Configuration File
 *
 * IMPORTANT: Replace all placeholder paths with your actual image paths
 *
 * Instructions:
 * 1. Upload your images to your public folder or CDN
 * 2. Replace each "IMAGE_PATH_HERE" with the actual path
 * 3. Example: "/images/hero-background.jpg" or "https://cdn.example.com/hero.jpg"
 */

export const IMAGES = {
  // Hero Section
  hero: {
    background: "HERO_BACKGROUND_IMAGE_PATH", // Large background image for hero section
    doctors: "HERO_DOCTORS_IMAGE_PATH", // Image of doctors for hero section
  },

  // About Section
  about: {
    mainImage: "ABOUT_MAIN_IMAGE_PATH", // Main about section image
    secondaryImage: "ABOUT_SECONDARY_IMAGE_PATH", // Secondary about image
  },

  // Services - Icons will be handled by Lucide React icons
  services: {
    pharmacyIcon: "SERVICE_PHARMACY_ICON_PATH", // Optional custom icons
    medicalIcon: "SERVICE_MEDICAL_ICON_PATH",
  },

  // Doctors
  doctors: {
    // Individual doctor images - replace with actual paths
    default: "DOCTOR_DEFAULT_PLACEHOLDER_PATH",
    drJohnSmith: "DOCTOR_JOHN_SMITH_IMAGE_PATH",
    drSarahJohnson: "DOCTOR_SARAH_JOHNSON_IMAGE_PATH",
    drMichaelLee: "DOCTOR_MICHAEL_LEE_IMAGE_PATH",
    drEmilyDavis: "DOCTOR_EMILY_DAVIS_IMAGE_PATH",
  },

  // Authentication Pages
  auth: {
    loginBackground: "AUTH_LOGIN_BG_IMAGE_PATH",
    signupDoctors: "AUTH_SIGNUP_DOCTORS_IMAGE_PATH", // Doctors image for signup page
  },

  // Logo
  logo: {
    main: "LOGO_MAIN_PATH",
    icon: "LOGO_ICON_PATH",
  },

  // Placeholders
  placeholder: {
    user: "USER_PLACEHOLDER_IMAGE_PATH",
    medical: "MEDICAL_PLACEHOLDER_IMAGE_PATH",
  },
}

/**
 * Helper function to get image path with fallback
 */
export const getImagePath = (path: string, fallback?: string): string => {
  if (path.includes("IMAGE_PATH_HERE") || path.includes("PLACEHOLDER")) {
    return fallback || "/placeholder.svg?height=400&width=600"
  }
  return path
}
