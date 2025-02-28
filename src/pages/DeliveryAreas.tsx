import React from "react";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function DeliveryAreas() {
  const areas = [
    "Downtown",
    "Midtown",
    "Uptown",
    "West End",
    "East Side",
    "North District",
    "South District",
    "Harbor Area",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-[72px] pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold mb-4">Delivery Areas</h1>
            <p className="text-xl text-gray-600">
              Find out if we deliver to your area
            </p>
          </div>

          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Input
                placeholder="Enter your address or zip code"
                className="pr-12"
              />
              <Button
                className="absolute right-0 top-0 h-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                size="icon"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {areas.map((area) => (
              <Card key={area}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{area}</h3>
                  <p className="text-sm text-gray-600">Delivery available</p>
                  <p className="text-sm text-[#FFD700]">20-30 min</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
