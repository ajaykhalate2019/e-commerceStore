'use client';

import { useParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {useProductsByCategory } from '../../hooks/useProductsByCategory';

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const categoryName = slug ? decodeURIComponent(slug) : '';

  const { data: products, isLoading, isError } = useProductsByCategory(categoryName);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-gray-50 border-t-orange-500"></div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading...</p>
      </div>
    </div>
  );

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to load products.</h2>
        <Link
          href="/"
          className="inline-flex items-center text-orange-600 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 pb-20 pt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Shop
          </Link>

          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 capitalize leading-tight">
              {categoryName}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id.toString()}
              name={product.title}
              price={product.price}
              category={product.category}
              thumbnail={product.thumbnail}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
