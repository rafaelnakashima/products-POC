import React, { useState } from "react";
import Link from "next/link";
import Product from "../interfaces/product.interface";
import Image from "next/image";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {

  const [quantity, setQuantity] = useState<number>(1);

  const { addToCart } = useCart();

  return (
    <div key={product.id} className="border borde- p-4 md:m-0 mb-2 relative shadow-xl">
      <div className="grid grid-cols-3 p-2 h-3/4">
        <Image src={product.image} alt={product.description} width={200} height={200} className="col-span-1" />
        <div className="grid justify-between grid-col-1 col-span-2">
          <p
            className="text-xl md:text-lg mt-10 font-bold overflow-hidden"
          >{product.description}</p>
          <p
            className="text-2xl font-bold"
          >{`${product.price.toLocaleString('us', { style: 'currency', currency: 'USD' })}`}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 justify-end h-1/4">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border rounded-md w-16 p-2"
        />
        <button
          onClick={() => addToCart(product, quantity)}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Buy
        </button>
      </div>
      <div className="absolute top-0 right-12 m-2">
        <Link href={`/${product.id}`}>
          <button className="text-indigo-500 hover:text-indigo-600 border p-2">
            <Image
              src="/edit-icon.svg"
              height={25}
              width={25}
              alt="edit icon"
            />
          </button>
        </Link>
      </div>
      <button
        onClick={() => onDelete(product.id)}
        className="text-red-500 hover:text-red-600 border p-2 absolute top-0 right-0 m-2"
      >
        <Image
          src="/delete-icon.svg"
          height={25}
          width={25}
          alt="delete icon"
        />
      </button>
    </div>
  );
};

export default ProductCard;
