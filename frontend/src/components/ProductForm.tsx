"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '../lib/queries';
import Product from '../interfaces/product.interface';

interface ProductFormProps {
  product?: Product;
}

const ProductCard: React.FC<ProductFormProps> = ({ product }) => {

  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (params?.id && product) {
      setDescription(product.description)
      setPrice(product.price.toString())
      setImage(product.image)
    }
  }, [params?.id, product])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!description || !price || !image) {
        alert('fill in all fields')
      } else {
        if (params?.id && product) {
          const { data } = await updateProduct({
            variables: {
              id: Number(params.id),
              input: { description, price: Number(price), image, },
            },
          });
          alert(`produto ${data.updateProduct.description} editado`);
          setDescription('');
          setPrice('');
          setImage('');
          router.push('/')
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
          Back
        </Link>
      </div>
    </form>
  );

}

export default ProductCard;