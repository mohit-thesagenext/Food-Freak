import { useState, useCallback } from "react";
import { supabase } from "../lib/supabase";

interface SearchResult {
  id: string;
  name: string;
  type: "restaurant" | "dish";
  image?: string;
}

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [restaurantsResponse, menuItemsResponse] = await Promise.all([
        supabase
          .from("restaurants")
          .select("id, name, image")
          .ilike("name", `%${query}%`)
          .limit(5),
        supabase
          .from("menu_items")
          .select("id, name, image")
          .ilike("name", `%${query}%`)
          .limit(5),
      ]);

      if (restaurantsResponse.error) throw restaurantsResponse.error;
      if (menuItemsResponse.error) throw menuItemsResponse.error;

      const restaurants = (restaurantsResponse.data || []).map((r) => ({
        id: r.id,
        name: r.name,
        type: "restaurant" as const,
        image: r.image,
      }));

      const dishes = (menuItemsResponse.data || []).map((d) => ({
        id: d.id,
        name: d.name,
        type: "dish" as const,
        image: d.image,
      }));

      setResults([...restaurants, ...dishes]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, search };
}
