import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/StoreContext';
import { useWishlist } from '../context/StoreContext';
import { Heart, Star, Share2, X } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  category: string;
  rating?: number;
}

const ProductCard = ({
  id,
  name,
  price,
  thumbnail,
  category,
  rating,
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const isWishlisted = isInWishlist(id);
  const isOdd = parseInt(id) % 2 !== 0;

  const handleAddToWishlist = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({ id, name, price, image: thumbnail, category });
  };

  const handleShare = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShareModalOpen(true);
  };

  const handleSendEmail = (e: any) => {
    e.preventDefault();
    if (email) {
      alert(`Product "${name}" shared successfully with ${email}`);
      setIsShareModalOpen(false);
      setEmail('');
    }
  };

  const handleAddToCart = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image: thumbnail });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <>
      <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-100 p-3 flex flex-col h-full my-2">
        <div className="relative w-full aspect-square flex justify-center items-center bg-gray-200 rounded-xl overflow-hidden mb-3">

          {/* {isOdd && ( */}
            <button
              onClick={handleShare}
              className="absolute top-2 left-2 z-10 bg-white rounded-full p-2 shadow-sm hover:scale-110 transition-transform"
              title="Share Product"
            >
              <Share2 className="w-5 h-5 text-gray-600 hover:text-orange-500 transition-colors" />
            </button>
          {/* )} */}

          <button
            onClick={handleAddToWishlist}
            className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-sm hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isWishlisted
                  ? 'text-red-500 fill-current'
                  : 'text-gray-600 hover:text-red-500'
              }`}
            />
          </button>

          <Link href={`/product/${id}`} className="block h-full w-full relative p-4">
            <Image
              src={thumbnail}
              alt={name}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105 p-3"
            />
          </Link>
        </div>

        <div className="flex flex-col flex-1 px-1">
          <div className="flex justify-between items-start mb-1">
            <p className="text-xs font-medium text-zinc-800 uppercase tracking-wider">
              {category}
            </p>
            <div className="flex items-center text-yellow-500">
              <Star className="w-3 h-3 fill-current" />
              <span className="ml-1 text-xs font-bold text-gray-800">
                {rating}
              </span>
            </div>
          </div>
          <Link href={`/product/${id}`}>
            <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-orange-500 transition-colors">
              {name}
            </h3>
          </Link>
          <div className="flex items-center mb-4 mt-auto">
            <p className="text-base font-bold text-gray-900">
              ${price.toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-auto w-full inline-flex items-center justify-center px-6 py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg active:scale-[0.98]"
          >
            {isAdded ? 'Added' : 'Add'}
          </button>
        </div>
      </div>

      {isShareModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
          onClick={() => setIsShareModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Share Product
              </h2>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <p className="text-gray-600 mb-6 font-medium">
              Enter an email address to share{' '}
              <span className="text-orange-500 font-bold">{name}</span>
            </p>
            <form onSubmit={handleSendEmail} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Enter Email :
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter Email"
                  className="w-full px-5 py-4 text-black bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 shadow-lg flex items-center justify-center"
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;