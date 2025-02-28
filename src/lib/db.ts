import { supabase } from "./supabase";
import type { Restaurant, Order, MenuItem } from "../types";
import type { Database } from "../types/supabase";

// Restaurant Functions
export async function getRestaurants() {
  const { data, error } = await supabase.from("restaurants").select(`
      *,
      menu_items (*)
    `);

  if (error) throw error;

  return data.map((restaurant) => ({
    id: restaurant.id,
    name: restaurant.name,
    image: restaurant.image,
    rating: restaurant.rating,
    cuisineType: restaurant.cuisine_type,
    deliveryTime: restaurant.delivery_time,
    minimumOrder: restaurant.minimum_order,
    menu: restaurant.menu_items.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      category: item.category,
    })),
  })) as Restaurant[];
}

export async function getRestaurant(id: string) {
  const { data, error } = await supabase
    .from("restaurants")
    .select(
      `
      *,
      menu_items (*)
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Restaurant not found");

  return {
    id: data.id,
    name: data.name,
    image: data.image,
    rating: data.rating,
    cuisineType: data.cuisine_type,
    deliveryTime: data.delivery_time,
    minimumOrder: data.minimum_order,
    menu: data.menu_items.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      category: item.category,
    })),
  } as Restaurant;
}

// Order Functions
export async function createOrder(order: Omit<Order, "id">) {
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id: order.userId,
        restaurant_id: order.restaurantId,
        status: order.status,
        total: order.total,
        delivery_address: order.deliveryAddress,
      },
    ])
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = order.items.map((item) => ({
    order_id: orderData.id,
    menu_item_id: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return orderData.id;
}

export async function getOrders(userId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (*, menu_items (*))
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map((order) => ({
    id: order.id,
    userId: order.user_id,
    restaurantId: order.restaurant_id,
    status: order.status,
    total: order.total,
    deliveryAddress: order.delivery_address,
    createdAt: new Date(order.created_at),
    items: order.order_items.map((item: any) => ({
      id: item.menu_items.id,
      name: item.menu_items.name,
      price: item.price,
      quantity: item.quantity,
    })),
  })) as Order[];
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"],
) {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) throw error;
}
