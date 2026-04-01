'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/StoreContext';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty.</h2>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray to-indigo-50 pb-20 pt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Shopping Cart</h1>
            <p className="text-slate-500 mt-1">{totalItems} items in your cart</p>
          </div>
          <Link
            href="/"
            className="hidden sm:inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-gray-200 backdrop-blur-xl border border-white/40 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="relative w-32 h-32 flex-shrink-0 bg-white rounded-2xl border border-slate-100 p-4 flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-2 transition-transform group-hover:scale-105"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{item.name}</h3>
                  <p className="text-xl font-semibold text-slate-700 mb-4">${item.price.toFixed(2)}</p>

                  <div className="flex items-center justify-center sm:justify-start gap-4">
                    <div className="flex items-center bg-slate-100 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-white rounded-lg transition-colors text-slate-600"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-white rounded-lg transition-colors text-slate-600"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <p className="text-lg font-bold text-slate-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="p-8 rounded-[2.5rem] bg-orange-400 text-zinc-900 shadow-2xl sticky top-8">
              <h2 className="text-2xl font-bold mb-8">Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-zinc-900">
                  <p>Subtotal</p>
                  <p className="font-medium text-white">${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-zinc-900">
                  <p>Shipping</p>
                  <p className="font-medium text-white">Free</p>
                </div>
                <div className="flex justify-between text-zinc-900">
                  <p>Value Added Tax</p>
                  <p className="font-medium text-white">$0.00</p>
                </div>
              </div>

              <div className="pt-6 mb-10 border-t border-slate-800 flex justify-between items-end">
                <p className="text-zinc-900">Total Price</p>
                <p className="text-3xl font-bold">${totalPrice.toFixed(2)}</p>
              </div>

              <button className="w-full h-14 rounded-2xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 mb-4 group">
                Checkout
                <ArrowLeft className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
