'use client';

import { useSearchParams } from 'next/navigation';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { data: products, isLoading } = useProducts();

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-black">
        <div className="flex flex-col items-center">
          <p className="mt-4 text-zinc-200 font-medium ">Searching for results...</p>
        </div>
      </div>
    );
  }

  const hasResults = filteredProducts && filteredProducts.length > 0;

  return (
    <div className="bg-white min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {hasResults ? (
          <>
            <div className="mb-10">
              <h1 className="text-2xl font-bold text-gray-900">
                Search results for <span className="text-orange-500">'{query}'</span>
              </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product: any) => (
                <ProductCard
                  key={product.id}
                  id={product.id.toString()}
                  name={product.title}
                  price={product.price}
                  category={product.category}
                  thumbnail={product.thumbnail}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found.</h2>
            <Link
              href="/"
              className="inline-flex items-center text-orange-600 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
