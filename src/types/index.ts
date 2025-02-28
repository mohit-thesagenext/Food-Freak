export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  cuisineType: string;
  deliveryTime: string;
  minimumOrder: string;
  menu: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: OrderItem[];
  status: "pending" | "confirmed" | "preparing" | "delivering" | "delivered";
  total: number;
  createdAt: Date;
  deliveryAddress: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
