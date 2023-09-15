"use client";

import React from "react";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { PayPalButtons } from "@paypal/react-paypal-js";

const CheckoutPage: React.FC = () => {
  const { cart, removeFromCart, total } = useCart();

  const createOrder = (_data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total.toFixed(2),
          },
        },
      ],
    });
  };

  const onApprove = async (_data: any, actions: any) => {
    const details = await actions.order?.capture();
    console.log(details);
  };

  return (
    <div className="p-4 md:w-2/4 mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="md:text-4xl text-2xl font-semibold mb-4">Checkout</h1>
        <Link
          href="/"
          className="bg-orange-400 text-white px-4 py-2 rounded text-center"
        >
          Voltar
        </Link>
      </div>
      <ul className="space-y-4">
        {cart.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center border p-2 rounded text-lg"
          >
            <div>
              {item.product.description} - Quantity: {item.quantity} - Price: {(item.quantity * item.product.price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </div>
            <button
              onClick={() => removeFromCart(item.product.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Image
                src="/delete-icon.svg"
                height={25}
                width={25}
                alt="delete icon"
              />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 md:text-2xl text-lg font-semibold">
        Total: {total.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
      </div>
      <div className="mt-6">
        <PayPalButtons
          className="px-4 py-2 mx-2 rounded"
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </div>

    </div>
  );
};

export default CheckoutPage;
