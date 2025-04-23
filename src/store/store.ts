import { atom } from "jotai";
import { CartItem, User } from "../utils/types";
import { atomWithStorage } from "jotai/utils";

export const cartAtom = atom<CartItem[]>([]);
export const userAtom = atomWithStorage<User | null>("user", null);

// 新增用户操作原子
export const userActionsAtom = atom(
  (get) => get(userAtom),
  async (get, set, action: "login" | "logout" | "update", user?: User) => {
    switch (action) {
      case "login":
        if (user) set(userAtom, user); // atomWithStorage 会自动同步到 localStorage
        break;
      case "logout":
        set(userAtom, null); // 自动清除 localStorage
        break;
      case "update":
        if (user) set(userAtom, user);
        break;
    }
  }
);
