"use client";

import { DELETE_PRODUCT, GET_ALL_PRODUCTS } from "../lib/queries";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import Product from "../interfaces/product.interface";
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, Auth } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from 'next/navigation';
import { useCart } from "../context/CartContext";

export const dynamic = "force-dynamic";

export default function Home() {
  const { data, client, loading } = useQuery<{ getAllProducts: Product[] }>(GET_ALL_PRODUCTS);
  const { cart, total } = useCart();

  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [user, setUser] = useState<Auth['currentUser'] | null>(null); // Tipo definido para 'user'

  const router = useRouter();

  const handleDelete = async (id: number) => {
    await deleteProduct({
      variables: {
        id
      },
    });
    client.resetStore()
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {loading ? (<div>...Loading</div>) :
        <main className='m-2'>
          <div className='my-2'>
            {!user ? (
              <div>
                <Link href={'/login'}>
                  <p>login</p>
                </Link>
              </div>) : (
              <div>
                <p>Usuário logado: {user?.email}</p>
                <button onClick={handleLogout}>Log off</button>
              </div>
            )}
            <Link href="/new-product">
              <button className="text-indigo-500 hover:text-indigo-600 border p-2">
                Adicionar novo produto
              </button>
            </Link>
            <Link href="/checkout">
              <button className="text-indigo-500 hover:text-indigo-600 border p-2 mx-2">
                Ir para o checkout ({cart.length} items)
              </button>
            </Link>
            {`Total cart: ${total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}
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
