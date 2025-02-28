import { RouteObject, Navigate } from "react-router-dom";

import RiderProfile from "./pages/rider/Profile";
import RestaurantProfile from "./pages/restaurant/Profile";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import RestaurantDashboard from "./components/dashboard/RestaurantDashboard";
import RiderDashboard from "./components/dashboard/RiderDashboard";
import Home from "./components/home";
import RestaurantDetails from "./components/restaurants/RestaurantDetails";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Partner from "./pages/Partner";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import HowItWorks from "./pages/HowItWorks";
import DeliveryAreas from "./pages/DeliveryAreas";
import FAQ from "./pages/FAQ";
import { useAuth } from "./contexts/AuthContext";

function PrivateRoute({
  children,
  allowedTypes = ["user", "restaurant", "rider", "admin"],
}: {
  children: React.ReactNode;
  allowedTypes?: string[];
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/how-it-works",
    element: <HowItWorks />,
  },
  {
    path: "/delivery-areas",
    element: <DeliveryAreas />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/rider/profile",
    element: (
      <PrivateRoute allowedTypes={["rider"]}>
        <RiderProfile />
      </PrivateRoute>
    ),
  },
  {
    path: "/restaurant/profile",
    element: (
      <PrivateRoute allowedTypes={["restaurant"]}>
        <RestaurantProfile />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/restaurant",
    element: (
      <PrivateRoute allowedTypes={["restaurant"]}>
        <RestaurantDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/rider",
    element: (
      <PrivateRoute allowedTypes={["rider"]}>
        <RiderDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/admin",
    element: (
      <PrivateRoute allowedTypes={["admin"]}>
        <AdminDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/restaurant/:id",
    element: (
      <PrivateRoute>
        <RestaurantDetails />
      </PrivateRoute>
    ),
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/partner",
    element: <Partner />,
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <PrivateRoute>
        <Checkout />
      </PrivateRoute>
    ),
  },
];

export default routes;
