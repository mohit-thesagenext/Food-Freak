import { useState, useEffect } from "react";
import { getRestaurant } from "../lib/db";
import type { Restaurant } from "../types";

export function useRestaurant(id: string) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRestaurant(id);
        setRestaurant(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch restaurant",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  return { restaurant, loading, error };
}
