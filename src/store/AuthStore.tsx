import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

interface Auth {
  user: User | null;
  isConnected: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<Auth>()(
  persist(
    (set) => ({
      user: null,
      isConnected: false,
      login: async (email: string, password: string) => {
        const fakeUser: User = {
          id: 1,
          email: "test@test.com",
          firstname: "truc",
          lastname: "machin",
          role: "member",
        };
        set({ user: fakeUser, isConnected: true });
      },
      logout: () => set({ user: null, isConnected: false }),
    }),
    {
      name: "auth-storage", // clé dans localStorage
    }
  )
);

export default useAuthStore;
