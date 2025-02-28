import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

interface AddressDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit: (data: {
    label: string;
    address: string;
    isDefault: boolean;
  }) => Promise<void>;
  defaultValues?: {
    label: string;
    address: string;
    isDefault: boolean;
  };
}

export function AddressDialog({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {
    label: "",
    address: "",
    isDefault: false,
  },
}: AddressDialogProps) {
  const [label, setLabel] = React.useState(defaultValues.label);
  const [address, setAddress] = React.useState(defaultValues.address);
  const [isDefault, setIsDefault] = React.useState(defaultValues.isDefault);
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({ label, address, isDefault });
      onOpenChange?.(false);
      toast({
        title: "Success",
        description: "Address saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save address",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              placeholder="Home, Work, etc."
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              placeholder="Enter your full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="default"
              checked={isDefault}
              onCheckedChange={setIsDefault}
            />
            <Label htmlFor="default">Set as default address</Label>
          </div>
          <LoadingButton
            type="submit"
            className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
            isLoading={loading}
            loadingText="Saving address..."
          >
            Save Address
          </LoadingButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
