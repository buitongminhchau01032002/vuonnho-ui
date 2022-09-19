import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import {
    ShoppingBagIcon,
    MagnifyingGlassIcon,
    Bars3Icon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';
import MobileMenu from './MobileMenu';
import CartPanel from './CartPanel';
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import client from '../../../axios';
import { cartSelector } from '../../../redux/selectors';

export default function Header() {
    const [categories, setCategories] = useState([]);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenCart, setIsOpenCart] = useState(false);
    const cart = useSelector(cartSelector);

    const router = useRouter();

    // Handle url change
    useEffect(() => {
        setIsOpenMenu(false);
        setIsOpenCart(false);
    }, [router.asPath]);

    useEffect(() => {
        client
            .get('/categories', {
                params: {
                    feilds: ['name, image, description, slug'],
                    populate: {
                        image: {
                            fields: ['alternativeText', 'url', 'formats'],
                        },
                    },
                },
            })
            .then((categoriesRes) => {
                const categoriesBody = categoriesRes.data;
                setCategories(categoriesBody.data);
            });
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-header flex h-h-header items-center justify-between bg-white px-p-body shadow">
            {/* LOGO */}
            <Link href="/">
                <img className="h-8 cursor-pointer" src="/logo.svg" />
            </Link>

            {/* NAV */}
            <nav className="mr-2 flex items-center sm:hidden">
                <Link href="/">
                    <a className="px-3 py-3 font-medium hover:text-clr-text-dark">Trang chủ</a>
                </Link>
                <Link href="/shop">
                    <a className="px-3 py-3 font-medium hover:text-clr-text-dark">Shop</a>
                </Link>
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <Popover.Button className="cursor-pointer px-3 py-3 font-medium hover:text-clr-text-dark">
                                <div className="flex items-center">
                                    <span>Danh mục</span>
                                    <ChevronDownIcon
                                        className={clsx(
                                            'ml-2 h-5 w-5 transition-transform duration-300',
                                            {
                                                'rotate-180': open,
                                            }
                                        )}
                                    />
                                </div>
                            </Popover.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute left-1/2 z-10 -translate-x-1/2">
                                    <div className="w-96 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                                        {categories.map((category) => (
                                            <Link
                                                key={category.id}
                                                href={'/' + category?.attributes?.slug}
                                            >
                                                <a className="flex w-full items-center rounded-md p-2 hover:bg-gray-200">
                                                    <img
                                                        src={
                                                            category?.attributes?.image?.data
                                                                ?.attributes?.formats?.thumbnail
                                                                ?.url
                                                        }
                                                        alt={category?.attributes?.name}
                                                        className="h-12 w-12 shrink-0 rounded-md"
                                                    />
                                                    <div className="ml-4">
                                                        <p className="text-sm font-semibold text-clr-text-dark">
                                                            {category?.attributes?.name}
                                                        </p>
                                                        <p className="text-sm">
                                                            {category?.attributes?.description}
                                                        </p>
                                                    </div>
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </nav>

            {/* ACTION */}
            <div className="flex items-center">
                <button className="flex items-center hover:text-clr-text-dark">
                    <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
                <button
                    className="ml-5 flex items-center hover:text-clr-text-dark"
                    onClick={() => setIsOpenCart(true)}
                >
                    <ShoppingBagIcon className="h-6 w-6" />
                    <span className="ml-1 text-sm">{cart?.products?.length ?? 0}</span>
                </button>
                <button
                    className="ml-5 hidden items-center hover:text-clr-text-dark sm:flex"
                    onClick={() => setIsOpenMenu(true)}
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>
            </div>

            {/* MOBILE MENU */}
            <MobileMenu
                isOpen={isOpenMenu}
                className="hidden sm:block"
                handleClose={() => setIsOpenMenu(false)}
                categories={categories}
            />
            <CartPanel isOpen={isOpenCart} handleClose={() => setIsOpenCart(false)} />
        </header>
    );
}
