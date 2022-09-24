import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import ProductCard from '../ProductCard';

export default function SlideMobile({ products }) {
    return (
        <Swiper
            className="hidden sm:block"
            slidesPerView="auto"
            spaceBetween={12}
            breakpoints={{
                // >=576px
                576: {
                    spaceBetween: 20,
                },
            }}
        >
            {products &&
                products.map((product) => (
                    <SwiperSlide key={product.id} className="!w-[14rem]">
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
        </Swiper>
    );
}
