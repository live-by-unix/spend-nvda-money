import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MoneyCounter({ amount }) {
  const [displayAmount, setDisplayAmount] = useState(amount);
  const animationRef = useRef(null);
  const prevAmount = useRef(amount);

  useEffect(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    
    const start = prevAmount.current;
    const end = amount;
    const duration = 400;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      setDisplayAmount(current);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        prevAmount.current = end;
      }
    }

    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [amount]);

  const formatted = `$${displayAmount.toLocaleString()}`;
  const isZero = displayAmount === 0;

  return (
    <div className="relative">
      <motion.div
        className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight tabular-nums transition-colors duration-300 ${
          isZero ? "text-primary" : "text-foreground"
        }`}
        key={isZero ? "zero" : "counting"}
        initial={{ scale: 1 }}
        animate={{ scale: amount !== prevAmount.current ? [1, 1.02, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        {formatted}
      </motion.div>
      <AnimatePresence>
        {isZero && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-semibold text-lg mt-2"
          >
            All spent! 🎉
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}