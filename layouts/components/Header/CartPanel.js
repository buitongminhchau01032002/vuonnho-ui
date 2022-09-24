import Link from 'next/link';
import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../../redux/selectors';

import Button from '../../../components/Button';
import CartCard from './CartCard';
import PriceFomater from '../../../components/PriceFomater';

export default function CartPanel({ isOpen, className, handleClose }) {
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
                    'absolute right-0 top-0 bottom-0 bg-white px-gap transition-all duration-200 xs:ml-10',
                    { 'translate-x-[200%] opacity-0': !isOpen }
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex max-h-full flex-col">
                    <div className="flex h-h-header flex-shrink-0 items-center justify-between">
                        <h3 className="text-lg font-medium text-clr-text-dark">Giỏ hàng</h3>
                        <button
                            className="ml-5 inline-flex items-center hover:text-clr-text-dark"
                            onClick={handleClose}
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    {cart?.products?.length !== 0 ? (
                        <>
                            <ul className="-mx-gap w-96 flex-1 divide-y divide-gray-200 overflow-y-auto overscroll-contain xs:w-fit xs:min-w-[17rem] xs:max-w-[24rem]">
                                {cart?.products?.map((productCart) => (
                                    <CartCard
                                        key={productCart?.id}
                                        className="px-gap"
                                        productCart={productCart}
                                    />
                                ))}
                            </ul>
                            <div className="border-t border-gray-200 py-4">
                                <div className="flex justify-between ">
                                    <p className="mr-6 font-medium text-clr-text-dark">Tổng tiền</p>
                                    <div className="flex items-baseline">
                                        {cart.billing.intoMoney < cart.billing.totalMoney && (
                                            <p className="mr-3 text-xs line-through">
                                                <PriceFomater>{carttotalMoney}</PriceFomater>
                                            </p>
                                        )}
                                        <p className="font-medium text-clr-text-dark">
                                            <PriceFomater>{cart.billing.intoMoney}</PriceFomater>
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm">
                                    {cart.billing.numOfProducts + ' sản phẩm'}
                                </p>
                                <Button href="/cart" className="mt-3 w-full">
                                    Xem giỏ hàng
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex w-72 flex-col items-center">
                            <p className="mt-4 px-11 text-center text-lg font-bold text-clr-text-dark">
                                Chưa có sản phẩm trong giỏ hàng
                            </p>
                            <p className="mt-4 text-sm">Hãy đến shop để mua sản phẩm</p>
                            <Button className="mt-5 w-full" href="/shop">
                                Đến shop ngay
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
