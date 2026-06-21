import { motion } from "framer-motion";
import { INITIAL_MONEY, ACHIEVEMENTS, formatMoney, formatMoneyFull } from "@/lib/gameData";
import { DollarSign, ShoppingCart, Trophy, Crown, TrendingUp } from "lucide-react";

function StatCard({ icon: Icon, label, value, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.05, duration: 0.4 }}
      className="bg-card/80 glass border border-border/50 rounded-xl p-3 sm:p-4 hover:nvidia-glow transition-shadow duration-300"
    >
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <span className="text-xs text-muted-foreground font-medium truncate">{label}</span>
      </div>
      <p className="font-display text-sm sm:text-base font-bold truncate">{value}</p>
    </motion.div>
  );
}

export default function StatsPanel({ moneyRemaining, moneySpent, totalPurchases, achievements, getMostExpensiveOwned }) {
  const pct = ((moneySpent / INITIAL_MONEY) * 100).toFixed(2);
  const mostExpensive = getMostExpensiveOwned();

  const stats = [
    { icon: DollarSign, label: "Remaining", value: formatMoney(moneyRemaining), color: "bg-primary" },
    { icon: TrendingUp, label: "Spent", value: formatMoney(moneySpent), color: "bg-primary/80" },
    { icon: ShoppingCart, label: "Purchases", value: totalPurchases.toLocaleString(), color: "bg-primary/60" },
    { icon: Trophy, label: "Achievements", value: `${achievements.length}/${ACHIEVEMENTS.length}`, color: "bg-primary/70" },
    { icon: Crown, label: "Most Expensive", value: mostExpensive ? `${mostExpensive.emoji} ${mostExpensive.name}` : "None", color: "bg-primary/50" },
    { icon: TrendingUp, label: "Completion", value: `${pct}%`, color: "bg-primary/90" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 mb-6">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} {...stat} delay={i} />
      ))}
    </div>
  );
}