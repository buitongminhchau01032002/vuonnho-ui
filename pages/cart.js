import { useState, Fragment, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import client from '../axios';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useDebouncedCallback } from 'use-debounce';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { cartActions } from '../redux/slices/cartSlide';
import DefaultLayout from '../layouts/DefaultLayout';
import Button from '../components/Button';
import BreadcrumbsWithHome from '../components/BreadcrumbsWithHome';
import PriceFomater from '../components/PriceFomater';
import QuantityInput from '../components/QuantityInput';
import CheckboxGroup from '../components/CheckboxGroup/CheckboxGroup';
import chooseImageUrl from '../utils/chooseImageUrl';
import { cartSelector } from '../redux/selectors';
import { LoadingIcon } from '../components/Icons';

export default function Cart({ orderConfirmationTimes }) {
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
                        {cart?.products?.length !== 0 && (
                            <h4 className="mb-4 text-lg font-semibold text-clr-text-dark">
                                Sản phẩm trong giỏ hàng
                            </h4>
                        )}
                        {cart?.products?.length !== 0 ? (
                            <>
                                <ul className="divide-y divide-gray-200">
                                    {cart?.products?.map((productCart) => (
                                        <ProductCard
                                            productCart={productCart}
                                            key={productCart?.id}
                                        />
                                    ))}
                                </ul>
                                <div className="mt-4 rounded-md border border-primary p-4">
                                    <div className="mt-2 flex items-center justify-between border-b">
                                        <span className="font-medium">Tổng tiền:</span>
                                        <span className="font-medium text-clr-text-dark">
                                            <PriceFomater>{cart?.billing?.totalMoney}</PriceFomater>
                                        </span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between border-b">
                                        <span className="font-medium">Giảm giá:</span>
                                        <span>
                                            <PriceFomater>
                                                {cart?.billing?.discountMoney}
                                            </PriceFomater>
                                        </span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between border-b">
                                        <span className="font-medium">Thành tiền:</span>
                                        <span className="text-xl font-semibold text-primary">
                                            <PriceFomater>{cart?.billing?.intoMoney}</PriceFomater>
                                        </span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center">
                                <p className="mt-4 px-4 text-center text-lg font-bold text-clr-text-dark">
                                    Chưa có sản phẩm trong giỏ hàng
                                </p>
                                <p className="mt-2 text-sm">Hãy đến shop để mua sản phẩm</p>
                                <Button className="mt-5 mb-6 xs:w-full" href="/shop">
                                    Đến shop ngay
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* FORM */}
                    <div className="w-1/2 pl-8 sm:mt-5 sm:w-full sm:pl-0">
                        <h4 className="mb-4 text-lg font-semibold text-clr-text-dark">
                            Thông tin nhận hàng
                        </h4>
                        <FormDelivery
                            products={cart?.products}
                            orderConfirmationTimes={orderConfirmationTimes}
                        />
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
}

function ProductCard({ productCart, className }) {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const debounceDispatch = useDebouncedCallback((quantity) => {
        dispatch(cartActions.updateQuantity({ id: productCart.id, quantity }));
    }, 300);
    useEffect(() => {
        setQty(productCart.quantity);
    }, [productCart.quantity]);
    return (
        <li className={clsx('flex py-3', { [className]: className })}>
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md xs:w-20">
                <Link href={'/' + productCart?.category?.slug + '/' + productCart?.slug}>
                    <img
                        src={chooseImageUrl(productCart?.images?.[0], 'thumbnail')}
                        alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                        className="h-full w-full cursor-pointer object-cover object-center"
                    />
                </Link>
            </div>

            <div className="ml-4 flex flex-1 flex-col justify-between xs:ml-2">
                <div className="flex items-start">
                    <div className="flex-1">
                        <Link href={'/' + productCart?.category?.slug + '/' + productCart?.slug}>
                            <a>
                                <h3 className="font-semibold text-clr-text-dark">
                                    {productCart?.name}
                                </h3>
                            </a>
                        </Link>
                        <div className="mt-1 flex flex-wrap-reverse items-baseline">
                            <p className="mr-3 font-medium">
                                <PriceFomater>{productCart?.salePrice}</PriceFomater>
                            </p>
                            {productCart?.listPrice &&
                                productCart?.listPrice > productCart?.salePrice && (
                                    <p className="text-xs line-through">
                                        <PriceFomater>{productCart?.listPrice}</PriceFomater>
                                    </p>
                                )}
                        </div>
                    </div>
                    <button
                        type="button"
                        className="pl-2 text-sm font-medium text-primary hover:text-primary-light"
                        onClick={() => dispatch(cartActions.remove(productCart.id))}
                    >
                        Xoá
                    </button>
                </div>
                <div className="mt-1 flex flex-wrap items-center">
                    <div className=" flex-1">
                        <QuantityInput
                            value={qty}
                            setValue={(value) => {
                                setQty(value);
                                debounceDispatch(value);
                            }}
                            minValue={1}
                        />
                    </div>
                    <div className="flex items-baseline">
                        <p className="mr-1 text-sm xs:hidden">Tổng:</p>
                        <p className="font-medium text-primary">
                            <PriceFomater>{productCart.totalPrice}</PriceFomater>
                        </p>
                    </div>
                </div>
            </div>
        </li>
    );
}

function FormDelivery({ products, orderConfirmationTimes }) {
    const [orderConfirmationTimeError, setOrderConfirmationTimeError] = useState(
        'Chọn ít nhất 1 khoảng thời gian'
    );
    const [orderConfirmationTimeTouched, setOrderConfirmationTimeTouched] = useState(false);
    const [peddingSubmit, setPeddingSubmit] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(50, 'Tên không được quá 50 kí tự')
            .required('Trường này không được để trống'),
        phone: Yup.string()
            .matches(/^[0-9]+$/, 'Số điện thoại phải là số')
            .max(15, 'Số điện thoại không được quá 15 số')
            .min(9, 'Số điện thoại phải từ 9 số')
            .required('Trường này không được để trống'),
        address: Yup.string()
            .max(250, 'Địa chỉ không được quá 250 kí tự')
            .required('Trường này không được để trống'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            address: '',
            orderConfirmationTimes: [],
        },
        validationSchema,
        onSubmit: (values) => {
            setPeddingSubmit(true);
            // todo: CALL API
            setTimeout(() => {
                setPeddingSubmit(false);
                alert(JSON.stringify(values));
            }, 2000);
        },
    });

    function formatTime(time) {
        return time?.[0] + time?.[1] + 'h' + time?.[3] + time?.[4];
    }

    function handleTimeChange(values) {
        if (!orderConfirmationTimeTouched) {
            setOrderConfirmationTimeTouched(true);
        }
        formik.setFieldValue('orderConfirmationTimes', values);
        if (values.length > 0 && orderConfirmationTimeError) {
            setOrderConfirmationTimeError(null);
        }
        if (values.length === 0) {
            setOrderConfirmationTimeError('Chọn ít nhất 1 khoảng thời gian');
        }
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-4 flex flex-col">
                <label className="mb-2 text-sm font-semibold">Họ tên *</label>
                <input
                    type="text"
                    name="name"
                    className={clsx(
                        'rounded px-3 py-2 ring-1 ring-gray-300 hover:ring-gray-400 focus:ring-2 focus:ring-primary',
                        {
                            '!ring-red-500 focus:!ring-1 ':
                                formik.touched.name && formik.errors.name,
                        }
                    )}
                    placeholder="VD: Nguyễn Văn A"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                    <div className="text-sm text-red-500">{formik.errors.name}</div>
                )}
            </div>
            <div className="mb-4 flex flex-col">
                <label className="mb-2 text-sm font-semibold">Số điện thoại *</label>
                <input
                    type="text"
                    name="phone"
                    className={clsx(
                        'rounded px-3 py-2 ring-1 ring-gray-300 hover:ring-gray-400 focus:ring-2 focus:ring-primary',
                        {
                            '!ring-red-500 focus:!ring-1':
                                formik.touched.phone && formik.errors.phone,
                        }
                    )}
                    placeholder="VD: 0123456789"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                    <div className="text-sm text-red-500">{formik.errors.phone}</div>
                )}
            </div>
            <div className="mb-4 flex flex-col">
                <label className="mb-2 text-sm font-semibold">Địa chỉ nhận hàng *</label>
                <textarea
                    rows="3"
                    name="address"
                    className={clsx(
                        'resize-none rounded px-3 py-2 ring-1 ring-gray-300 hover:ring-gray-400 focus:ring-2 focus:ring-primary',
                        {
                            '!ring-red-500 focus:!ring-1':
                                formik.touched.address && formik.errors.address,
                        }
                    )}
                    placeholder="VD: Số 100, đường Gì Đó, Phường 50, quận Ngẫu Nhiên, TPHCM"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                ></textarea>
                {formik.touched.address && formik.errors.address && (
                    <div className="text-sm text-red-500">{formik.errors.address}</div>
                )}
            </div>
            <div className="mb-4 flex flex-col">
                <label className="mb-2 text-sm font-semibold">Thời gian xác nhận đơn hàng *</label>
                <div className="flex flex-wrap">
                    <CheckboxGroup
                        values={formik.values.orderConfirmationTimes}
                        setValues={handleTimeChange}
                    >
                        {orderConfirmationTimes?.map((time) => (
                            <CheckboxGroup.Option
                                key={time.id}
                                value={time.id}
                                as="div"
                                className={({ selected }) =>
                                    clsx(
                                        ' mr-2 mt-2 cursor-pointer rounded-sm px-3 py-2 text-sm font-medium ring-1  transition-colors ',

                                        {
                                            'ring-gray-300 can-hover:hover:ring-gray-400':
                                                !selected,
                                            'bg-primary text-[#fff] ring-primary can-hover:hover:bg-primary-dark':
                                                selected,
                                        }
                                    )
                                }
                            >
                                {formatTime(time?.time?.begin) +
                                    ' - ' +
                                    formatTime(time?.time?.end)}
                            </CheckboxGroup.Option>
                        ))}
                    </CheckboxGroup>
                </div>
                {orderConfirmationTimeError && orderConfirmationTimeTouched && (
                    <div className="text-sm text-red-500">{orderConfirmationTimeError}</div>
                )}
            </div>
            <div className="mt-10 flex flex-wrap">
                <Button
                    lg
                    type="submit"
                    disabled={
                        Object.keys(formik.errors).length !== 0 ||
                        orderConfirmationTimeError ||
                        products?.length === 0 ||
                        peddingSubmit
                    }
                    className={clsx('min-w-[10rem] xs:w-full')}
                >
                    {peddingSubmit && <LoadingIcon className="mr-2 h-5 w-5 animate-spin" />}
                    {!peddingSubmit ? <span>Đặt hàng</span> : <span>Đang đặt hàng</span>}
                </Button>
            </div>
        </form>
    );
}

export async function getServerSideProps() {
    let orderConfirmationTimes = [];
    try {
        const orderConfirmationTimesRes = await client.get('/order-confirmation-times', {
            params: {
                populate: ['time'],
            },
        });
        orderConfirmationTimes = orderConfirmationTimesRes.data.data;
    } catch (e) {
        console.log(e);
        orderConfirmationTimes = [];
    }

    return {
        props: {
            orderConfirmationTimes,
        },
    };
}
