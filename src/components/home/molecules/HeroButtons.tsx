import { motion, type Variants } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { HeroButton } from '../atoms';

export function HeroButtons() {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const buttonVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttons = [
    {
      href: '/about',
      text: t('pages.home.buttons.knowMore')
    },
    {
      href: '/projects',
      text: t('pages.home.buttons.projects')
    },
    {
      href: '/contact',
      text: t('pages.home.buttons.contact')
    }
  ];

  return (
    <motion.div
      className="mt-6xl"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6xl mx-3xl">
        {buttons.map((button) => (
          <motion.div
            key={button.href}
            variants={buttonVariants}
            className="w-full"
          >
            <HeroButton href={button.href}>
              {button.text}
            </HeroButton>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}