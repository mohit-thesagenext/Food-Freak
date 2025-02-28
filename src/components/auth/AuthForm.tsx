import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { LoadingButton } from "../ui/LoadingButton";
import { Input } from "../ui/input";
import { FormError } from "@/components/ui/FormError";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    userType: "user",
  });

  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      const userType = user.photoURL;
      switch (userType) {
        case "restaurant":
          navigate("/dashboard/restaurant");
          break;
        case "rider":
          navigate("/dashboard/rider");
          break;
        case "admin":
          navigate("/dashboard/admin");
          break;
        default:
          navigate("/home");
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors({});

    // Basic form validation
    const errors: Record<string, string> = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (!isLogin && !formData.name) errors.name = "Name is required";

    if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(
          formData.email,
          formData.password,
          formData.name,
          formData.userType,
        );
      }

      // Get the user type from the form data for new users
      // or from the user's photoURL for existing users
      const userType = isLogin ? user?.photoURL : formData.userType;

      switch (userType) {
        case "restaurant":
          navigate("/dashboard/restaurant");
          break;
        case "rider":
          navigate("/dashboard/rider");
          break;
        case "admin":
          navigate("/dashboard/admin");
          break;
        default:
          navigate("/home");
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description:
          error instanceof Error
            ? error.message
            : "Authentication failed. Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Sign Up"}</CardTitle>
          <CardDescription>
            {isLogin
              ? "Welcome back! Please login to continue."
              : "Create an account to get started."}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={formErrors.name ? "border-red-500" : ""}
                  />
                  <FormError message={formErrors.name} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="userType" className="text-sm font-medium">
                    I want to
                  </label>
                  <select
                    id="userType"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={formData.userType}
                    onChange={(e) =>
                      setFormData({ ...formData, userType: e.target.value })
                    }
                  >
                    <option value="user">Order Food</option>
                    <option value="restaurant">Register My Restaurant</option>
                    <option value="rider">Become a Delivery Partner</option>
                  </select>
                </div>
              </>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={formErrors.email ? "border-red-500" : ""}
              />
              <FormError message={formErrors.email} />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={formErrors.password ? "border-red-500" : ""}
              />
              <FormError message={formErrors.password} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <LoadingButton
              type="submit"
              className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
              isLoading={loading}
              loadingText={isLogin ? "Logging in..." : "Creating account..."}
            >
              {isLogin ? "Login" : "Create Account"}
            </LoadingButton>
            <Button
              type="button"
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
