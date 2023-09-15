"use client";

import { DELETE_PRODUCT, GET_ALL_PRODUCTS } from "../lib/queries";
import ProductCard from "../components/ProductCard";
import Product from "../interfaces/product.interface";
import { useMutation, useQuery } from '@apollo/client';
import Header from "../components/Header";

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
      <Header />
      {loading ? (<div>...Loading</div>) :
        <main className='mt-24 md:mt-28'>
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

