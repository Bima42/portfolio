import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';

interface AnimatedLogoProps {
  isAnimating?: boolean;
  onAnimationComplete?: () => void;
  showInitialAnimation?: boolean;
}

export function AnimatedLogo({ 
  isAnimating = false, 
  onAnimationComplete,
  showInitialAnimation = false 
}: AnimatedLogoProps) {
  if (showInitialAnimation) {
    return (
      <motion.div
        key="animated-logo"
        initial={{ 
          scale: 0,
          x: "50vw", 
          y: "50vh",
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={isAnimating ? {
          scale: 1,
          x: "1rem",
          y: "1rem",
          translateX: "0%",
          translateY: "0%"
        } : {
          scale: 3,
          x: "50vw", 
          y: "50vh",
          translateX: "-50%",
          translateY: "-50%"
        }}
        transition={{
          duration: 0.8,
          delay: isAnimating ? 0.5 : 0.5,
          ease: "easeInOut"
        }}
        onAnimationComplete={onAnimationComplete}
        className="fixed z-50"
        style={{
          position: "fixed",
          zIndex: 50
        }}
      >
        <img
          src="/logo-no-bg.svg"
          alt="Logo"
          className="h-12 w-auto"
        />
      </motion.div>
    );
  }

  return (
    <Link
      to="/"
      className="flex items-center space-x-2 transition-opacity hover:opacity-80"
    >
      <img 
        src="/logo-no-bg.svg" 
        alt="Logo" 
        className="h-12 w-auto" 
      />
    </Link>
  );
}