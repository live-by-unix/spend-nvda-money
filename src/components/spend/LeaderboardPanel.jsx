import { Medal, Clock, ShoppingCart, Calendar } from "lucide-react";

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

const medalColors = ["text-yellow-500", "text-gray-400", "text-amber-700"];

export default function LeaderboardPanel({ leaderboard }) {
  if (!leaderboard || leaderboard.length === 0) return null;

  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Medal className="h-4 w-4 text-primary" />
        <h2 className="font-heading font-bold text-sm sm:text-base">Leaderboard</h2>
      </div>
      <div className="bg-card/80 glass border border-border/50 rounded-xl overflow-hidden">
        {leaderboard.slice(0, 5).map((entry, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-4 py-3 text-sm ${
              i < leaderboard.length - 1 ? "border-b border-border/30" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`font-bold text-lg ${medalColors[i] || "text-muted-foreground"}`}>
                {i < 3 ? ["🥇", "🥈", "🥉"][i] : `#${i + 1}`}
              </span>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span className="font-display">{formatDuration(entry.completionTime)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ShoppingCart className="h-3 w-3" />
                {entry.totalPurchases?.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {entry.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}