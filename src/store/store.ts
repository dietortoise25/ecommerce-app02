import { atom } from "jotai";
import { CartItem, User } from "../utils/types";


export const cartAtom = atom<CartItem[]>([]);
export const userAtom = atom<User | null>(null);

// 新增用户操作原子
export const userActionsAtom = atom(
  (get) => get(userAtom),
  async (get, set, action: "login" | "logout" | "update", user?: User) => {
    switch (action) {
      case "login":
        if (user) {
          set(userAtom, user);
          localStorage.setItem('token', user.token || '');
        }
        break;
      case "logout":
        set(userAtom, null);
        localStorage.removeItem('token');
        break;
      case "update":
        if (user) {
          set(userAtom, user);
        }
        break;
    }
  }
);