import React from "react";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function Partner() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Received",
      description: "We'll review your application and get back to you soon!",
      variant: "success",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-[72px] pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold mb-4">Partner with Us</h1>
            <p className="text-xl text-gray-600">
              Grow your business with Beg4Burger
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Why Partner with Us?
              </h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">
                      Increased Visibility
                    </h3>
                    <p className="text-gray-600">
                      Reach more customers in your area
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">
                      Efficient Delivery
                    </h3>
                    <p className="text-gray-600">
                      Our reliable delivery network ensures timely service
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">
                      Easy Management
                    </h3>
                    <p className="text-gray-600">
                      Simple tools to manage orders and track performance
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Apply Now</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Restaurant Name
                      </label>
                      <Input required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Contact Person
                      </label>
                      <Input required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input type="email" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone
                      </label>
                      <Input type="tel" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Restaurant Address
                      </label>
                      <Textarea required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Cuisine Type
                      </label>
                      <Input required />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                    >
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
