import { useLanguage } from '@/hooks/useLanguage';
import { motion, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

function TypewriterText({ text }: { text: string; }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const startTimer = setTimeout(() => {
      let index = 0;
      
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }, 3300);

    return () => clearTimeout(startTimer);
  }, [text]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export function HeroSection() {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-background">
      <div className="w-full px-lg">
        <motion.div 
          className="mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Main heading */}
          <motion.div className="mb-2xl" variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight tracking-tight">
              <div className="flex flex-col md:flex-row items-center justify-center gap-md">
                <motion.span 
                  className="text-foreground"
                  variants={itemVariants}
                >
                  Tanguy
                </motion.span>
                <motion.span 
                  className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
                  variants={itemVariants}
                >
                  Pauvret
                </motion.span>
              </div>
            </h1>

            {/* Subtitle */}
            <motion.div className="mt-lg" variants={itemVariants}>
              <h2 className="text-xl md:text-2xl lg:text-3xl text-foreground/60 font-light tracking-[0.05em] text-center">
                Software Engineer
              </h2>
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.div className="mx-auto" variants={itemVariants}>
            <p className="text-lg md:text-xl lg:text-2xl text-foreground/70 text-center font-light">
              <TypewriterText text={t("pages.home.greeting")} />
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}