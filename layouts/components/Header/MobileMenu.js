import Link from 'next/link';
import { ChevronDownIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import Button from '../../../components/Button';
import { Disclosure } from '@headlessui/react';
import { cartSelector } from '../../../redux/selectors';

export default function MobileMenu({ categories, isOpen, className, handleClose }) {
    const cart = useSelector(cartSelector);
    return (
        <div
            className={clsx('fixed inset-0 bg-gray-900/30 transition-opacity duration-200', {
                'invisible opacity-0': !isOpen,
                [className]: className,
            })}
            onClick={handleClose}
        >
            <div
                className={clsx(
                    'absolute right-0 top-0 bottom-0 min-w-[16rem] bg-white px-gap pb-gap transition-all duration-200',
                    { 'translate-x-[200%] opacity-0': !isOpen }
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex h-h-header items-center justify-between">
                    <h3 className="text-lg font-medium text-clr-text-dark">Menu</h3>
                    <button
                        className="ml-5 inline-flex items-center hover:text-clr-text-dark"
                        onClick={handleClose}
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <nav className="flex w-full flex-col divide-y divide-gray-200">
                    <Link href="/">
                        <a className="px-3 py-3 font-medium hover:text-clr-text-dark">Trang chủ</a>
                    </Link>
                    <Link href="/shop">
                        <a className="px-3 py-3 font-medium hover:text-clr-text-dark">Shop</a>
                    </Link>
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="cursor-pointer px-3 py-3 font-medium hover:text-clr-text-dark">
                                    <div className="flex items-center justify-between">
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
                                </Disclosure.Button>
                                <Disclosure.Panel className="flex flex-col">
                                    <div className="ml-3">
                                        {categories.map((category) => (
                                            <Link key={category.id} href={'/' + category?.slug}>
                                                <a className="block px-3 py-3 text-sm font-medium hover:text-clr-text-dark">
                                                    {category?.name}
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </nav>
                <Button className="mt-10 w-full" outline primary href="/cart">
                    <ShoppingBagIcon className="h-6 w-6" />
                    <span className="mx-2">Giỏ hàng</span>
                    <span className="font-medium">{'(' + (cart?.products?.length ?? 0) + ')'}</span>
                </Button>
            </div>
        </div>
    );
}
