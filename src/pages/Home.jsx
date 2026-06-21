import { useState, useMemo } from "react";
import { useGameState } from "@/lib/useGameState";
import { useTheme } from "@/lib/useTheme";
import { ITEMS } from "@/lib/gameData";
import Header from "@/components/spend/Header";
import StatsPanel from "@/components/spend/StatsPanel";
import SearchFilters from "@/components/spend/SearchFilters";
import ItemCard from "@/components/spend/ItemCard";
import AchievementsPanel from "@/components/spend/AchievementsPanel";
import LeaderboardPanel from "@/components/spend/LeaderboardPanel";
import ToastContainer from "@/components/spend/ToastContainer";
import VictoryOverlay from "@/components/spend/VictoryOverlay";
import ShareButton from "@/components/spend/ShareButton";
import SpendingCharts from "@/components/spend/SpendingCharts";
import CertificateTemplate, { useCertificateGenerator } from "@/components/spend/CertificateGenerator";

export default function Home() {
  const game = useGameState();
  const { theme, toggleTheme } = useTheme();
  const { certRef, downloadCertificate } = useCertificateGenerator();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("price-asc");
  const [showVictory, setShowVictory] = useState(true);

  const filteredItems = useMemo(() => {
    let items = [...ITEMS];

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q));
    }

    if (category !== "All") {
      items = items.filter(i => i.category === category);
    }

    switch (sort) {
      case "price-asc": items.sort((a, b) => a.price - b.price); break;
      case "price-desc": items.sort((a, b) => b.price - a.price); break;
      case "name-asc": items.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "name-desc": items.sort((a, b) => b.name.localeCompare(a.name)); break;
    }

    return items;
  }, [search, category, sort]);

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <Header
          moneyRemaining={game.moneyRemaining}
          theme={theme}
          toggleTheme={toggleTheme}
          soundEnabled={game.soundEnabled}
          toggleSound={game.toggleSound}
          resetGame={game.resetGame}
        />

        <StatsPanel
          moneyRemaining={game.moneyRemaining}
          moneySpent={game.moneySpent}
          totalPurchases={game.totalPurchases}
          achievements={game.achievements}
          getMostExpensiveOwned={game.getMostExpensiveOwned}
        />

        {/* Share row */}
        <div className="px-4 sm:px-6 lg:px-8 mb-4 flex justify-end">
          <ShareButton moneySpent={game.moneySpent} inventory={game.inventory} />
        </div>

        <AchievementsPanel unlockedIds={game.achievements} />

        <LeaderboardPanel leaderboard={game.leaderboard} />

        <SpendingCharts inventory={game.inventory} />

        <SearchFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        {/* Items grid */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredItems.map(item => (
              <ItemCard
                key={item.name}
                item={item}
                owned={game.inventory[item.name] || 0}
                moneyRemaining={game.moneyRemaining}
                onBuy={game.buyItem}
                onSell={game.sellItem}
              />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-sm">No items found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 px-4 sm:px-6 lg:px-8 pb-8 text-center">
          <p className="text-xs text-muted-foreground">
            This is a parody game. Not affiliated with NVIDIA Corporation.
          </p>
        </footer>
      </div>

      {/* Toast notifications */}
      <ToastContainer toasts={game.toasts} />

      {/* Victory overlay */}
      {game.completedAt && showVictory && (
        <VictoryOverlay
          completedAt={game.completedAt}
          startTime={game.startTime}
          totalPurchases={game.totalPurchases}
          achievements={game.achievements}
          inventory={game.inventory}
          onClose={() => setShowVictory(false)}
          onDownloadCertificate={downloadCertificate}
        />
      )}

      {/* Hidden certificate template */}
      <CertificateTemplate certRef={certRef} completedAt={game.completedAt} />
    </div>
  );
}