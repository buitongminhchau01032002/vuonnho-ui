import Head from 'next/head';
import { useState, Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import { Listbox, Popover, Transition } from '@headlessui/react';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckIcon,
    ChevronDownIcon,
    FunnelIcon as FunnelOutlineIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, FunnelIcon as FunnelSolidIcon } from '@heroicons/react/24/solid';
import { Pagination, PageButton, NextButton, PrevButton } from 'react-headless-pagination';

import client from '../../axios';
import DefaultLayout from '../../layouts/DefaultLayout';
import Button from '../../components/Button';
import ProductCard from '../../components/ProductCard/ProductCard';
import BreadcrumbsWithHome from '../../components/BreadcrumbsWithHome';

const sort = [
    {
        label: 'Sắp xếp mặc định',
    },
    {
        label: 'Mới nhất',
        query: 'createdAt:desc',
    },
    {
        label: 'Cũ nhất',
        query: 'createdAt:asc',
    },
    {
        label: 'Giá cao nhất',
        query: 'salePrice:desc',
    },
    {
        label: 'Giá thấp nhất',
        query: 'salePrice:asc',
    },
];

export default function ShopPage({ products, category, meta }) {
    const router = useRouter();
    const page = meta?.pagination?.page || 1;
    const totalPage = meta?.pagination?.pageCount;
    const [sortSelected, setSortSelected] = useState(sort[0]);
    const [currentPage, setCurrentPage] = useState(page - 1);

    useEffect(() => {
        const newRoute = {
            href: router.asPath,
            query: { ...router.query, page: currentPage + 1 },
        };
        if (currentPage + 1 === 1) {
            delete newRoute.query.page;
        }
        router.push(newRoute);
    }, [currentPage]);

    useEffect(() => {
        const newRoute = {
            href: router.asPath,
            query: { ...router.query, sort: sortSelected.query },
        };
        if (!sortSelected.query) {
            delete newRoute.query.sort;
        }
        router.push(newRoute);
    }, [sortSelected]);

    const valueBreadcrumbs = [
        {
            href: '/shop',
            title: 'Shop',
        },
    ];
    if (category?.slug !== 'shop') {
        valueBreadcrumbs.push({
            href: '/' + category?.slug,
            title: category?.name,
        });
    }
    return (
        <DefaultLayout
            head={{
                title: 'Vườn nhỏ | ' + (category?.name || ''),
                metas: [
                    {
                        name: 'description',
                        content: category?.description || 'Vườn nhỏ',
                    },
                ],
            }}
        >
            {/* BREADCRUMBS */}
            <div className="mt-6 px-p-body">
                <BreadcrumbsWithHome values={valueBreadcrumbs} />
            </div>

            {/* BANNER */}
            <section className="flex justify-center px-p-body">
                <div className="w-full max-w-container py-14">
                    <h2 className="text-3xl font-bold text-clr-text-dark">
                        {category?.name || 'Vườn nhỏ shop'}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm">
                        {category?.description || 'Chậu cảnh, phân bón, dụng cụ làm vườn...'}
                    </p>
                </div>
            </section>

            {/* FILTER AND SORT */}
            <div className="flex justify-center px-p-body">
                <div className="flex w-full max-w-container flex-wrap items-center justify-between border-t border-gray-200 py-2">
                    {/* FILTER */}
                    {/* <div className="flex items-center">
                        <Popover as="div" className="relative">
                            {({ open, close }) => (
                                <>
                                    <Popover.Button
                                        className={clsx(
                                            'flex items-center py-2 text-sm font-medium',
                                            { 'text-clr-text-dark': open }
                                        )}
                                    >
                                        {Object.keys(filter).length === 0 ? (
                                            <FunnelOutlineIcon className="h-6 w-6" />
                                        ) : (
                                            <FunnelSolidIcon className="h-6 w-6" />
                                        )}

                                        <span className="ml-3 xs:ml-2">
                                            <span>Lọc</span>
                                            {Object.keys(filter).length > 0 && (
                                                <span className="ml-2 inline-block rounded-sm bg-gray-300 px-1.5 py-1 text-xs">
                                                    {Object.keys(filter).length}
                                                </span>
                                            )}
                                        </span>
                                    </Popover.Button>
                                    <Popover.Overlay className="fixed inset-0 hidden bg-black/20 sm:block" />

                                    <Popover.Panel
                                        as="div"
                                        className="absolute top-full left-0 z-popover min-w-[18rem] rounded-lg border bg-white p-3 shadow-lg sm:fixed sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
                                    >
                                        <p className="hidden border-b pb-2 font-semibold text-clr-text-dark sm:block">
                                            Lọc sản phẩm
                                        </p>
                                        <div className="my-3">
                                            <div>
                                                <label className="text-sm font-semibold">
                                                    Giá:
                                                </label>

                                            </div>
                                        </div>
                                        <div className="border-t pt-3">
                                            <Button
                                                sm
                                                className="w-full"
                                                onClick={() => {
                                                    // Todo: Filter action
                                                    close();
                                                }}
                                            >
                                                Lọc sản phẩm
                                            </Button>
                                        </div>
                                    </Popover.Panel>
                                </>
                            )}
                        </Popover>
                        {Object.keys(filter).length > 0 && (
                            <div className="ml-4 border-l border-gray-200 xs:ml-2">
                                <button className="px-4 text-sm text-primary xs:px-2">
                                    Xoá lọc
                                </button>
                            </div>
                        )}
                    </div> */}
                    <div></div>

                    {/* SORT */}
                    <Listbox
                        value={sortSelected}
                        onChange={setSortSelected}
                        as="div"
                        className="relative"
                    >
                        {({ open }) => (
                            <>
                                <Listbox.Button
                                    as="button"
                                    className={clsx('flex items-center py-2 text-sm font-medium', {
                                        'text-clr-text-dark': open,
                                    })}
                                >
                                    <span className="mr-2">{sortSelected.label}</span>
                                    <ChevronDownIcon className="h-4 w-4" />
                                </Listbox.Button>
                                {open && (
                                    <div className="fixed inset-0 z-10 hidden bg-black/30 sm:block" />
                                )}
                                <Listbox.Options
                                    as="div"
                                    className="absolute top-full right-0 z-popover min-w-[18rem] rounded-lg border bg-white py-2 shadow-lg sm:fixed sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
                                >
                                    <p className="mb-2 hidden border-b px-3 pb-2 font-semibold text-clr-text-dark sm:block">
                                        Sắp xếp sản phẩm
                                    </p>
                                    {sort.map((sortItem) => (
                                        <Listbox.Option
                                            key={sortItem.label}
                                            value={sortItem}
                                            as={Fragment}
                                        >
                                            {({ active, selected }) => (
                                                <div
                                                    className={clsx(
                                                        'flex cursor-pointer items-center px-3 py-1.5',
                                                        {
                                                            'bg-gray-200': active,
                                                            'font-medium text-clr-text-dark':
                                                                selected,
                                                        }
                                                    )}
                                                >
                                                    <div className="w-7">
                                                        {selected && (
                                                            <CheckIcon className="h-6 w-6 text-primary-dark" />
                                                        )}
                                                    </div>
                                                    <div className={'select-none'}>
                                                        {sortItem.label}
                                                    </div>
                                                </div>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </>
                        )}
                    </Listbox>
                </div>
            </div>

            {/* MAIN GRID PRODUCT */}
            <section className="flex justify-center px-p-body">
                {products.length !== 0 ? (
                    <div className="grid-default max-w-container gap-gap xs:gap-y-5">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                    </div>
                ) : (
                    <div className="my-5 flex flex-col items-center">
                        <p className="text-xl font-semibold text-clr-text-dark">
                            Không có sản phẩm
                        </p>
                        <p className="mt-3 max-w-[25rem] text-center text-sm">
                            Không có sản phẩm tại trang này, vui lòng xem tất cả sản phẩm hoặc
                            chuyển sang trang khác.
                        </p>
                        <Button href="/shop" className="mt-4">
                            Đi đến shop
                        </Button>
                    </div>
                )}
            </section>

            {/* PAGINATION */}
            <div className="mt-10 flex justify-center px-p-body">
                <Pagination
                    className="flex w-full max-w-container select-none items-center justify-between xxs:justify-center"
                    currentPage={currentPage}
                    edgePageCount={1}
                    middlePagesSiblingCount={1}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPage}
                    truncableClassName=""
                    truncableText="..."
                >
                    <PrevButton className="flex items-center py-2 text-sm hover:text-clr-text-dark xxs:hidden">
                        <span className="pr-3">
                            <ArrowLeftIcon className="h-5 w-5" />
                        </span>
                        <span className="sm:hidden">Trang trước</span>
                    </PrevButton>
                    <div className="flex items-center justify-center">
                        <PageButton
                            activeClassName="bg-primary shadow-md text-white"
                            className="mx-0.5 flex min-w-[2rem] cursor-pointer items-center justify-center rounded-md px-2.5 py-1.5 xs:mx-0"
                            inactiveClassName="hover:bg-gray-200"
                        />
                    </div>
                    <NextButton className="flex items-center py-2 text-sm hover:text-clr-text-dark xxs:hidden">
                        <span className="sm:hidden">Trang sau</span>
                        <span className="pl-3">
                            <ArrowRightIcon className="h-5 w-5" />
                        </span>
                    </NextButton>
                </Pagination>
            </div>
        </DefaultLayout>
    );
}

export async function getServerSideProps({ params, query }) {
    const categorySlug = params.category;
    const { page, filter, sort } = query;
    let products = [];
    let category = {};
    let filterObj = {};

    if (categorySlug === 'shop') {
        category = {
            name: 'Vườn nhỏ shop',
            description: 'Chậu cảnh, phân bón, dụng cụ làm vườn...',
            slug: 'shop',
        };
    } else {
        const categoryRes = await client.get(`/categories/find-by-slug/${categorySlug}`, {
            params: {
                fields: ['name', 'description', 'slug'],
            },
        });
        const categoryResBody = categoryRes.data;
        category = categoryResBody.data;
        if (!category) {
            return {
                notFound: true,
            };
        }
        filterObj = {
            ...filterObj,
            category: {
                slug: {
                    $eq: categorySlug,
                },
            },
        };
    }

    const productsRes = await client.get('/products', {
        params: {
            fields: ['name', 'listPrice', 'salePrice', 'slug'],
            filters: filterObj,
            sort: sort ?? 'createdAt:desc',
            pagination: {
                page: page || 1,
                pageSize: 12,
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

    const productsResBody = productsRes.data;
    products = productsResBody.data;
    const meta = productsResBody.meta;
    if (!products) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            products,
            category,
            meta,
        },
    };
}
