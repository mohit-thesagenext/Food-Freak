import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Search, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { SearchCommand } from "../ui/search-command";
import { useSearch } from "@/hooks/useSearch";
import { SearchOverlay } from "./SearchOverlay";

interface HeaderProps {
  userName?: string;
  cartItemCount?: number;
  onSearchSubmit?: (searchTerm: string) => void;
  onCartClick?: () => void;
  onProfileClick?: () => void;
}

const Header = ({
  userName = "Guest",
  cartItemCount = 0,
  onSearchSubmit = () => {},
  onCartClick = () => {},
  onProfileClick = () => {},
}: HeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { results, search, loading } = useSearch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSelect = (id: string) => {
    const item = results.find((r) => r.id === id);
    if (item?.type === "restaurant") {
      navigate(`/restaurant/${id}`);
    }
    setIsSearchOpen(false);
  };

  return (
    <header className="w-full h-[72px] px-4 md:px-6 flex items-center justify-between fixed top-0 left-0 z-50 bg-white border-b">
      {/* Mobile Search Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsSearchOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>

      <div className="flex items-center">
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold text-[#FFD700] hover:text-[#FFD700]/90 transition-colors"
        >
          B4B
        </Link>
      </div>

      <div className="hidden md:flex items-center max-w-md w-full mx-4">
        <SearchCommand
          items={results.map((item) => ({
            id: item.id,
            name: item.name,
            type: item.type,
          }))}
          onSelect={handleSearchSelect}
        />
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={onCartClick}
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                  alt={userName}
                />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onProfileClick}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/profile?tab=orders")}>
              Orders
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/profile?tab=addresses")}
            >
              Addresses
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await logout();
                navigate("/auth");
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={(term) => {
          search(term);
          if (results.length > 0) {
            handleSearchSelect(results[0].id);
          }
        }}
      />
    </header>
  );
};

export default Header;
