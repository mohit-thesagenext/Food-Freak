import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Facebook, Mail } from "lucide-react";

export function FlippableAuthForm() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    userType: "user",
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const { user, signIn, signUp, resetPassword } = useAuth();
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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setTimeout(() => {
      setIsLogin(!isLogin);
    }, 200); // Half of the flip animation duration
  };

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
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
          variant: "success",
        });
      } else {
        await signUp(
          formData.email,
          formData.password,
          formData.name,
          formData.userType,
        );
        toast({
          title: "Account created!",
          description: "Your account has been successfully created.",
          variant: "success",
        });
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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await resetPassword(forgotEmail);
      toast({
        title: "Password Reset Email Sent",
        description: "Check your email for password reset instructions.",
        variant: "success",
      });
      setShowForgotPassword(false);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to send password reset email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Coming Soon",
      description: `${provider} login will be available soon!`,
      variant: "info",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-12">
      <AnimatePresence mode="wait">
        {showForgotPassword ? (
          <motion.div
            key="forgot-password"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <Card className="shadow-xl border-none">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                  Reset Password
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your email to receive a password reset link
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleForgotPassword}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <LoadingButton
                    type="submit"
                    className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                    isLoading={loading}
                    loadingText="Sending reset link..."
                  >
                    Send Reset Link
                  </LoadingButton>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Back to Login
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="auth-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <div className="perspective">
              <motion.div
                animate={{
                  rotateY: isFlipped ? 180 : 0,
                }}
                transition={{ duration: 0.4 }}
                className="w-full preserve-3d"
              >
                <Card
                  className={`shadow-xl border-none absolute w-full backface-hidden ${isFlipped ? "hidden" : ""}`}
                >
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                      {isLogin ? "Welcome Back" : "Create an Account"}
                    </CardTitle>
                    <CardDescription className="text-center">
                      {isLogin
                        ? "Sign in to your account to continue"
                        : "Fill out the form to get started"}
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      {!isLogin && (
                        <>
                          <div className="space-y-2">
                            <Input
                              placeholder="Name"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              className={
                                formErrors.name ? "border-red-500" : ""
                              }
                            />
                            <FormError message={formErrors.name} />
                          </div>
                          <div className="space-y-2">
                            <select
                              className="w-full rounded-md border border-input bg-background px-3 py-2"
                              value={formData.userType}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  userType: e.target.value,
                                })
                              }
                            >
                              <option value="user">I want to order food</option>
                              <option value="restaurant">
                                I want to register my restaurant
                              </option>
                              <option value="rider">
                                I want to become a delivery partner
                              </option>
                            </select>
                          </div>
                        </>
                      )}
                      <div className="space-y-2">
                        <Input
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className={formErrors.email ? "border-red-500" : ""}
                        />
                        <FormError message={formErrors.email} />
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          className={
                            formErrors.password ? "border-red-500" : ""
                          }
                        />
                        <FormError message={formErrors.password} />
                      </div>
                      {isLogin && (
                        <Button
                          type="button"
                          variant="link"
                          className="p-0 h-auto font-normal text-sm text-right w-full"
                          onClick={() => setShowForgotPassword(true)}
                        >
                          Forgot password?
                        </Button>
                      )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                      <LoadingButton
                        type="submit"
                        className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                        isLoading={loading}
                        loadingText={
                          isLogin ? "Signing in..." : "Creating account..."
                        }
                      >
                        {isLogin ? "Sign In" : "Create Account"}
                      </LoadingButton>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleSocialLogin("Google")}
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Google
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleSocialLogin("Facebook")}
                        >
                          <Facebook className="mr-2 h-4 w-4" />
                          Facebook
                        </Button>
                      </div>

                      <p className="text-center text-sm text-gray-600 mt-2">
                        {isLogin
                          ? "Don't have an account?"
                          : "Already have an account?"}
                        <Button
                          type="button"
                          variant="link"
                          className="p-0 h-auto font-normal"
                          onClick={handleFlip}
                        >
                          {isLogin ? "Sign up" : "Sign in"}
                        </Button>
                      </p>
                    </CardFooter>
                  </form>
                </Card>

                <Card
                  className={`shadow-xl border-none absolute w-full backface-hidden rotateY-180 ${!isFlipped ? "hidden" : ""}`}
                >
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                      {!isLogin ? "Welcome Back" : "Create an Account"}
                    </CardTitle>
                    <CardDescription className="text-center">
                      {!isLogin
                        ? "Sign in to your account to continue"
                        : "Fill out the form to get started"}
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      {isLogin && (
                        <>
                          <div className="space-y-2">
                            <Input
                              placeholder="Name"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              className={
                                formErrors.name ? "border-red-500" : ""
                              }
                            />
                            <FormError message={formErrors.name} />
                          </div>
                          <div className="space-y-2">
                            <select
                              className="w-full rounded-md border border-input bg-background px-3 py-2"
                              value={formData.userType}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  userType: e.target.value,
                                })
                              }
                            >
                              <option value="user">I want to order food</option>
                              <option value="restaurant">
                                I want to register my restaurant
                              </option>
                              <option value="rider">
                                I want to become a delivery partner
                              </option>
                            </select>
                          </div>
                        </>
                      )}
                      <div className="space-y-2">
                        <Input
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className={formErrors.email ? "border-red-500" : ""}
                        />
                        <FormError message={formErrors.email} />
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          className={
                            formErrors.password ? "border-red-500" : ""
                          }
                        />
                        <FormError message={formErrors.password} />
                      </div>
                      {!isLogin && (
                        <Button
                          type="button"
                          variant="link"
                          className="p-0 h-auto font-normal text-sm text-right w-full"
                          onClick={() => setShowForgotPassword(true)}
                        >
                          Forgot password?
                        </Button>
                      )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                      <LoadingButton
                        type="submit"
                        className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                        isLoading={loading}
                        loadingText={
                          !isLogin ? "Signing in..." : "Creating account..."
                        }
                      >
                        {!isLogin ? "Sign In" : "Create Account"}
                      </LoadingButton>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleSocialLogin("Google")}
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Google
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleSocialLogin("Facebook")}
                        >
                          <Facebook className="mr-2 h-4 w-4" />
                          Facebook
                        </Button>
                      </div>

                      <p className="text-center text-sm text-gray-600 mt-2">
                        {!isLogin
                          ? "Don't have an account?"
                          : "Already have an account?"}
                        <Button
                          type="button"
                          variant="link"
                          className="p-0 h-auto font-normal"
                          onClick={handleFlip}
                        >
                          {!isLogin ? "Sign up" : "Sign in"}
                        </Button>
                      </p>
                    </CardFooter>
                  </form>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
