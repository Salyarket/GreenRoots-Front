import { create } from "zustand";
import { persist } from "zustand/middleware";

// TS user
interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
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
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // clé dans localStorage
    }
  )
);

export default useAuthStore;
