export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  username: string;
  token: string;
}
