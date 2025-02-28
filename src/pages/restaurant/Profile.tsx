import React from "react";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuManagement } from "@/components/restaurants/MenuManagement";

export default function RestaurantProfile() {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Restaurant Profile Updated",
      description: "Your restaurant profile has been updated successfully!",
      variant: "success",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-[72px] pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-8">Restaurant Profile</h1>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="menu">Menu</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Restaurant Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Restaurant Name
                        </label>
                        <Input defaultValue={user?.displayName || ""} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <Input defaultValue={user?.email || ""} disabled />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone
                        </label>
                        <Input type="tel" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Address
                        </label>
                        <Textarea />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Cuisine Type
                        </label>
                        <Input />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Opening Hours
                        </label>
                        <Input placeholder="e.g., Mon-Sun: 9:00 AM - 10:00 PM" />
                      </div>
                      <Button
                        type="submit"
                        className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                      >
                        Update Profile
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="menu">
                <Card>
                  <CardHeader>
                    <CardTitle>Menu Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MenuManagement />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-600">Total Orders</p>
                          <p className="text-2xl font-bold">1,234</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-600">Revenue</p>
                          <p className="text-2xl font-bold">$15,678</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-600">
                            Average Rating
                          </p>
                          <p className="text-2xl font-bold">4.5</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
