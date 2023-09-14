"use client";

import { DELETE_PRODUCT, GET_ALL_PRODUCTS } from "../lib/queries";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import Product from "../interfaces/product.interface";
import { useMutation, useQuery } from '@apollo/client';

export const dynamic = "force-dynamic";

export default function Home() {
  const { data, client, loading } = useQuery<{ getAllProducts: Product[] }>(GET_ALL_PRODUCTS);

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const handleDelete = async (id: number) => {
    await deleteProduct({
      variables: {
        id
      },
    });
    client.resetStore()
  };

  return (
    <>
      {loading ? (<div>...Loading</div>) :
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
