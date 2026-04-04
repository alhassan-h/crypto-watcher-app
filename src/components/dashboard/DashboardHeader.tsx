import { Activity } from "lucide-react";
import { motion } from "framer-motion";

const DashboardHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 glow-primary">
          <Activity className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Crypto Watcher Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Real-time crypto alerts and market insights
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gain opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gain" />
        </span>
        Live
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
