'use client';

import React, { useCallback } from 'react';
import ProductCard from "./ProductCard";
import { useProducts } from "../hooks/useProducts";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Product() {
  const { data: products, isLoading, isError } = useProducts();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-red-500 font-bold">
          Failed to load products.
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <main className="container mx-auto px-3 sm:px-6 lg:px-8 py-20">

        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl text-gray-900">
            Recommended For You<span className="text-orange-500">.</span>
          </h1>
        </div>
        <section className="relative">
          <div
            className="overflow-x-auto pb-8"
            ref={emblaRef}
          >
            <div className="flex -ml-4">

              {products?.map((product: any) => (
                <div
                  key={product.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] pl-4"
                >
                  <ProductCard
                    id={product.id.toString()}
                    name={product.title}
                    price={product.price}
                    category={product.category}
                    thumbnail={product.thumbnail}
                    rating={product.rating}
                  />
                </div>
              ))}

            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="hidden md:flex text-orange-500 absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center bg-white border rounded-full shadow"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={scrollNext}
            className="hidden md:flex text-orange-500 absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center bg-white border rounded-full shadow"
          >
            <ChevronRight />
          </button>
        </section>
      </main>
    </div>
  );
}