import React from "react";
import { Button } from "../ui/button";
import { LoadingButton } from "../ui/LoadingButton";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useToast } from "../ui/use-toast";

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function PaymentForm({ amount, onSuccess, onError }: PaymentFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulated payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Payment Successful",
        description: `Payment of $${amount.toFixed(2)} has been processed successfully.`,
        variant: "success",
      });

      onSuccess();
    } catch (error) {
      onError(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Card Number
            </label>
            <Input
              required
              placeholder="1234 5678 9012 3456"
              pattern="[0-9]{16}"
              maxLength={16}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Expiry Date
              </label>
              <Input
                required
                placeholder="MM/YY"
                pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                maxLength={5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CVV</label>
              <Input
                required
                type="password"
                placeholder="123"
                pattern="[0-9]{3,4}"
                maxLength={4}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Cardholder Name
            </label>
            <Input required placeholder="John Doe" />
          </div>
          <LoadingButton
            type="submit"
            className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
            isLoading={loading}
            loadingText="Processing payment..."
          >
            Pay ${amount.toFixed(2)}
          </LoadingButton>
        </form>
      </CardContent>
    </Card>
  );
}
