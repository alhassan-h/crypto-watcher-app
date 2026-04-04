import { useQuery } from "@tanstack/react-query";
import { CryptoData } from "@/data/mockCryptoData";

const API_URL =
  "https://opensheet.elk.sh/1uj2GEDCwbR3PROLcfmE4bexnj3bJG6LbP7H1oUQV7Ok/Sheet1";

interface ApiCoin {
  id: string;
  symbol: string;
  name: string;
  current_price: string;
  market_cap: string;
  total_volume: string;
  price_change_percentage_24h: string;
  last_updated: string;
  last_alert_time: string;
}

function mapApiToCryptoData(item: ApiCoin): CryptoData {
  return {
    coin_name: item.name,
    price_usd: parseFloat(item.current_price) || 0,
    price_change_24h: parseFloat(item.price_change_percentage_24h) || 0,
    market_cap: parseFloat(item.market_cap) || 0,
    total_volume: parseFloat(item.total_volume) || 0,
    last_updated: item.last_updated,
    coin_logo: `https://assets.coingecko.com/coins/images/1/large/${item.id}.png`,
  };
}

async function fetchCryptoData(): Promise<CryptoData[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch crypto data");
  const json: ApiCoin[] = await res.json();
  return json.map(mapApiToCryptoData);
}

export function useCryptoData() {
  return useQuery({
    queryKey: ["crypto-data"],
    queryFn: fetchCryptoData,
    refetchInterval: 10_000,
  });
}
