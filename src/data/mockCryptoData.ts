export interface CryptoData {
  coin_name: string;
  price_usd: number;
  price_change_24h: number;
  market_cap: number;
  total_volume: number;
  last_updated: string;
  coin_logo: string;
  price_history?: number[];
}

const now = new Date();
const makeDate = (minutesAgo: number) =>
  new Date(now.getTime() - minutesAgo * 60000).toISOString();

export const mockCryptoData: CryptoData[] = [
  {
    coin_name: "Bitcoin",
    price_usd: 67432.18,
    price_change_24h: 2.34,
    market_cap: 1324000000000,
    total_volume: 28500000000,
    last_updated: makeDate(2),
    coin_logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    price_history: [64200, 64800, 65100, 65900, 66200, 66800, 67100, 67432],
  },
  {
    coin_name: "Ethereum",
    price_usd: 3521.47,
    price_change_24h: -1.82,
    market_cap: 423000000000,
    total_volume: 15200000000,
    last_updated: makeDate(3),
    coin_logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    price_history: [3600, 3580, 3560, 3540, 3530, 3525, 3520, 3521],
  },
  {
    coin_name: "Solana",
    price_usd: 172.34,
    price_change_24h: 8.91,
    market_cap: 76800000000,
    total_volume: 3400000000,
    last_updated: makeDate(1),
    coin_logo: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    price_history: [155, 158, 160, 163, 165, 168, 170, 172],
  },
  {
    coin_name: "BNB",
    price_usd: 584.23,
    price_change_24h: 0.45,
    market_cap: 89400000000,
    total_volume: 1800000000,
    last_updated: makeDate(5),
    coin_logo: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    price_history: [580, 581, 582, 583, 583, 584, 584, 584],
  },
  {
    coin_name: "XRP",
    price_usd: 0.5234,
    price_change_24h: -6.12,
    market_cap: 28900000000,
    total_volume: 1200000000,
    last_updated: makeDate(4),
    coin_logo: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    price_history: [0.56, 0.555, 0.55, 0.545, 0.54, 0.535, 0.528, 0.523],
  },
  {
    coin_name: "Cardano",
    price_usd: 0.4521,
    price_change_24h: -3.21,
    market_cap: 15900000000,
    total_volume: 420000000,
    last_updated: makeDate(6),
    coin_logo: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    price_history: [0.47, 0.468, 0.465, 0.46, 0.458, 0.455, 0.453, 0.452],
  },
  {
    coin_name: "Dogecoin",
    price_usd: 0.1523,
    price_change_24h: 12.45,
    market_cap: 21700000000,
    total_volume: 2100000000,
    last_updated: makeDate(1),
    coin_logo: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    price_history: [0.132, 0.135, 0.138, 0.142, 0.145, 0.148, 0.15, 0.152],
  },
  {
    coin_name: "Avalanche",
    price_usd: 35.67,
    price_change_24h: 5.78,
    market_cap: 13200000000,
    total_volume: 680000000,
    last_updated: makeDate(2),
    coin_logo: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
    price_history: [33, 33.5, 33.8, 34.2, 34.5, 35, 35.3, 35.67],
  },
  {
    coin_name: "Polkadot",
    price_usd: 7.12,
    price_change_24h: -7.89,
    market_cap: 9800000000,
    total_volume: 320000000,
    last_updated: makeDate(3),
    coin_logo: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    price_history: [7.8, 7.7, 7.6, 7.5, 7.4, 7.3, 7.2, 7.12],
  },
  {
    coin_name: "Chainlink",
    price_usd: 14.89,
    price_change_24h: 1.23,
    market_cap: 8700000000,
    total_volume: 450000000,
    last_updated: makeDate(4),
    coin_logo: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    price_history: [14.5, 14.55, 14.6, 14.65, 14.7, 14.75, 14.8, 14.89],
  },
];
