import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Order } from "../types";

export function useOrderTracking(orderId: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select(
            `
            *,
            order_items (*, menu_items (*))
          `,
          )
          .eq("id", orderId)
          .single();

        if (error) throw error;

        setOrder({
          id: data.id,
          userId: data.user_id,
          restaurantId: data.restaurant_id,
          status: data.status,
          total: data.total,
          deliveryAddress: data.delivery_address,
          createdAt: new Date(data.created_at),
          items: data.order_items.map((item: any) => ({
            id: item.menu_items.id,
            name: item.menu_items.name,
            price: item.price,
            quantity: item.quantity,
          })),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch order");
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel(`order-${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          if (order) {
            setOrder({
              ...order,
              status: payload.new.status,
            });
          }
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [orderId]);

  return { order, loading, error };
}
