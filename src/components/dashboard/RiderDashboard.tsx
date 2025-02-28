import React from "react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useOrders } from "@/contexts/OrderContext";
import { useRouteOptimization } from "@/hooks/useRouteOptimization";
import { LoadingSpinner } from "../ui/loading";
import { ErrorState } from "../ui/error";
import { OrderMap } from "../orders/OrderMap";

export default function RiderDashboard() {
  const { orders } = useOrders();
  const { optimizeRoute, loading: optimizing } = useRouteOptimization();
  const [isOnline, setIsOnline] = React.useState(true);
  const [currentLocation, setCurrentLocation] = React.useState({
    lat: 40.7128,
    lng: -74.006,
  });

  const handleOptimizeRoute = async () => {
    const pickupLocations = orders
      .filter((order) => order.status === "confirmed")
      .map((order) => ({
        lat: Math.random() * 0.01 + 40.7128, // Simulated locations
        lng: Math.random() * 0.01 - 74.006,
      }));

    const optimizedRoute = await optimizeRoute(
      pickupLocations,
      currentLocation,
    );
    console.log("Optimized route:", optimizedRoute);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[72px]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Rider Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {isOnline ? "Online" : "Offline"}
            </span>
            <Switch checked={isOnline} onCheckedChange={setIsOnline} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Today's Earnings</p>
              <AnimatedCounter
                value={120}
                prefix="$"
                className="text-2xl font-bold"
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Deliveries Completed</p>
              <AnimatedCounter value={8} className="text-2xl font-bold" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Average Rating</p>
              <AnimatedCounter
                value={4.8}
                duration={0.5}
                className="text-2xl font-bold"
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Available Orders</CardTitle>
                <Button
                  onClick={handleOptimizeRoute}
                  disabled={optimizing}
                  className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                >
                  {optimizing ? "Optimizing..." : "Optimize Route"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">
                            Order #{order.id.slice(0, 8)}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            {order.deliveryAddress}
                          </p>
                          <Badge variant="outline">
                            {order.items.length} items
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ${order.total.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">2.5 km</p>
                          <Button
                            size="sm"
                            className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                          >
                            Accept Delivery
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Map</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderMap
                deliveryLocation={currentLocation}
                riderLocation={currentLocation}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
