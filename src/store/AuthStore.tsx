import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// TS user
export interface User {
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
      setUser: (user) => set({ user }),

      logout: async () => {
        try {
          await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
        } catch (e) {
          console.error("Erreur lors du logout", e);
        }
        set({ user: null });
      },
    }),
    {
      name: "auth-storage", // clé dans localStorage
    }
  )
);

export default useAuthStore;
