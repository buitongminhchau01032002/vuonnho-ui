import { useRef, useState } from 'react';
import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import ProductCard from '../ProductCard';

export default function SlideDesktop({ products }) {
    const swiperRef = useRef(null);
    const [slideState, setSlideState] = useState({
        isBeginning: true,
        isEnd: false,
    });

    const [hasSwiper, setHasSwiper] = useState(false);

    return (
        <div
            className={clsx('relative sm:hidden', {
                'opacity-0': !hasSwiper,
            })}
        >
            <Swiper
                ref={swiperRef}
                slidesPerView={3}
                spaceBetween={28}
                breakpoints={{
                    // >=1280px
                    1280: {
                        slidesPerView: 4,
                    },
                }}
                onAfterInit={({ isBeginning, isEnd }) => {
                    setSlideState({ isBeginning, isEnd });
                    setHasSwiper(true);
                }}
                onSlideChange={({ isBeginning, isEnd }) => {
                    setSlideState({ isBeginning, isEnd });
                }}
            >
                {products &&
                    products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
            </Swiper>
            <button
                onClick={() => swiperRef.current.swiper.slidePrev()}
                className={clsx(
                    'absolute top-1/2 -left-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white ring-1 ring-gray-900/20 hover:ring-gray-900/30',
                    { 'cursor-default opacity-50': slideState.isBeginning }
                )}
            >
                <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
                onClick={() => swiperRef.current.swiper.slideNext()}
                className={clsx(
                    'absolute top-1/2 -right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white ring-1 ring-gray-900/20 hover:ring-gray-900/30',
                    { 'cursor-default opacity-50': slideState.isEnd }
                )}
            >
                <ChevronRightIcon className="h-6 w-6" />
            </button>
        </div>
    );
}
