import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CryptoData } from "@/data/mockCryptoData";
import { formatCurrency, formatMarketCap, formatVolume, formatPercent, formatTimeAgo } from "@/lib/formatters";
import PriceChart from "./PriceChart";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CoinDetailModalProps {
  coin: CryptoData | null;
  open: boolean;
  onClose: () => void;
}

const CoinDetailModal = ({ coin, open, onClose }: CoinDetailModalProps) => {
  if (!coin) return null;

  const isGain = coin.price_change_24h >= 0;

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="sm:max-w-lg glass-card border-border/50 bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <img
              src={coin.coin_logo}
              alt={coin.coin_name}
              className="w-10 h-10 rounded-full bg-secondary"
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div>
              <span className="text-foreground">{coin.coin_name}</span>
              <div className={`flex items-center gap-1 text-sm font-mono font-medium ${isGain ? "text-gain" : "text-loss"}`}>
                {isGain ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {formatPercent(coin.price_change_24h)}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Price", value: formatCurrency(coin.price_usd) },
              { label: "Market Cap", value: formatMarketCap(coin.market_cap) },
              { label: "24h Volume", value: formatVolume(coin.total_volume) },
              { label: "Last Updated", value: formatTimeAgo(coin.last_updated) },
            ].map(item => (
              <div key={item.label} className="bg-secondary/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                <p className="font-mono text-sm font-medium text-foreground">{item.value}</p>
              </div>
            ))}
          </div>

          {coin.price_history && coin.price_history.length > 0 && (
            <PriceChart coin={coin} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoinDetailModal;
