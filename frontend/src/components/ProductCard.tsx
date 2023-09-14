import React from "react";
import Link from "next/link";
import Product from "../interfaces/product.interface";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  return (
    <div key={product.id} className="border borde- p-4 md:m-0 mb-2 relative shadow-xl">
      <div className="grid grid-cols-3 p-2">
        <Image src={product.image} alt={product.description} width={200} height={200} className="col-span-1" />
        <div className="grid justify-between grid-col-1 col-span-2">
          <p
            className="text-xl md:text-lg mt-10 font-bold overflow-hidden"
          >{product.description}</p>
          <p
            className="text-2xl font-bold"
          >{`${product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}</p>
        </div>
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
