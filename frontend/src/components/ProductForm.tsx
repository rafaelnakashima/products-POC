"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useParams } from 'next/navigation'
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '../lib/queries';

export default function ProductForm() {

  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const [createProduct] = useMutation(CREATE_PRODUCT);

  const params = useParams();

  // Function to fill fields when is update

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!description || !price || !image) {
        alert('fill in all fields')
      } else {
        const { data } = await createProduct({
          variables: {
            input: { description, price: Number(price), image, },
          },
        });
        alert(`produto ${data.createProduct.description} criado`);
        setDescription('');
        setPrice('');
        setImage('');
      }
    } catch (error) {
      console.error('Erro ao criar o produto:', error);
      alert(error)
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="mt-4 md:w-1/3 md:text-2xl mx-2 p-4 border">
      <div className="mb-4">
        <input
          type="text"
          value={description}
          placeholder='Description'
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder='Price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder='image link'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>
      <div className="flex justify-around">
        <button className="bg-orange-400 text-white px-4 py-2 rounded mt-2 mx-2 w-1/3 text-center">
          {params?.id ? 'Edit' : 'Create'}
        </button>
        <Link href="/" className="bg-orange-400 text-white px-4 py-2 rounded mt-2 mx-2 w-1/3 text-center">
          Voltar
        </Link>
      </div>
    </form>
  );

}