import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Plus, Clock, Star } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../ui/use-toast";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface RestaurantDetailsProps {
  name?: string;
  image?: string;
  rating?: number;
  cuisineType?: string;
  deliveryTime?: string;
  minimumOrder?: string;
  menu?: MenuItem[];
  onAddToCart?: (item: MenuItem) => void;
}

import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../ui/loading";
import { ErrorState } from "../ui/error";
import { useRestaurant } from "../../hooks/useRestaurant";

const RestaurantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { restaurant, loading, error } = useRestaurant(id!);
  const { addItem } = useCart();
  const { toast } = useToast();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !restaurant) {
    return <ErrorState message={error || "Restaurant not found"} />;
  }

  const { name, image, rating, cuisineType, deliveryTime, minimumOrder, menu } =
    restaurant;

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
      duration: 2000,
      variant: "success",
    });
  };
  return (
    <div className="min-h-screen bg-gray-50 pt-[72px]">
      <div className="h-[300px] relative">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-4xl font-bold mb-2">{name}</h1>
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <Badge className="bg-white text-black">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              {rating}
            </Badge>
            <Badge variant="outline" className="text-white border-white">
              {cuisineType}
            </Badge>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {deliveryTime}
            </div>
            <div>Min. order: {minimumOrder}</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <ScrollArea className="h-[calc(100vh-450px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menu.map((item) => (
              <Card
                key={item.id}
                className="flex flex-col sm:flex-row p-4 gap-4"
              >
                <div className="w-full sm:w-24 h-48 sm:h-24 mb-4 sm:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      ${item.price.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                      className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default RestaurantDetails;
