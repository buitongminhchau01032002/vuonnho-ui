import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import {
    ArrowSmallRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlide';

import DefaultLayout from '../../layouts/DefaultLayout';
import Button from '../../components/Button';
import BreadcrumbsWithHome from '../../components/BreadcrumbsWithHome';
import PriceFomater from '../../components/PriceFomater';
import HighlightProductSlide from '../../components/HighlightProductSlide/HighlightProductSlide';
import QuantityInput from '../../components/QuantityInput/QuantityInput';
import client from '../../axios';

export default function ProductDetailPage({ product, highlightProducts }) {
    const { name, description, detail, listPrice, salePrice, images, category, priceRules, slug } =
        product?.attributes ?? {};
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        setQty(1);
    }, [router.asPath]);

    return (
        <DefaultLayout>
            {/* BREADCRUMBS */}
            <div className="mt-6 px-p-body">
                <BreadcrumbsWithHome
                    values={[
                        {
                            href: '/shop',
                            title: 'Shop',
                        },
                        {
                            href: '/' + category?.data?.attributes?.slug ?? '/',
                            title: category?.data?.attributes?.name,
                        },
                        {
                            href: '/' + category?.data?.attributes?.slug + '/' + slug,
                            title: name,
                        },
                    ]}
                />
            </div>

            {/* MAIN */}
            <section className="flex justify-center p-p-body">
                <div className="flex w-full max-w-container flex-wrap">
                    {/* LEFT */}
                    <div className="flex w-1/2 justify-center pr-6 sm:w-full sm:pr-0">
                        <div className="mb-5 w-full">
                            <ProductImageSlide images={images?.data} />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="w-1/2 sm:mt-3 sm:w-full">
                        <h1 className="text-3xl font-semibold text-clr-text-dark xs:text-2xl">
                            {name ?? 'Sản phẩm không xác định'}
                        </h1>
                        <div className="mt-2 flex items-baseline">
                            <h2 className="text-3xl text-primary xs:text-2xl">
                                <PriceFomater>{salePrice ?? ''}</PriceFomater>
                            </h2>
                            {listPrice && listPrice > salePrice && (
                                <p className="ml-5 text-2xl font-light line-through xs:text-xl">
                                    <PriceFomater>{listPrice}</PriceFomater>
                                </p>
                            )}
                        </div>
                        <p className="mt-5 xs:text-sm">{description}</p>
                        {priceRules && (
                            <div className="mt-4">
                                <span className="font-semibold">Giá bán sĩ:</span>
                                {priceRules?.map((priceRules) => (
                                    <div
                                        key={priceRules?.minQuantity}
                                        className="flex items-baseline"
                                    >
                                        <p className="text-2xl font-light text-primary sm:text-xl">
                                            <PriceFomater>{priceRules.price}</PriceFomater>
                                        </p>
                                        <p className="ml-1">
                                            {'x'}
                                            {priceRules.minQuantity}
                                        </p>
                                        <p className="ml-2 font-medium">{`cho ${priceRules.minQuantity} sản phẩm`}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-5 flex w-full max-w-xs flex-col xs:max-w-full">
                            <span className="font-semibold">Chọn mua:</span>
                            <div className="mb-2 flex items-center justify-between">
                                <span>Số lượng:</span>
                                <QuantityInput value={qty} setValue={setQty} minValue={1} />
                            </div>
                            <Button
                                lg
                                className="w-full"
                                onClick={() =>
                                    dispatch(cartActions.add({ ...product, quantity: qty }))
                                }
                            >
                                <ShoppingBagIcon className="mr-2 h-6 w-6" />
                                <span>Thêm vào giỏ hàng</span>
                            </Button>
                        </div>

                        <div className="mt-5 border-t pt-2 xs:text-sm">{detail}</div>
                    </div>
                </div>
            </section>

            <section className="flex justify-center px-p-body">
                <div className="mt-10 w-full max-w-container">
                    <div className="mb-8 flex justify-between ">
                        <h2 className="text-2xl font-bold text-clr-text-dark">Sản phẩm nổi bật</h2>
                        <Button className="xs:hidden" href="/shop" text primary>
                            Tất cả sản phẩm
                            <ArrowSmallRightIcon className="ml-1 h-4 w-4" />
                        </Button>
                    </div>
                    <HighlightProductSlide products={highlightProducts} />
                </div>
            </section>
        </DefaultLayout>
    );
}

const SLIDES_PER_VIEW_THUMSNAIL = 5;
function ProductImageSlide({ images }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const mainSwiperRef = useRef(null);
    const [mainSlideState, setMainSlideState] = useState({
        isBeginning: true,
        isEnd: false,
    });
    const thumbnailSwiperRef = useRef(null);
    const [thumbnailSlideState, setThumbnailSlideState] = useState({
        isBeginning: true,
        isEnd: false,
    });

    useEffect(() => {
        mainSwiperRef.current.swiper.slideTo(currentSlide);

        let offsetActive = Math.floor((SLIDES_PER_VIEW_THUMSNAIL - 1) / 2);
        let slideToGo = currentSlide - offsetActive;
        if (slideToGo < 0) {
            slideToGo = 0;
        }
        thumbnailSwiperRef.current.swiper.slideTo(slideToGo);
    }, [currentSlide]);

    const router = useRouter();

    useEffect(() => {
        setCurrentSlide(0);
    }, [router.asPath]);

    return (
        <div className="xxs:max-w-[calc((100%vh_-_var(--h-header))_*_4_/_5)]">
            {/* MAIN SLIDE */}
            <div className="group relative">
                <Swiper
                    ref={mainSwiperRef}
                    onAfterInit={({ isBeginning, isEnd }) => {
                        setMainSlideState({ isBeginning, isEnd });
                    }}
                    onSlideChange={(swiper) => {
                        setMainSlideState({
                            isBeginning: swiper.isBeginning,
                            isEnd: swiper.isEnd,
                        });
                        setCurrentSlide(swiper.activeIndex);
                    }}
                >
                    {images &&
                        images.map((image) => (
                            <SwiperSlide key={image?.attributes?.url}>
                                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                                    <img
                                        src={image?.attributes?.url}
                                        className="h-full w-full object-cover"
                                        alt={image?.attributes?.alternativeText}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
                <div className="absolute inset-0 flex justify-between overflow-hidden rounded-md can-hover:opacity-0 can-hover:group-hover:opacity-100">
                    <button
                        className={clsx(
                            'relative z-[50] inline-flex h-full w-12 items-center justify-center can-hover:bg-black/20 can-hover:hover:bg-black/40',
                            {
                                invisible: mainSlideState.isBeginning,
                            }
                        )}
                        onClick={() => mainSwiperRef.current.swiper.slidePrev()}
                    >
                        <ChevronLeftIcon className="h-8 w-8 text-[#fff] cannot-hover:drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
                    </button>
                    <button
                        className={clsx(
                            'relative z-[50] inline-flex h-full w-12 items-center justify-center can-hover:bg-black/20 can-hover:hover:bg-black/40',
                            {
                                invisible: mainSlideState.isEnd,
                            }
                        )}
                        onClick={() => mainSwiperRef.current.swiper.slideNext()}
                    >
                        <ChevronRightIcon className="h-8 w-8 text-[#fff] cannot-hover:drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
                    </button>
                </div>
            </div>

            {/* THUMBNAIL SLIDE */}
            <div className="group relative mt-1">
                <Swiper
                    ref={thumbnailSwiperRef}
                    slidesPerView={SLIDES_PER_VIEW_THUMSNAIL}
                    onAfterInit={({ isBeginning, isEnd }) => {
                        setThumbnailSlideState({ isBeginning, isEnd });
                    }}
                    onSlideChange={({ isBeginning, isEnd }) => {
                        setThumbnailSlideState({ isBeginning, isEnd });
                    }}
                >
                    {images &&
                        images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="aspect-square  overflow-hidden p-1"
                                    onClick={() => setCurrentSlide(index)}
                                >
                                    <img
                                        src={image?.attributes?.formats?.thumbnail?.url}
                                        className={clsx(
                                            'h-full w-full cursor-pointer rounded-sm object-cover ring-primary',
                                            {
                                                'ring-4': index === currentSlide,
                                            }
                                        )}
                                        alt={image?.attributes?.alternativeText}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
                <div className="absolute inset-0 flex justify-between opacity-0 group-hover:opacity-100 cannot-hover:hidden">
                    <button
                        className={clsx(
                            'relative z-[50] inline-flex h-full w-7 items-center justify-center rounded-l-sm bg-black/30 hover:bg-black/50',
                            {
                                invisible: thumbnailSlideState.isBeginning,
                            }
                        )}
                        onClick={() => {
                            thumbnailSwiperRef.current.swiper.slideTo(
                                thumbnailSwiperRef.current.swiper.activeIndex -
                                    SLIDES_PER_VIEW_THUMSNAIL
                            );
                        }}
                    >
                        <ChevronLeftIcon className="h-5 w-5 text-[#fff]" />
                    </button>
                    <button
                        className={clsx(
                            'relative z-[50] inline-flex h-full w-7 items-center justify-center rounded-r-sm bg-black/30 hover:bg-black/50',
                            {
                                invisible: thumbnailSlideState.isEnd,
                            }
                        )}
                        onClick={() => {
                            thumbnailSwiperRef.current.swiper.slideTo(
                                thumbnailSwiperRef.current.swiper.activeIndex +
                                    SLIDES_PER_VIEW_THUMSNAIL
                            );
                        }}
                    >
                        <ChevronRightIcon className="h-5 w-5 text-[#fff]" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const productSlug = params.product;
    let product = {};

    const productRes = await client.get(`/products/find-by-slug/${productSlug}`, {
        params: {
            fields: ['name', 'listPrice', 'salePrice', 'slug', 'description', 'detail'],
            populate: {
                images: {
                    fields: ['alternativeText', 'url', 'formats'],
                },
                category: {
                    fields: ['name', 'slug'],
                },
                priceRules: true,
            },
        },
    });
    const productResBody = productRes.data;
    product = productResBody.data;
    if (!product) {
        return {
            notFound: true,
        };
    }

    const highlightProductsRes = await client.get(`/products`, {
        params: {
            fields: ['name', 'listPrice', 'salePrice', 'slug'],
            sort: 'createdAt:desc',
            pagination: {
                page: 1,
                pageSize: 8,
            },
            populate: {
                images: {
                    fields: ['alternativeText', 'formats'],
                },
                category: {
                    fields: ['slug'],
                },
                priceRules: true,
            },
        },
    });
    const highlightProductsResBody = highlightProductsRes.data;
    const highlightProducts = highlightProductsResBody.data;

    return {
        props: {
            highlightProducts,
            product,
        },
    };
}
