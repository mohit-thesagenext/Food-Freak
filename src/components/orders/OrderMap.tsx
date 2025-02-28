import React from "react";
import { Card } from "../ui/card";

interface OrderMapProps {
  deliveryLocation: {
    lat: number;
    lng: number;
  };
  riderLocation?: {
    lat: number;
    lng: number;
  };
}

export function OrderMap({ deliveryLocation, riderLocation }: OrderMapProps) {
  React.useEffect(() => {
    // Initialize map
    // Note: In a real application, you would use a mapping service like Google Maps
    const mapElement = document.getElementById("order-map");
    if (mapElement) {
      mapElement.innerHTML = `
        <div class="flex items-center justify-center h-full bg-gray-100 rounded-lg">
          <p class="text-gray-500">Map View</p>
        </div>
      `;
    }
  }, [deliveryLocation, riderLocation]);

  return (
    <Card className="w-full h-[300px]" id="order-map">
      {/* Map will be rendered here */}
    </Card>
  );
}
