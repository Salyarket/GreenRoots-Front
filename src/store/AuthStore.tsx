import { IProduct } from "@/types/index.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import useCartStore from "./CartStore";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// TS user
interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  token: string;
}

// TS order
export interface Order {
  id: number;
  date: string;
  status: string;
  total: number;
  items: Item[];
}

// order_item
export interface Item {
  id: number;
  product: IProduct | null;
  quantity: number;
  unit_price: number;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}


const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        const tokenValue = normalizeToken(user?.token);
        set({ user: { ...user, token: tokenValue } });
      },
      logout: async () => {
        try {
          await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
        } catch (e) {
          console.error("Erreur lors de la déconnexion", e);
        }
        useCartStore.getState().clearCart();

        set({ user: null });
      },
    }),
    {
      name: "auth-storage", // clé dans localStorage
    }
  )
);
export default useAuthStore;

function normalizeToken(token: unknown): string {
  if (typeof token === "string") {
    return token;
  }
  if (token && typeof token === "object" && "token" in token) {
    const maybeToken = (token as { token?: unknown }).token;
    return typeof maybeToken === "string" ? maybeToken : "";
  }
  return "";
}
