import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { CryptoData } from "@/data/mockCryptoData";
import { formatCurrency } from "@/lib/formatters";

interface PriceChartProps {
  coin: CryptoData;
}

const PriceChart = ({ coin }: PriceChartProps) => {
  if (!coin.price_history || coin.price_history.length === 0) return null;

  const chartData = coin.price_history.map((price, i) => ({
    time: `${(coin.price_history!.length - i) * 3}h`,
    price,
  })).reverse();

  const isGain = coin.price_change_24h >= 0;
  const strokeColor = isGain ? "hsl(142, 71%, 45%)" : "hsl(0, 72%, 51%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="glass-card rounded-xl p-5 mb-8"
    >
      <h2 className="text-lg font-semibold text-foreground mb-1">
        {coin.coin_name} Price Trend
      </h2>
      <p className="text-xs text-muted-foreground mb-4">Last 24 hours</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
            <XAxis
              dataKey="time"
              stroke="hsl(215, 20%, 55%)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(215, 20%, 55%)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => formatCurrency(v)}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 9%)",
                border: "1px solid hsl(222, 30%, 18%)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "hsl(210, 40%, 96%)",
              }}
              formatter={(value: number) => [formatCurrency(value), "Price"]}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={strokeColor}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: strokeColor, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default PriceChart;
