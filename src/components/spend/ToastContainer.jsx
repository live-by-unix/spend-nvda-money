import { motion, AnimatePresence } from "framer-motion";

export default function ToastContainer({ toasts }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-xs sm:max-w-sm">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="bg-card glass border border-primary/30 rounded-xl px-4 py-3 shadow-lg nvidia-glow pointer-events-auto"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{toast.emoji}</span>
              <p className="text-sm font-medium text-foreground">{toast.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}