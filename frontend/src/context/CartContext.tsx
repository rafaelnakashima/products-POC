"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";
import Product from "../interfaces/product.interface";

type ContextProps = {
  children: ReactNode;
}

type ContextType = {
  cart: { product: Product; quantity: number }[],
  addToCart: (product: Product, quantity: number) => void,
  removeFromCart: (productId: number) => void,
  total: number;
}

export const CartContext = createContext<ContextType>({} as ContextType);

export const CartProvider = ({ children }: ContextProps) => {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    const existingCartItem = cart.find((item) => item.product.id === product.id);

    if (existingCartItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === product.id
            ? { product, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};