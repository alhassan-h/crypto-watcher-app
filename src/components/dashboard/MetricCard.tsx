import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "gain" | "loss";
  delay?: number;
}

const MetricCard = ({ title, value, subtitle, icon: Icon, variant = "default", delay = 0 }: MetricCardProps) => {
  const variantStyles = {
    default: "glass-card glow-primary",
    gain: "glass-card glow-gain border-gain/20",
    loss: "glass-card glow-loss border-loss/20",
  };

  const iconStyles = {
    default: "text-primary bg-primary/10",
    gain: "text-gain bg-gain-bg",
    loss: "text-loss bg-loss-bg",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`rounded-xl p-5 ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <p className="text-2xl font-bold font-mono text-foreground">{value}</p>
          {subtitle && (
            <p className={`text-xs font-medium ${variant === "gain" ? "text-gain" : variant === "loss" ? "text-loss" : "text-muted-foreground"}`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-2 rounded-lg ${iconStyles[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
