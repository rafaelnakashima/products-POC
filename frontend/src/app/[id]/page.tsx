"use client";

import { useLazyQuery, useQuery } from "@apollo/client";
import ProductForm from "../../components/ProductForm";
import Product from "../../interfaces/product.interface";
import { GET_PRODUCT_BY_ID } from "../../lib/queries";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function NewProductPage() {
  const params = useParams();

  const [getProduct, { data, loading }] = useLazyQuery<{ getProductById: Product }>(GET_PRODUCT_BY_ID);

  useEffect(() => {
    if (params.id) {
      getProduct({ variables: { id: Number(params.id) } });
    }
  }, [getProduct, params.id]);

  const product = data?.getProductById;

  return (
    <div className="container px-4">
      <h2 className="text-2xl md:text-4xl font-semibold mt-4">Edit Product</h2>
      <div>
        <p className="text-gray-400">Enter the following fields to edit the product:</p>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductForm product={product} />
      )}
    </div>
  );
}