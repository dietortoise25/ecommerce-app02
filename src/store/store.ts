import { atom } from "jotai";
import { CartItem, User } from "../utils/types";

export const cartAtom = atom<CartItem[]>([]);
export const userAtom = atom<User | null>(null);
