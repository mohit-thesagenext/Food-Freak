import React, { useState } from "react";
import { useRestaurants } from "@/hooks/useRestaurants";
import { LoadingSpinner } from "../ui/loading";
import { ErrorState } from "../ui/error";
import RestaurantCard from "./RestaurantCard";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  cuisineType: string;
  deliveryTime: string;
  minimumOrder: string;
}

interface RestaurantGridProps {
  restaurants?: Restaurant[];
  onFilterChange?: (filters: any) => void;
  onSortChange?: (sortBy: string) => void;
}

const RestaurantGrid = ({
  restaurants: propRestaurants = [],
  loading: propLoading = false,
  error: propError = null,
  onFilterChange = () => {},
  onSortChange = () => {},
}: RestaurantGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { restaurants: allRestaurants, loading, error } = useRestaurants();
  const filteredRestaurants = allRestaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading || propLoading) return <LoadingSpinner />;
  if (error || propError) return <ErrorState message={error || propError} />;

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <Select defaultValue="rating" onValueChange={onSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating: High to Low</SelectItem>
                <SelectItem value="deliveryTime">Delivery Time</SelectItem>
                <SelectItem value="minimumOrder">Minimum Order</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              image={restaurant.image}
              rating={restaurant.rating}
              cuisineType={restaurant.cuisineType}
              deliveryTime={restaurant.deliveryTime}
              minimumOrder={restaurant.minimumOrder}
            />
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No restaurants found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantGrid;
