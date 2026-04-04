import { useState } from "react";
import { mockCryptoData, CryptoData } from "@/data/mockCryptoData";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricsRow from "@/components/dashboard/MetricsRow";
import CryptoTable from "@/components/dashboard/CryptoTable";
import AlertsSection from "@/components/dashboard/AlertsSection";
import PriceChart from "@/components/dashboard/PriceChart";
import CoinDetailModal from "@/components/dashboard/CoinDetailModal";

const Index = () => {
  const [selectedCoin, setSelectedCoin] = useState<CryptoData | null>(null);
  const data = mockCryptoData;

  // Show chart for top gainer by default
  const topGainer = data.reduce((a, b) => (b.price_change_24h > a.price_change_24h ? b : a));

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <DashboardHeader />
      <MetricsRow data={data} />
      <CryptoTable data={data} onCoinClick={setSelectedCoin} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AlertsSection data={data} />
        <PriceChart coin={topGainer} />
      </div>
      <CoinDetailModal
        coin={selectedCoin}
        open={!!selectedCoin}
        onClose={() => setSelectedCoin(null)}
      />
    </div>
  );
};

export default Index;
