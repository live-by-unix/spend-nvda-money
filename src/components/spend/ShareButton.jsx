import { Share2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ITEMS, formatMoneyFull, INITIAL_MONEY } from "@/lib/gameData";

export default function ShareButton({ moneySpent, inventory }) {
  const [copied, setCopied] = useState(false);

  function generateShareText() {
    const lines = [`💰 I spent ${formatMoneyFull(moneySpent)} of NVIDIA's money!\n`];
    
    const ownedItems = ITEMS
      .filter(item => (inventory[item.name] || 0) > 0)
      .sort((a, b) => b.price - a.price)
      .slice(0, 8);

    if (ownedItems.length > 0) {
      lines.push("Owned:");
      ownedItems.forEach(item => {
        lines.push(`${item.emoji} ${inventory[item.name].toLocaleString()} ${item.name}${inventory[item.name] > 1 ? "s" : ""}`);
      });
    }

    lines.push("\nTry it yourself! 🎮");
    return lines.join("\n");
  }

  async function handleShare() {
    const text = generateShareText();
    
    if (navigator.share) {
      try {
        await navigator.share({ title: "Spend NVIDIA's Money", text });
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      className="border-primary/30 hover:bg-primary/10 text-sm"
      size="sm"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 mr-1.5 text-primary" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5 mr-1.5" />
          Share
        </>
      )}
    </Button>
  );
}