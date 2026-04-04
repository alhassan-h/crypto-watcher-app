import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react";
import { CryptoData } from "@/data/mockCryptoData";
import { formatCurrency, formatMarketCap, formatVolume, formatPercent, formatTimeAgo } from "@/lib/formatters";

type SortKey = keyof CryptoData;
type SortDir = "asc" | "desc";

interface CryptoTableProps {
  data: CryptoData[];
  onCoinClick: (coin: CryptoData) => void;
}

const CryptoTable = ({ data, onCoinClick }: CryptoTableProps) => {
  const [sortKey, setSortKey] = useState<SortKey>("market_cap");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sorted = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    }
    return sortDir === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3 h-3 text-muted-foreground/50" />;
    return sortDir === "asc" ? <ChevronUp className="w-3 h-3 text-primary" /> : <ChevronDown className="w-3 h-3 text-primary" />;
  };

  const columns: { key: SortKey; label: string; align?: string }[] = [
    { key: "coin_name", label: "Coin" },
    { key: "price_usd", label: "Price", align: "text-right" },
    { key: "price_change_24h", label: "24h Change", align: "text-right" },
    { key: "market_cap", label: "Market Cap", align: "text-right" },
    { key: "total_volume", label: "Volume", align: "text-right" },
    { key: "last_updated", label: "Updated", align: "text-right" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl mb-8 overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-border/50">
        <h2 className="text-lg font-semibold text-foreground">Live Market Data</h2>
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-border/30">
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground transition-colors ${col.align || "text-left"}`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label} <SortIcon col={col.key} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((coin, i) => (
              <tr
                key={coin.coin_name}
                onClick={() => onCoinClick(coin)}
                className="border-b border-border/20 hover:bg-secondary/50 cursor-pointer transition-colors"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={coin.coin_logo}
                      alt={coin.coin_name}
                      className="w-8 h-8 rounded-full bg-secondary"
                      onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <span className="font-medium text-foreground">{coin.coin_name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-right font-mono text-sm text-foreground">
                  {formatCurrency(coin.price_usd)}
                </td>
                <td className={`px-5 py-4 text-right font-mono text-sm font-medium ${coin.price_change_24h >= 0 ? "text-gain" : "text-loss"}`}>
                  {formatPercent(coin.price_change_24h)}
                </td>
                <td className="px-5 py-4 text-right font-mono text-sm text-muted-foreground">
                  {formatMarketCap(coin.market_cap)}
                </td>
                <td className="px-5 py-4 text-right font-mono text-sm text-muted-foreground">
                  {formatVolume(coin.total_volume)}
                </td>
                <td className="px-5 py-4 text-right text-sm text-muted-foreground">
                  {formatTimeAgo(coin.last_updated)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default CryptoTable;
