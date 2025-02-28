import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Clock, Star } from "lucide-react";

import { useNavigate } from "react-router-dom";

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  cuisineType: string;
  deliveryTime: string;
  minimumOrder: string;
}

const RestaurantCard = ({
  id = "1",
  name = "Tasty Restaurant",
  image = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  rating = 4.5,
  cuisineType = "International",
  deliveryTime = "25-35 min",
  minimumOrder = "$15",
}: RestaurantCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="w-full max-w-[340px] mx-auto overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white cursor-pointer"
      onClick={() => navigate(`/restaurant/${id}`)}
    >
      <div className="relative h-[180px] w-full">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <Badge
          className="absolute top-4 right-4 bg-white text-black"
          variant="secondary"
        >
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          {rating}
        </Badge>
      </div>

      <CardContent className="pt-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <Badge variant="outline" className="mb-2">
          {cuisineType}
        </Badge>
      </CardContent>

      <CardFooter className="flex justify-between text-sm text-gray-600 border-t pt-4">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {deliveryTime}
        </div>
        <div>Min. order: {minimumOrder}</div>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
