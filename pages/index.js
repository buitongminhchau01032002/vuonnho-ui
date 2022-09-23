import Link from 'next/link';
import { ArrowSmallRightIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { FacebookOutlineIcon } from '../components/Icons';

import client from '../axios';
import DefaultLayout from '../layouts/DefaultLayout';
import Button from '../components/Button';
import HighlightProductSlide from '../components/HighlightProductSlide/HighlightProductSlide';

export default function Home({ highlightProducts }) {
    return (
        <DefaultLayout>
            {/* Banner */}
            <section className="flex justify-center px-p-body">
                <div className="flex w-full max-w-container flex-wrap items-center md:flex-col">
                    {/* Left */}
                    <div className="w-1/2 py-16 md:w-full">
                        <Link href="/shop">
                            <a>
                                <h2 className="flex items-center text-lg font-semibold text-primary hover:text-primary-dark">
                                    Vườn nhỏ shop
                                    <ArrowSmallRightIcon className="ml-1 h-5 w-5" />
                                </h2>
                            </a>
                        </Link>
                        <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[3.5rem] text-clr-text-dark xs:text-3xl">
                            Chậu, phân bón, giá thể, dụng cụ làm vườn
                        </h1>
                        <div className="mt-4 flex flex-wrap">
                            <Link href="/">
                                <a className="mr-6 mt-1 flex items-center text-sm font-medium hover:text-clr-text-dark">
                                    <PhoneIcon className="h-6 w-6 text-primary" />
                                    <span className="ml-2.5">0123456789</span>
                                </a>
                            </Link>
                            <Link href="/">
                                <a className="mt-1 flex items-center text-sm font-medium hover:text-clr-text-dark">
                                    <FacebookOutlineIcon className="h-6 w-6 text-sky-600" />
                                    <span className="ml-2.5">fb.com/vuonnhoshop</span>
                                </a>
                            </Link>
                        </div>
                        <p className="mt-4 max-w-3xl leading-7 xs:hidden">
                            Over 500+ professionally designed, fully responsive, expertly crafted
                            component examples you can drop into your Tailwind projects and
                            customize to your hearts content.
                        </p>
                        <div className="mt-8 flex flex-wrap">
                            <Button className="xs:w-full" primary lg href="/shop">
                                Đến shop ngay
                                <ArrowSmallRightIcon className="ml-1 h-5 w-5" />
                            </Button>
                            <Button
                                className="ml-4 xs:ml-0 xs:mt-3 xs:w-full"
                                secondary
                                outline
                                lg
                                href="/"
                            >
                                Liên hệ
                            </Button>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="h-[30rem] flex-1 md:hidden">
                        <img
                            src="/images/banner-img.jpg"
                            alt="banner"
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* HIGHLIGHT PRODUCT */}
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

export async function getServerSideProps() {
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
        },
    };
}
