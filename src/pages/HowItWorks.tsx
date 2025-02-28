import React from "react";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Truck, Clock, Star, Search } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-[#FFD700]" />,
      title: "Browse Restaurants",
      description: "Find your favorite restaurants and cuisines",
    },
    {
      icon: <Star className="w-8 h-8 text-[#FFD700]" />,
      title: "Choose Your Food",
      description: "Select from a wide variety of delicious dishes",
    },
    {
      icon: <Clock className="w-8 h-8 text-[#FFD700]" />,
      title: "Track Your Order",
      description: "Real-time updates on your order status",
    },
    {
      icon: <Truck className="w-8 h-8 text-[#FFD700]" />,
      title: "Fast Delivery",
      description: "Get your food delivered to your doorstep",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-[72px] pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold mb-4">How It Works</h1>
            <p className="text-xl text-gray-600">
              Order your favorite food in just a few steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    {step.icon}
                    <h3 className="text-xl font-semibold mt-4 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-400" />
                  )}
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
