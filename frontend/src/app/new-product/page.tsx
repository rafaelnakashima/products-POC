"use client";

import ProductForm from "../../components/ProductForm";

export default function NewProductPage() {
  return (
    <div className="container px-4">
      <h2 className="text-2xl md:text-4xl font-semibold mt-4">New Product</h2>
      <div>
        <p className="text-gray-400">Enter the following fields to create a new product:</p>
      </div>
      <ProductForm />
    </div>
  );
}