import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export interface Address {
  id: string;
  label: string;
  address: string;
  isDefault: boolean;
}

export function useAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    async function fetchAddresses() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("user_addresses")
          .select("*")
          .eq("user_id", user.uid)
          .order("is_default", { ascending: false });

        if (error) throw error;

        setAddresses(
          data.map((addr) => ({
            id: addr.id,
            label: addr.label,
            address: addr.address,
            isDefault: addr.is_default,
          })),
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch addresses",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchAddresses();
  }, [user]);

  const addAddress = async (
    label: string,
    address: string,
    isDefault: boolean = false,
  ) => {
    if (!user) throw new Error("User must be logged in");

    const { data, error } = await supabase
      .from("user_addresses")
      .insert([
        {
          user_id: user.uid,
          label,
          address,
          is_default: isDefault,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    setAddresses((prev) => [
      ...prev,
      {
        id: data.id,
        label: data.label,
        address: data.address,
        isDefault: data.is_default,
      },
    ]);

    return data.id;
  };

  const updateAddress = async (
    id: string,
    updates: Partial<Omit<Address, "id">>,
  ) => {
    const { error } = await supabase
      .from("user_addresses")
      .update({
        label: updates.label,
        address: updates.address,
        is_default: updates.isDefault,
      })
      .eq("id", id);

    if (error) throw error;

    setAddresses((prev) =>
      prev.map((addr) => (addr.id === id ? { ...addr, ...updates } : addr)),
    );
  };

  const deleteAddress = async (id: string) => {
    const { error } = await supabase
      .from("user_addresses")
      .delete()
      .eq("id", id);

    if (error) throw error;

    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  return {
    addresses,
    loading,
    error,
    addAddress,
    updateAddress,
    deleteAddress,
  };
}
