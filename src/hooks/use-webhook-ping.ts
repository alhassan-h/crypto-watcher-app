import { useEffect } from "react";

const WEBHOOK_URL =
  "https://hook.eu1.make.com/30dxqzc1eaysbes9fbbj7y25iamok3ku";

export function useWebhookPing(intervalMs = 30_000) {
  useEffect(() => {
    const ping = () => {
      fetch(WEBHOOK_URL, { method: "GET" }).catch(() => {});
    };

    ping(); // fire immediately on mount
    const id = setInterval(ping, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
}
