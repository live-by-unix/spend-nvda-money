import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { formatMoneyFull } from "@/lib/gameData";

export default function ItemCard({ item, owned, moneyRemaining, onBuy, onSell }) {
  const [expanded, setExpanded] = useState(false);
  const canAfford = moneyRemaining >= item.price;
  const maxBuyable = Math.floor(moneyRemaining / item.price);

  const buyAmounts = [
    { label: "1", qty: 1 },
    { label: "10", qty: 10 },
    { label: "100", qty: 100 },
    { label: "Max", qty: maxBuyable },
  ];

  const sellAmounts = [
    { label: "1", qty: 1 },
    { label: "10", qty: 10 },
    { label: "100", qty: 100 },
    { label: "All", qty: owned },
  ];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`group bg-card/80 glass border rounded-xl overflow-hidden transition-all duration-300 hover:nvidia-glow ${
        !canAfford && owned === 0 ? "opacity-50 border-border/30" : "border-border/50"
      }`}
    >
      {/* Main content */}
      <div
        className="p-3 sm:p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl sm:text-3xl flex-shrink-0 float">{item.emoji}</span>
            <div className="min-w-0">
              <h3 className="font-heading font-semibold text-sm sm:text-base truncate">{item.name}</h3>
              <p className="font-display text-xs sm:text-sm text-primary font-medium">
                {formatMoneyFull(item.price)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {owned > 0 && (
              <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-lg font-display">
                ×{owned.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Quick buy/sell buttons */}
        <div className="flex gap-1.5 mt-3">
          <Button
            size="sm"
            className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!canAfford}
            onClick={(e) => { e.stopPropagation(); onBuy(item.name, 1); }}
          >
            <Plus className="h-3 w-3 mr-1" />
            Buy
          </Button>
          {owned > 0 && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-8 text-xs"
              onClick={(e) => { e.stopPropagation(); onSell(item.name, 1); }}
            >
              <Minus className="h-3 w-3 mr-1" />
              Sell
            </Button>
          )}
        </div>
      </div>

      {/* Expanded buy/sell options */}
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-border/50 px-3 sm:px-4 py-3 bg-muted/30"
        >
          <div className="space-y-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">Buy</p>
              <div className="grid grid-cols-4 gap-1">
                {buyAmounts.map(({ label, qty }) => (
                  <Button
                    key={`buy-${label}`}
                    size="sm"
                    className="h-7 text-[10px] sm:text-xs bg-primary/90 hover:bg-primary text-primary-foreground"
                    disabled={qty <= 0 || !canAfford}
                    onClick={() => onBuy(item.name, qty)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
            {owned > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">Sell</p>
                <div className="grid grid-cols-4 gap-1">
                  {sellAmounts.map(({ label, qty }) => (
                    <Button
                      key={`sell-${label}`}
                      size="sm"
                      variant="outline"
                      className="h-7 text-[10px] sm:text-xs"
                      disabled={qty <= 0 || qty > owned}
                      onClick={() => onSell(item.name, Math.min(qty, owned))}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}