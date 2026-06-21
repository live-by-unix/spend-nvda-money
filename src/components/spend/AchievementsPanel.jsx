import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/gameData";
import { Trophy } from "lucide-react";

export default function AchievementsPanel({ unlockedIds }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="h-4 w-4 text-primary" />
        <h2 className="font-heading font-bold text-sm sm:text-base">
          Achievements
          <span className="text-muted-foreground font-normal ml-1.5 text-xs">
            {unlockedIds.length}/{ACHIEVEMENTS.length}
          </span>
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {ACHIEVEMENTS.map(a => {
          const unlocked = unlockedIds.includes(a.id);
          return (
            <motion.div
              key={a.id}
              initial={false}
              animate={{ scale: unlocked ? 1 : 0.95 }}
              whileHover={{ scale: 1.05 }}
              className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 cursor-default ${
                unlocked
                  ? "bg-primary/15 text-primary border border-primary/30 nvidia-glow"
                  : "bg-muted/50 text-muted-foreground border border-border/30 opacity-60"
              }`}
              title={a.description}
            >
              <span className="text-sm">{a.emoji}</span>
              <span className="hidden sm:inline">{a.name}</span>
              {unlocked && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}