"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";

function subscribe(): () => void {
  return () => {};
}

function getIsProductionClient(): boolean {
  if (typeof window === "undefined") return false;
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname.endsWith(".local");

  return process.env.NODE_ENV === "production" && !isLocalhost;
}

export function AnalyticsProvider(): ReactNode {
  const shouldLoad = useSyncExternalStore(
    subscribe,
    getIsProductionClient,
    () => false
  );

  useEffect(() => {
    // Intercept and silence ad-blocker rejection logs from polluting the console
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      const msg = typeof args[0] === "string" ? args[0] : "";
      if (
        msg.includes("[Vercel Web Analytics]") ||
        msg.includes("[Vercel Speed Insights]")
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      <Analytics
        debug={false}
        scriptSrc="/_telemetry/insights/script.js"
        beforeSend={(event) => {
          return event;
        }}
      />
      <SpeedInsights
        debug={false}
        scriptSrc="/_telemetry/speed/script.js"
      />
    </>
  );
}
