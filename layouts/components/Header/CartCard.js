import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../redux/slices/cartSlide';

import PriceFomater from '../../../components/PriceFomater';
import QuantityInput from '../../../components/QuantityInput/QuantityInput';
import chooseImageUrl from '../../../utils/chooseImageUrl';

export default function CartCard({ productCart, className }) {
    const [qty, setQty] = useState(productCart.quantity);
    const dispatch = useDispatch();
    const debounceDispatch = useDebouncedCallback((quantity) => {
        dispatch(cartActions.updateQuantity({ id: productCart.id, quantity }));
    }, 300);
    useEffect(() => {
        setQty(productCart.quantity);
    }, [productCart.quantity]);
    return (
        <li className={clsx('flex py-5', { [className]: className })}>
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 xs:w-20">
                <Link
                    href={
                        '/' +
                        productCart?.attributes?.category?.data?.attributes?.slug +
                        '/' +
                        productCart?.attributes?.slug
                    }
                >
                    <img
                        src={chooseImageUrl(
                            productCart?.attributes?.images?.data[0]?.attributes,
                            'thumbnail'
                        )}
                        alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                        className="h-full w-full cursor-pointer object-cover object-center"
                    />
                </Link>
            </div>

            <div className="ml-4 flex flex-1 flex-col xs:ml-2">
                <div>
                    <Link
                        href={
                            '/' +
                            productCart?.attributes?.category?.data?.attributes?.slug +
                            '/' +
                            productCart?.attributes?.slug
                        }
                    >
                        <a>
                            <h3>{productCart?.attributes?.name}</h3>
                        </a>
                    </Link>
                    <div className="flex items-baseline">
                        <p className="font-medium text-clr-text-dark">
                            <PriceFomater>{productCart?.attributes?.salePrice ?? ''}</PriceFomater>
                        </p>
                        {productCart?.attributes?.listPrice &&
                            productCart?.attributes?.listPrice >
                                productCart?.attributes?.salePrice && (
                                <p className="ml-3 text-xs line-through">
                                    <PriceFomater>
                                        {productCart?.attributes?.listPrice ?? ''}
                                    </PriceFomater>
                                </p>
                            )}
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between ">
                    <QuantityInput
                        value={qty}
                        setValue={(value) => {
                            setQty(value);
                            debounceDispatch(value);
                        }}
                        minValue={1}
                    />

                    <div className="flex">
                        <button
                            type="button"
                            className="text-sm font-medium text-primary hover:text-primary-light"
                            onClick={() => dispatch(cartActions.remove(productCart.id))}
                        >
                            Xoá
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}
