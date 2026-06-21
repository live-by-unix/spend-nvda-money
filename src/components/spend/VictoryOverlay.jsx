import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { INITIAL_MONEY, ITEMS, ACHIEVEMENTS, formatMoneyFull } from "@/lib/gameData";
import { Trophy, Download, X, Clock } from "lucide-react";
import ShareButton from "./ShareButton";

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

export default function VictoryOverlay({ completedAt, startTime, totalPurchases, achievements, inventory, onClose, onDownloadCertificate }) {
  const timeTaken = completedAt - startTime;

  const topItems = ITEMS
    .filter(item => (inventory[item.name] || 0) > 0)
    .sort((a, b) => b.price * (inventory[b.name] || 0) - a.price * (inventory[a.name] || 0))
    .slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 glass p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-card border border-primary/30 rounded-2xl nvidia-glow-strong max-w-md w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative"
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            className="text-6xl mb-3"
          >
            🏆
          </motion.div>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-primary mb-1">
            NVIDIA Money Master
          </h2>
          <p className="text-muted-foreground text-sm">
            You spent every last dollar!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-muted/50 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">Total Spent</p>
            <p className="font-display text-sm font-bold text-primary">{formatMoneyFull(INITIAL_MONEY)}</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">Time Taken</p>
            <p className="font-display text-sm font-bold flex items-center justify-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDuration(timeTaken)}
            </p>
          </div>
          <div className="bg-muted/50 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">Purchases</p>
            <p className="font-display text-sm font-bold">{totalPurchases.toLocaleString()}</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">Achievements</p>
            <p className="font-display text-sm font-bold">{achievements.length}/{ACHIEVEMENTS.length}</p>
          </div>
        </div>

        {/* Top purchases */}
        {topItems.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">Top Purchases</h3>
            <div className="space-y-1.5">
              {topItems.map(item => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <span>{item.emoji} {item.name}</span>
                  <span className="font-display text-xs text-muted-foreground">×{(inventory[item.name] || 0).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <ShareButton moneySpent={INITIAL_MONEY} inventory={inventory} />
          <Button
            onClick={onDownloadCertificate}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            size="sm"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Certificate
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}