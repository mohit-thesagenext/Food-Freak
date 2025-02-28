import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useOrderTracking } from "@/hooks/useOrderTracking";
import { LoadingSpinner } from "../ui/loading";
import { ErrorState } from "../ui/error";
import { OrderMap } from "./OrderMap";

interface OrderTrackingDialogProps {
  orderId: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const statusSteps = [
  { status: "pending", label: "Order Placed" },
  { status: "confirmed", label: "Order Confirmed" },
  { status: "preparing", label: "Preparing" },
  { status: "delivering", label: "Out for Delivery" },
  { status: "delivered", label: "Delivered" },
];

export function OrderTrackingDialog({
  orderId,
  open,
  onOpenChange,
}: OrderTrackingDialogProps) {
  const { order, loading, error } = useOrderTracking(orderId);

  const currentStepIndex = order
    ? statusSteps.findIndex((step) => step.status === order.status)
    : 0;

  const progress = ((currentStepIndex + 1) / statusSteps.length) * 100;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} />;
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Track Order #{order.id.slice(0, 8)}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <Progress value={progress} className="mb-8" />

          <div className="space-y-6">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div
                  key={step.status}
                  className={`flex items-center gap-4 ${isCompleted ? "text-black" : "text-gray-400"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${isCurrent ? "bg-[#FFD700]" : isCompleted ? "bg-green-500" : "bg-gray-200"}`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{step.label}</p>
                    {isCurrent && (
                      <p className="text-sm text-gray-500">
                        {getStatusMessage(step.status)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {order.status === "delivering" && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Live Tracking</h3>
              <OrderMap
                deliveryLocation={{
                  lat: 40.7128,
                  lng: -74.006,
                }}
                riderLocation={{
                  lat: 40.7148,
                  lng: -74.004,
                }}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getStatusMessage(status: string) {
  switch (status) {
    case "pending":
      return "Waiting for restaurant to confirm your order";
    case "confirmed":
      return "Restaurant has confirmed your order";
    case "preparing":
      return "Your food is being prepared";
    case "delivering":
      return "Driver is on the way with your order";
    case "delivered":
      return "Order has been delivered";
    default:
      return "";
  }
}
