import { motion, useScroll, useTransform } from 'framer-motion';

export function TimelineLine() {
  const { scrollYProgress } = useScroll();

  // Transform scroll progress to line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="sticky top-48 left-6 md:left-1/2 h-[calc(100vh-12rem)] z-0 pointer-events-none">
      {/* Background line */}
      <div className="absolute left-0 md:left-1/2 top-0 w-0.5 h-full bg-foreground/20 md:-translate-x-1/2" />
      
      {/* Animated progress line going down from dot */}
      <motion.div 
        className="absolute left-0 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-primary via-secondary/80 to-primary/60 md:-translate-x-1/2 origin-top"
        style={{ height: lineHeight }}
      />
      
      {/* Animated progress line going up from dot */}
      <motion.div 
        className="absolute left-0 md:left-1/2 top-0 w-0.5 bg-primary md:-translate-x-1/2 origin-top"
        style={{ 
          height: lineHeight,
          transform: 'translateY(-100%) translateX(-50%)'
        }}
      />
      
      {/* Main starting dot - stays fixed */}
      <motion.div
        className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-lg -translate-x-1/2 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  );
}