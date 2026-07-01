import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MARKETING_SENTENCES = [
  "وقار يجمع بين الأصالة والفخامة.",
  "تصاميم فريدة تعكس ذوقك الرفيع.",
  "خواتم صُنعت بحرفية وإتقان لا مثيل له.",
  "لمسة من الجمال تزين إطلالتك في كل مناسبة.",
  "اكتشف مجموعة وقار الحصرية الآن."
];

export default function HeroRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Rotates the index every 3.5 seconds to give users time to read
    // while keeping the presentation dynamic.
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % MARKETING_SENTENCES.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full pt-16 pb-8 sm:pt-24 sm:pb-12 md:pt-32 md:pb-16 flex flex-col items-center justify-center overflow-hidden">
      {/* 
        Container with a fixed height to prevent layout shifts as text changes.
        We use relative positioning here so absolute children overlap perfectly.
      */}
      <div className="relative w-full max-w-5xl px-4 sm:px-6 h-28 sm:h-32 md:h-40 flex items-center justify-center">
        
        {/* 
          AnimatePresence manages the entering and exiting of components in the React tree.
          When the key changes, the old component animates out and the new one animates in.
        */}
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            // Initial state: Start slightly above (y: -30) and fully transparent
            initial={{ opacity: 0, y: -30 }}
            // Animate state: Move to center (y: 0) and become fully visible
            animate={{ opacity: 1, y: 0 }}
            // Exit state: Slide down (y: 30) and fade out
            exit={{ opacity: 0, y: 30 }}
            // Transition timing: Using a custom easing curve for a fluid, premium feel
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-full text-center"
          >
            <p className="sm:text-l md:text-l font-bold text-slate-800 leading-normal md:leading-tight tracking-tight drop-shadow-sm">
              {MARKETING_SENTENCES[currentIndex]}
            </p>
          </motion.div>
        </AnimatePresence>
        
      </div>
    </section>
  );
}
