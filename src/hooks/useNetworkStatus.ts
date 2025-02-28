import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "You are back online",
        description: "Your connection has been restored.",
        variant: "success",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You are offline",
        description: "Please check your internet connection.",
        variant: "warning",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [toast]);

  return isOnline;
}
