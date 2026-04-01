'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useProduct } from '../../hooks/useProduct';
import { Star, ShoppingCart, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/StoreContext';
import { useWishlist } from '../../context/StoreContext';
import { useState } from 'react';

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data: product, isLoading } = useProduct(id);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = product
    ? isInWishlist(product.id.toString())
    : false;

  const handleAddToWishlist = () => {
    if (!product) return;

    toggleWishlist({
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      category: product.category,
    });
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      image: product.thumbnail,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="mt-4 text-slate-500 font-medium">
          Loading...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Product not found
        </h1>
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
    <div className="min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

          <div className="relative h-full">
            <div className="aspect-square lg:aspect-auto h-full w-full overflow-hidden rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white/40 p-12 shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center">
              <div className="absolute blur-3xl opacity-50"></div>

              <div className="relative w-full h-full">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full pt-6 p-8 rounded-[2rem] bg-white/70 backdrop-blur-xl border shadow-xl">

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">

                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-gray-500 text-white uppercase tracking-[0.2em]">
                  {product.category}
                </span>

                {/* <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1.5 text-xs font-bold text-slate-900">
                    {product.rating.rate}
                  </span>
                  <span className="ml-1 text-xs text-slate-400">
                    ({product.rating.count})
                  </span>
                </div> */}

              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                {product.title}
              </h1>

              <p className="text-4xl font-semibold bg-gray-600 bg-clip-text text-transparent mb-8">
                ${product.price.toFixed(2)}
              </p>

              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-[2] h-14 rounded-2xl border font-semibold hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-3 shadow-lg ${
                  isAdded
                    ? 'border-slate-500 text-slate-700 bg-gray-50 hover:bg-gray-100'
                    : 'border-slate-200 text-slate-500 hover:bg-gray-100'
                }`}
              >
                {isAdded ? (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Bag
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button
                onClick={handleAddToWishlist}
                className={`flex-1 h-14 rounded-2xl border font-semibold transition-all ${
                  isWishlisted
                    ? 'border-slate-500 text-slate-700 bg-gray-50 hover:bg-gray-100'
                    : 'border-slate-200 text-slate-500 hover:bg-gray-100'
                }`}
              >
                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>

            </div>

            {/* Info Section */}
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-slate-200 pt-8">

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Availability
                </h4>
                <p className="text-sm font-medium text-slate-900">
                  In Stock • Ready to ship
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Shipping
                </h4>
                <p className="text-sm font-medium text-slate-900">
                  Free express delivery
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
