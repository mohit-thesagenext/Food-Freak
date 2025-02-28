import React from "react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRestaurants } from "@/hooks/useRestaurants";
import { LoadingSpinner } from "../ui/loading";
import { ErrorState } from "../ui/error";

export default function AdminDashboard() {
  const { restaurants, loading, error } = useRestaurants();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen bg-gray-50 pt-[72px]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Total Users</p>
              <AnimatedCounter value={1234} className="text-2xl font-bold" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Active Restaurants</p>
              <AnimatedCounter
                value={restaurants.length}
                className="text-2xl font-bold"
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Active Riders</p>
              <AnimatedCounter value={85} className="text-2xl font-bold" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Today's Orders</p>
              <AnimatedCounter value={256} className="text-2xl font-bold" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="restaurants" className="space-y-6">
          <TabsList>
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="riders">Riders</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="restaurants">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {restaurants.map((restaurant) => (
                    <Card key={restaurant.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-4">
                            <img
                              src={restaurant.image}
                              alt={restaurant.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <p className="font-semibold">{restaurant.name}</p>
                              <p className="text-sm text-gray-600">
                                {restaurant.cuisineType}
                              </p>
                              <Badge variant="outline" className="mt-1">
                                Rating: {restaurant.rating}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-500"
                            >
                              Suspend
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add other tab contents here */}
        </Tabs>
      </div>
    </div>
  );
}
