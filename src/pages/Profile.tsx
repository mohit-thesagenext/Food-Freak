import React, { useState } from "react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrders } from "@/contexts/OrderContext";
import { useAddresses } from "@/hooks/useAddresses";
import { AddressDialog } from "@/components/address/AddressDialog";

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { orders } = useOrders();
  const { addresses, addAddress, updateAddress, deleteAddress } =
    useAddresses();
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);

  const handleAddAddress = async (data: any) => {
    await addAddress(data.label, data.address, data.isDefault);
    setIsAddressDialogOpen(false);
  };

  const handleEditAddress = (address: any) => {
    setEditingAddress(address);
    setIsAddressDialogOpen(true);
  };

  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteAddress = async (id: string) => {
    setAddressToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteAddress = async () => {
    if (addressToDelete) {
      await deleteAddress(addressToDelete);
      setIsDeleteDialogOpen(false);
      toast({
        title: "Address Deleted",
        description: "Your address has been removed successfully",
        variant: "success",
      });
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully!",
      variant: "success",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-[72px] pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Name
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

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
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
                                <p className="text-sm text-gray-600">
                                  {new Date(
                                    order.createdAt,
                                  ).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                  {order.items.length} items · $
                                  {order.total.toFixed(2)}
                                </p>
                              </div>
                              <Badge variant="outline" className="capitalize">
                                {order.status}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Addresses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AddressDialog
                      open={isAddressDialogOpen}
                      onOpenChange={setIsAddressDialogOpen}
                      onSubmit={handleAddAddress}
                    />
                    <Button
                      onClick={() => setIsAddressDialogOpen(true)}
                      className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black mb-4"
                    >
                      Add New Address
                    </Button>
                    <div className="space-y-4">
                      {addresses.map((address) => (
                        <Card key={address.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold">{address.label}</p>
                                <p className="text-sm text-gray-600">
                                  {address.address}
                                </p>
                                {address.isDefault && (
                                  <Badge variant="secondary" className="mt-2">
                                    Default
                                  </Badge>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditAddress(address)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteAddress(address.id)
                                  }
                                >
                                  Delete
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

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>My Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders
                        .filter((order) => order.status === "delivered")
                        .map((order) => (
                          <Card key={order.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-semibold">
                                    Order #{order.id.slice(0, 8)}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {new Date(
                                      order.createdAt,
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    // Open review dialog
                                  }}
                                >
                                  Leave Review
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Address"
        description="Are you sure you want to delete this address? This action cannot be undone."
        confirmText="Delete"
        onConfirm={confirmDeleteAddress}
        variant="destructive"
      />
    </div>
  );
}
