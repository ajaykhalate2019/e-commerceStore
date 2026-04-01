'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '../context/StoreContext';
import { useCart } from '../context/StoreContext';
import { ShoppingBag, ArrowLeft, Heart, Star } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Your wishlist is empty
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 pb-20 pt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
              My Wishlist
            </h1>
            <p className="text-slate-500 mt-1">
              {wishlist.length} items saved
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {wishlist.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col relative"
            >
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-4 right-4 z-10 transition-transform hover:scale-110"
              >
                <Heart className="w-6 h-6 text-[#c0392b] fill-current" />
              </button>

              {/* Image */}
              <div className="relative aspect-square mb-4 flex items-center justify-center p-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-[#1a3a5a] mb-2 line-clamp-1">
                  {item.name}
                </h3>

                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-[#1a3a5a] font-bold text-lg">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-auto w-full inline-flex items-center justify-center px-6 py-4 bg-orange-500 text-white rounded-2xl font-bold transition-all shadow-lg active:scale-[0.98]"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}