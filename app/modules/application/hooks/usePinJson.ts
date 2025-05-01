// hooks/usePinJson.ts
"use client";

import { useCallback, useState } from "react";

interface PinResponse {
  cid: string;
  url: string;
}

export function usePinJson() {
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<Error | null>(null);

  const pinJson = useCallback(async <T extends object>(data: T) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/pin-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(await res.text());
      return (await res.json()) as PinResponse;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { pinJson, loading, error };
}
