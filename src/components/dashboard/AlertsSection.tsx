import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { CryptoData } from "@/data/mockCryptoData";
import { formatCurrency, formatMarketCap, formatPercent, formatTimeAgo } from "@/lib/formatters";

interface AlertsSectionProps {
  data: CryptoData[];
}

const AlertsSection = ({ data }: AlertsSectionProps) => {
  const alerts = data.filter(c => Math.abs(c.price_change_24h) >= 5);

  if (alerts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Market Alerts</h2>
        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
          {alerts.length}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {alerts.map((coin, i) => {
          const isGain = coin.price_change_24h >= 0;
          return (
            <motion.div
              key={coin.coin_name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              className={`rounded-xl p-4 glass-card ${isGain ? "border-gain/30 glow-gain" : "border-loss/30 glow-loss"}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={coin.coin_logo}
                    alt={coin.coin_name}
                    className="w-8 h-8 rounded-full bg-secondary"
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <span className="font-semibold text-foreground">{coin.coin_name}</span>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold ${isGain ? "bg-gain-bg text-gain" : "bg-loss-bg text-loss"}`}>
                  {isGain ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {formatPercent(coin.price_change_24h)}
                </div>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-mono text-foreground">{formatCurrency(coin.price_usd)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="font-mono text-muted-foreground">{formatMarketCap(coin.market_cap)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated</span>
                  <span className="text-muted-foreground">{formatTimeAgo(coin.last_updated)}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AlertsSection;
