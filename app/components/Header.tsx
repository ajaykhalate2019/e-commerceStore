'use client';

import Link from 'next/link';
import { Search, ShoppingBag, User, Heart } from 'lucide-react';
import { useCart } from '../context/StoreContext';
import { useWishlist } from '../context/StoreContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCategories } from '../hooks/useCategories';

const Header = () => {
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const router = useRouter();
  const { data: categories } = useCategories();

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-800 tracking-tighter">
              STORE<span className="text-orange-500">.</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center max-w-lg">
            <form onSubmit={handleSearch} className="relative w-full group">
              <input
                type="text"
                placeholder="Search products..."  
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 bg-gray-50 border border-gray-100 text-gray-800 rounded-xl pl-10 pr-4 w-full focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all shadow-sm"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            </form>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-3">
            <button 
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-2 md:hidden hover:bg-gray-50 rounded-full transition-colors text-gray-600"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link href="/wishlist" className="relative p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-600 hover:text-gray-900 group">
              <Heart className="h-5 w-5 transition-transform group-hover:scale-110" />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-md ring-2 ring-white">
                  {totalWishlistItems}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-600 hover:text-gray-900 group">
              <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white shadow-md ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <button className="hidden sm:flex p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-600 hover:text-gray-900">
              <User className="h-5 w-6" />
            </button>
          </div>
        </div>

        {isMobileSearchOpen && (
          <div className="md:hidden pb-4 pt-1 animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearch} className="relative group">
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 bg-gray-50 border border-gray-100 text-gray-800 rounded-xl pl-10 pr-4 w-full focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all shadow-sm"
              />
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
            </form>
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-300 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-10 overflow-x-auto">
            {categories?.slice(0, 3).map((category) => (
              <Link
                key={category}
                href={`/category/${encodeURIComponent(category)}`}
                className="text-[10px] font-bold text-gray-800 hover:text-orange-500 uppercase tracking-[0.2em] transition-colors whitespace-nowrap py-2"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header;
