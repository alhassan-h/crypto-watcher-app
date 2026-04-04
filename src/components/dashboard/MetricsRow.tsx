import { Coins, Bell, TrendingUp, TrendingDown } from "lucide-react";
import MetricCard from "./MetricCard";
import { CryptoData } from "@/data/mockCryptoData";
import { formatPercent } from "@/lib/formatters";

interface MetricsRowProps {
  data: CryptoData[];
}

const MetricsRow = ({ data }: MetricsRowProps) => {
  const alertCount = data.filter(c => Math.abs(c.price_change_24h) >= 5).length;
  const gainer = data.reduce((a, b) => (b.price_change_24h > a.price_change_24h ? b : a));
  const loser = data.reduce((a, b) => (b.price_change_24h < a.price_change_24h ? b : a));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <MetricCard
        title="Coins Monitored"
        value={String(data.length)}
        icon={Coins}
        delay={0}
      />
      <MetricCard
        title="Alerts (24h)"
        value={String(alertCount)}
        subtitle="coins with ≥5% change"
        icon={Bell}
        delay={0.05}
      />
      <MetricCard
        title="Highest Gainer"
        value={gainer.coin_name}
        subtitle={formatPercent(gainer.price_change_24h)}
        icon={TrendingUp}
        variant="gain"
        delay={0.1}
      />
      <MetricCard
        title="Highest Loser"
        value={loser.coin_name}
        subtitle={formatPercent(loser.price_change_24h)}
        icon={TrendingDown}
        variant="loss"
        delay={0.15}
      />
    </div>
  );
};

export default MetricsRow;
