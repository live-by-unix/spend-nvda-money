import { Sun, Moon, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import MoneyCounter from "./MoneyCounter";
import { INITIAL_MONEY, formatMoney } from "@/lib/gameData";

export default function Header({ moneyRemaining, theme, toggleTheme, soundEnabled, toggleSound, resetGame }) {
  const spent = INITIAL_MONEY - moneyRemaining;
  const pct = ((spent / INITIAL_MONEY) * 100).toFixed(2);

  return (
    <header className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center nvidia-glow">
              <span className="text-primary-foreground font-bold text-sm sm:text-base">N</span>
            </div>
            <span className="font-heading font-bold text-lg sm:text-xl tracking-tight">SPEND</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" onClick={toggleSound} className="h-8 w-8 sm:h-9 sm:w-9">
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8 sm:h-9 sm:w-9">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={resetGame} className="h-8 w-8 sm:h-9 sm:w-9 text-destructive hover:text-destructive">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Title section */}
        <div className="text-center mb-6">
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-2">
            Spend <span className="text-primary">NVIDIA's</span> Money
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
            NVIDIA is worth <span className="font-semibold text-foreground">$4.5 Trillion</span>. Spend every last dollar.
          </p>
        </div>

        {/* Money counter */}
        <div className="text-center mb-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-medium">Money Remaining</p>
          <MoneyCounter amount={moneyRemaining} />
        </div>

        {/* Progress bar */}
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>{formatMoney(spent)} spent</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 sm:h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}