import React, { createContext, useContext, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { createOrder, getOrders } from "../lib/db";
import type { Order, OrderItem } from "../types";
import { useToast } from "../components/ui/use-toast";

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  error: string | null;
  createNewOrder: (
    items: OrderItem[],
    restaurantId: string,
    deliveryAddress: string,
  ) => Promise<string>;
  fetchUserOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const { toast } = useToast();

  const fetchUserOrders = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const userOrders = await getOrders(user.uid);
      setOrders(userOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch orders");
      toast({
        title: "Orders Fetch Failed",
        description: "We couldn't load your orders. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  const createNewOrder = useCallback(
    async (
      items: OrderItem[],
      restaurantId: string,
      deliveryAddress: string,
    ) => {
      if (!user) throw new Error("User must be logged in to create an order");

      try {
        const total = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
        const orderId = await createOrder({
          userId: user.uid,
          restaurantId,
          items,
          status: "pending",
          total,
          createdAt: new Date(),
          deliveryAddress,
        });

        toast({
          title: "Order Created",
          description: "Your order has been placed successfully!",
          variant: "success",
        });

        await fetchUserOrders();
        return orderId;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create order";
        toast({
          title: "Order Creation Failed",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      }
    },
    [user, toast, fetchUserOrders],
  );

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        createNewOrder,
        fetchUserOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
