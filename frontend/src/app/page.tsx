"use client";

import { useState, useEffect } from 'react';
import { GET_ALL_PRODUCTS } from "../lib/queries";
import Link from "next/link";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import ProductCard from "../components/ProductCard";
import Product from "../interfaces/product.interface";

export const dynamic = "force-dynamic";

export default function Home() {
  const { data, client } = useSuspenseQuery<{ getAllProducts: Product[] }>(GET_ALL_PRODUCTS);

  const [onLoading, setOnLoading] = useState<boolean>(true)

  useEffect(() => {
    client.resetStore()
    setOnLoading(false)
  }, [client]);

  const handleDelete = (id: number) => {
    // Implement delete logic
    console.log(`Delete product with ID ${id}`);
  };

  return (
    <>
      {onLoading ? (<div>...Loading</div>) :
        <main className='m-2'>
          <div className='my-2'>
            <Link href="/new-product">
              <button className="text-indigo-500 hover:text-indigo-600 border p-2">
                Adicinonar novo produto
              </button>
            </Link>
          </div>
          <div className="md:grid grid-cols-4 gap-4 md:mx-20">
            {data?.getAllProducts.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </main>
      }
    </>
  );
}
