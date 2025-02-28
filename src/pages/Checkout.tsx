import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { useOrders } from "@/contexts/OrderContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { createNewOrder } = useOrders();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const address = formData.get("address") as string;

      await createNewOrder(
        items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        "restaurant-id", // You would get this from the cart context or pass it as a prop
        address,
      );

      clearCart();
      navigate("/profile?tab=orders");
      toast({
        title: "Order Placed Successfully!",
        description: "Your delicious food is on its way to being prepared.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Order Failed",
        description:
          "We couldn't process your order. Please check your payment details and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-[72px] pb-12">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Button
              onClick={() => navigate("/")}
              className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
            >
              Browse Restaurants
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-[72px] pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form
                      id="checkout-form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <Input name="name" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <Input name="phone" type="tel" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Delivery Address
                        </label>
                        <Textarea name="address" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Delivery Instructions (Optional)
                        </label>
                        <Textarea
                          name="instructions"
                          placeholder="E.g., Ring doorbell, call upon arrival, etc."
                        />
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              x{item.quantity}
                            </p>
                          </div>
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold">
                          <p>Total</p>
                          <p>${total.toFixed(2)}</p>
                        </div>
                      </div>
                      <LoadingButton
                        type="submit"
                        form="checkout-form"
                        className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                        isLoading={loading}
                        loadingText="Processing order..."
                      >
                        Place Order
                      </LoadingButton>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
