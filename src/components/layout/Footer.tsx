import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-white border-t mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Beg4Burger</h3>
            <p className="text-gray-600">
              Your favorite food delivery platform connecting you with the best
              restaurants in town.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/how-it-works" className="hover:text-[#FFD700]">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/partner" className="hover:text-[#FFD700]">
                  Become a partner
                </Link>
              </li>
              <li>
                <Link to="/delivery-areas" className="hover:text-[#FFD700]">
                  Delivery areas
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#FFD700]">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-600">
              <li>support@beg4burger.com</li>
              <li>1-800-BURGER</li>
              <li>123 Food Street, Foodville</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Beg4Burger. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
