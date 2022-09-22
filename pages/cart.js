import { useState, Fragment } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import DefaultLayout from '../layouts/DefaultLayout';
import Button from '../components/Button';
import BreadcrumbsWithHome from '../components/BreadcrumbsWithHome';
import PriceFomater from '../components/PriceFomater';
import QuantityInput from '../components/QuantityInput';
import CheckboxGroup from '../components/CheckboxGroup/CheckboxGroup';
import chooseImageUrl from '../utils/chooseImageUrl';
import { cartSelector } from '../redux/selectors';

const TIMES = [
    { value: '1', label: '8h30-10h' },
    { value: '2', label: '10h-12h' },
    { value: '3', label: '12h-13h' },
    { value: '4', label: '13h-13h30' },
    { value: '5', label: '13h30-15h' },
    { value: '6', label: '15h-20h50' },
];

export default function Shop({ products }) {
    const cart = useSelector(cartSelector);
    return (
        <DefaultLayout>
            {/* BREADCRUMBS */}
            <div className="mt-6 px-p-body">
                <BreadcrumbsWithHome
                    values={[
                        {
                            href: '/cart',
                            title: 'Giỏ hàng',
                        },
                    ]}
                />
            </div>

            {/* BANNER */}
            <section className="flex justify-center px-p-body">
                <div className="w-full max-w-container py-14">
                    <h2 className="text-3xl font-bold text-clr-text-dark">Giỏ hàng</h2>
                    <p className="mt-2 max-w-2xl text-sm">{/* No description */}</p>
                </div>
            </section>

            {/* MAIN */}

            <section className="flex justify-center p-p-body">
                <div className="flex w-full max-w-container flex-wrap">
                    {/* PRODUCTS */}
                    <div className="w-1/2 sm:w-full">
                        <h4 className="mb-4 text-lg font-semibold text-clr-text-dark">
                            Sản phẩm trong giỏ hàng
                        </h4>
                        <ul className="divide-y divide-gray-200">
                            {cart?.products?.map((productCart) => (
                                <ProductCard productCart={productCart} key={cart?.product?.id} />
                            ))}
                        </ul>
                    </div>

                    {/* FORM */}
                    <div className="w-1/2 pl-8 sm:w-full sm:pl-0">
                        <h4 className="mb-4 text-lg font-semibold text-clr-text-dark">
                            Thông tin nhận hàng
                        </h4>
                        <FormDelivery />
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
}

function ProductCard({ productCart, className }) {
    const [qty, setQty] = useState(1);
    return (
        <li className={clsx('flex py-3', { [className]: className })}>
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md xs:w-20">
                <Link href="/">
                    <img
                        src={chooseImageUrl(
                            productCart?.attributes?.images?.data?.[0]?.attributes,
                            'thumbnail'
                        )}
                        alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                        className="h-full w-full cursor-pointer object-cover object-center"
                    />
                </Link>
            </div>

            <div className="ml-4 flex flex-1 flex-col justify-between xs:ml-2">
                <div className="flex items-start">
                    <div className="flex-1">
                        <Link href="/">
                            <a>
                                <h3 className="font-semibold text-clr-text-dark">
                                    {productCart?.attributes?.name}
                                </h3>
                            </a>
                        </Link>
                        <div className="mt-1 flex flex-wrap-reverse items-baseline">
                            <p className="mr-3 font-medium">
                                <PriceFomater>{productCart?.attributes?.salePrice}</PriceFomater>
                            </p>
                            {productCart?.attributes?.listPrice &&
                                productCart?.attributes?.listPrice >
                                    productCart?.attributes?.salePrice && (
                                    <p className="text-xs line-through">
                                        <PriceFomater>
                                            {productCart?.attributes?.listPrice}
                                        </PriceFomater>
                                    </p>
                                )}
                        </div>
                    </div>
                    <button
                        type="button"
                        className="pl-2 text-sm font-medium text-primary hover:text-primary-light"
                    >
                        Xoá
                    </button>
                </div>
                <div className="mt-1 flex flex-wrap items-center">
                    <div className=" flex-1">
                        <QuantityInput value={qty} setValue={setQty} minValue={1} />
                    </div>
                    <div className="flex items-baseline">
                        <p className="mr-1 text-sm xs:hidden">Tổng:</p>
                        <p className="font-medium text-primary">
                            <PriceFomater>100000</PriceFomater>
                        </p>
                    </div>
                </div>
            </div>
        </li>
    );
}

function FormDelivery() {
    const [times, setTimes] = useState([]);
    console.log(times);
    return (
        <div className="">
            <div className="mb-4 flex flex-col">
                <label className="mb-2 text-sm font-semibold">Họ tên *</label>
                <input
                    type="text"
                    className="rounded px-3 py-2 ring-1 ring-gray-300 hover:ring-gray-400 focus:ring-2 focus:ring-primary"
                    placeholder="VD: Nguyễn Văn A"
                />
            </div>
            <div className="mb-4 flex flex-col">
                <label className="mb-2 text-sm font-semibold">Số điện thoại *</label>
                <input
                    type="text"
                    className="rounded px-3 py-2 ring-1 ring-gray-300 hover:ring-gray-400 focus:ring-2 focus:ring-primary"
                    placeholder="VD: 0123456789"
                />
            </div>
            <div className="mb-4 flex flex-col">
                <label className="mb-2 text-sm font-semibold">Địa chỉ nhận hàng *</label>
                <textarea
                    rows="3"
                    className="resize-none rounded px-3 py-2 ring-1 ring-gray-300 hover:ring-gray-400 focus:ring-2 focus:ring-primary"
                    placeholder="VD: Số 100, đường Gì Đó, Phường 50, quận Ngẫu Nhiên, TPHCM"
                ></textarea>
            </div>
            <div className="mb-4 flex flex-col">
                <label className="mb-2 text-sm font-semibold">Thời gian xác nhận đơn hàng *</label>
                <div className="flex flex-wrap">
                    <CheckboxGroup values={times} setValues={setTimes}>
                        {TIMES.map((time) => (
                            <CheckboxGroup.Option
                                key={time.value}
                                value={time.value}
                                className={({ selected }) =>
                                    clsx(
                                        'mr-2 mt-2 rounded-sm px-3 py-2 text-sm font-medium ring-1  transition-colors ',

                                        {
                                            'ring-gray-300 can-hover:hover:ring-gray-400':
                                                !selected,
                                            'bg-primary text-[#fff] ring-primary can-hover:hover:bg-primary-dark':
                                                selected,
                                        }
                                    )
                                }
                            >
                                {time.label}
                            </CheckboxGroup.Option>
                        ))}
                    </CheckboxGroup>
                </div>
            </div>
            <div className="mt-10 flex flex-wrap">
                <Button lg className={clsx('min-w-[10rem] xs:w-full')}>
                    Đặt hàng
                </Button>
            </div>
        </div>
    );
}
