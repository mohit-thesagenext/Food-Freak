import { useState, useEffect } from "react";
import { getRestaurants } from "../lib/db";
import type { Restaurant } from "../types";

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        setLoading(true);
        setError(null);
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch restaurants",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  return { restaurants, loading, error };
}
