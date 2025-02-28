import React from "react";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Card } from "../ui/card";

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategorySectionProps {
  categories?: Category[];
}

const CategorySection = ({
  categories = [
    {
      id: "1",
      name: "Pizza",
      icon: "https://api.dicebear.com/7.x/icons/svg?seed=pizza",
    },
    {
      id: "2",
      name: "Burgers",
      icon: "https://api.dicebear.com/7.x/icons/svg?seed=burger",
    },
    {
      id: "3",
      name: "Sushi",
      icon: "https://api.dicebear.com/7.x/icons/svg?seed=sushi",
    },
    {
      id: "4",
      name: "Mexican",
      icon: "https://api.dicebear.com/7.x/icons/svg?seed=taco",
    },
    {
      id: "5",
      name: "Italian",
      icon: "https://api.dicebear.com/7.x/icons/svg?seed=pasta",
    },
    {
      id: "6",
      name: "Chinese",
      icon: "https://api.dicebear.com/7.x/icons/svg?seed=noodles",
    },
    {
      id: "7",
      name: "Indian",
      icon: "https://api.dicebear.com/7.x/icons/svg?seed=curry",
    },
    {
      id: "8",
      name: "Desserts",
      icon: "https://api.dicebear.com/7.x/icons/svg?seed=cake",
    },
  ],
}: CategorySectionProps) => {
  return (
    <div className="w-full h-[140px] md:h-[160px] bg-white py-4 md:py-6">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 px-4">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Card className="w-[80px] md:w-[100px] h-[80px] md:h-[100px] flex flex-col items-center justify-center cursor-pointer p-2 hover:shadow-md transition-shadow">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-8 h-8 md:w-12 md:h-12 mb-2"
                />
                <span className="text-sm font-medium text-gray-700 text-center">
                  {category.name}
                </span>
              </Card>
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default CategorySection;
