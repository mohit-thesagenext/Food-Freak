import React, { createContext, useContext, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

interface NotificationContextType {
  subscribeToOrderUpdates: (orderId: string) => void;
  unsubscribeFromOrderUpdates: (orderId: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Subscribe to user's notifications channel
    const subscription = supabase
      .channel(`user-${user.uid}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.uid}`,
        },
        (payload) => {
          toast({
            title: payload.new.title,
            description: payload.new.message,
            variant: "info",
          });
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, toast]);

  const subscribeToOrderUpdates = (orderId: string) => {
    supabase
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
          const status = payload.new.status;
          toast({
            title: "Order Update",
            description: `Your order is now ${status}`,
            variant: status === "delivered" ? "success" : "info",
          });
        },
      )
      .subscribe();
  };

  const unsubscribeFromOrderUpdates = (orderId: string) => {
    supabase.removeChannel(`order-${orderId}`);
  };

  return (
    <NotificationContext.Provider
      value={{
        subscribeToOrderUpdates,
        unsubscribeFromOrderUpdates,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
}
