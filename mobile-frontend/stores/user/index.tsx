import { create } from "zustand";
import { type User } from "@/constants/User";
import createSelectors from "@/utils/createSelectors";

type UserStore = {
  user: User | null,
  setUser: (user: User) => void,
}

const useUserBase = create<UserStore>((set, get) => ({
  user: null,
  setUser: (user) => set({user})
}))

export const useUser = createSelectors(useUserBase);