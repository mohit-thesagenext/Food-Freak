import React, { useEffect } from "react";
import { useToast } from "./use-toast";

interface GlobalErrorHandlerProps {
  children: React.ReactNode;
}

const GlobalErrorHandler: React.FC<GlobalErrorHandlerProps> = ({
  children,
}) => {
  const { toast } = useToast();

  useEffect(() => {
    // Handler for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      console.error("Unhandled Promise Rejection:", event.reason);

      toast({
        title: "Something went wrong",
        description: event.reason?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    };

    // Handler for uncaught errors
    const handleError = (event: ErrorEvent) => {
      event.preventDefault();
      console.error("Uncaught Error:", event.error || event.message);

      toast({
        title: "Application Error",
        description:
          event.error?.message ||
          event.message ||
          "An unexpected error occurred",
        variant: "destructive",
      });
    };

    // Add event listeners
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleError);

    // Clean up event listeners
    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
      window.removeEventListener("error", handleError);
    };
  }, [toast]);

  return <>{children}</>;
};

export default GlobalErrorHandler;
