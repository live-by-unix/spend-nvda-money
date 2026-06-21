import { useMemo } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ITEMS, INITIAL_MONEY, formatMoney } from "@/lib/gameData";
import { BarChart2 } from "lucide-react";

const COLORS = [
  "#76B900", "#5a8c00", "#99dd22", "#44aa00",
  "#88cc11", "#33990a", "#aad444", "#225500",
  "#bbee33", "#668800", "#3daa10", "#ccff44"
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-lg">
        <p className="font-semibold">{payload[0].name || payload[0].payload.category}</p>
        <p className="text-primary">{formatMoney(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function SpendingCharts({ inventory }) {
  const categoryData = useMemo(() => {
    const map = {};
    ITEMS.forEach(item => {
      const qty = inventory[item.name] || 0;
      if (qty > 0) {
        map[item.category] = (map[item.category] || 0) + item.price * qty;
      }
    });
    return Object.entries(map)
      .map(([category, value]) => ({ category, value }))
      .sort((a, b) => b.value - a.value);
  }, [inventory]);

  const topItems = useMemo(() => {
    return ITEMS
      .filter(item => (inventory[item.name] || 0) > 0)
      .map(item => ({
        name: `${item.emoji} ${item.name}`,
        value: item.price * (inventory[item.name] || 0),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [inventory]);

  const hasSpending = Object.values(inventory).some(v => v > 0);
  if (!hasSpending) return null;

  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <BarChart2 className="h-4 w-4 text-primary" />
        <h2 className="font-heading font-bold text-sm sm:text-base">Spending Breakdown</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie chart — by category */}
        <div className="bg-card/80 glass border border-border/50 rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">By Category</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={2}
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => <span className="text-xs text-foreground">{value}</span>}
                iconSize={8}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart — top items */}
        <div className="bg-card/80 glass border border-border/50 rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Top Purchases</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topItems} layout="vertical" margin={{ left: 8, right: 16 }}>
              <XAxis type="number" tickFormatter={v => formatMoney(v)} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--foreground))" }} width={110} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {topItems.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}