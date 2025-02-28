import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import CategorySection from "./home/CategorySection";
import RestaurantGrid from "./restaurants/RestaurantGrid";
import CartDrawer from "./cart/CartDrawer";
import { Footer } from "./layout/Footer";
import { useCart } from "../contexts/CartContext";

interface HomeProps {
  userName?: string;
}

const Home = ({ userName = "Guest User" }: HomeProps) => {
  const navigate = useNavigate();
  const { items, isCartOpen, setIsCartOpen, updateQuantity } = useCart();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (searchTerm: string) => {
    // TODO: Implement search functionality
    console.log("Search term:", searchTerm);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        userName={userName}
        cartItemCount={cartItemCount}
        onSearchSubmit={handleSearchSubmit}
        onCartClick={handleCartClick}
        onProfileClick={handleProfileClick}
      />

      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#FFD700] to-[#FF6B6B] text-white p-8 md:p-12 rounded-b-xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Hungry? We've got you covered
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Order from your favorite restaurants with fast delivery
            </p>
          </div>

          <CategorySection />

          <div className="px-4 md:px-6 py-8">
            <h2 className="text-2xl font-bold mb-6">Featured Restaurants</h2>
            <RestaurantGrid />
          </div>
        </div>
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => {
          navigate("/checkout");
        }}
      />
    </div>
  );
};

export default Home;
