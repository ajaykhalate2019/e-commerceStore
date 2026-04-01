'use client';

import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import Link from 'next/link';
import { useProducts } from '../hooks/useProducts';

const ProductSlide = ({ id, name, description, thumbnail, index }: any) => {
    return (
        <div className="relative h-[400px] md:h-[500px] flex items-center bg-zinc-950">
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                <div className="text-left z-10 flex flex-col items-start justify-center order-2 md:order-1">
                    <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight tracking-tighter max-w-xl">
                        {name}
                    </h3>
                    <div className="text-sm md:text-lg text-neutral-400 mb-8 line-clamp-2 max-w-lg font-medium">
                        {description}
                    </div>
                    <Link href={`/product/${id}`} >
                        <button className="bg-white text-black hover:bg-orange-500 px-8 py-4 text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-xl shadow-xl active:scale-95">
                            Discover Now
                        </button>
                    </Link>
                </div>

                <div className="relative h-40 md:h-full w-full order-1 md:order-2 flex items-center justify-center">
                    <div className="relative w-48 h-48 md:w-80 md:h-80">
                        <Image
                            src={thumbnail}
                            alt={name}
                            fill
                            priority={index === 0}
                            className="object-contain p-4 drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const DisplayCarousel = () => {
    const { data: products } = useProducts();
    console.log(products);
  //  const displayProducts = products?.slice(0, 4);

    return (
        <section className="w-full relative bg-zinc-950 overflow-hidden border-b border-zinc-900">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                interval={3000}
                stopOnHover={true}
                transitionTime={800}
            >
                {products?.slice(0, 3).map((product, index) => (
                    <ProductSlide
                        key={product.id}
                        name={product.title}
                        description={product.description}
                        thumbnail={product.thumbnail}
                        index={index}
                    />
                ))}
            </Carousel>
        </section>
    );
};

export default DisplayCarousel;
