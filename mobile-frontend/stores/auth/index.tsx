import { create } from "zustand";
import createSelectors from "@/utils/createSelectors";

type AuthState = {
  token: string | null;
  status: "logged" | "unlogged" | "loading";
  signIn: (token: string) => void;
  signOut: () => void;
  checkAuth: () => void;
};

const useAuthBase = create<AuthState>((set, get) => ({
  token: null,
  status: "loading",
  signIn: (token) => set({ token, status: "logged" }),
  signOut: () => set({ token: null, status: "unlogged" }),
  checkAuth: () => {
    // Recheck the token
    const token = get().token;
    if (token) {
      set({ status: "logged" });
    } else {
      set({ status: "unlogged" });
    }
  },
}));

export const useAuth = createSelectors(useAuthBase);
