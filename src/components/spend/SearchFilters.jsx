import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES } from "@/lib/gameData";

export default function SearchFilters({ search, setSearch, category, setCategory, sort, setSort }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-4 space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10 bg-card/80 glass border-border/50 h-10 sm:h-11"
        />
      </div>

      {/* Filters row */}
      <div className="flex gap-2">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="flex-1 bg-card/80 glass border-border/50 h-9 text-xs sm:text-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="flex-1 bg-card/80 glass border-border/50 h-9 text-xs sm:text-sm">
            <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low → High</SelectItem>
            <SelectItem value="price-desc">Price: High → Low</SelectItem>
            <SelectItem value="name-asc">Name: A → Z</SelectItem>
            <SelectItem value="name-desc">Name: Z → A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}