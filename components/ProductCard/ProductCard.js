import Link from 'next/link';
import clsx from 'clsx';
import PriceFomater from '../PriceFomater';

export default function ProductCard({ product, className }) {
    const { name, listPrice, salePrice, images, category, slug } = product?.attributes ?? {};
    const categorySlug = category?.data?.attributes?.slug;
    const imageSrc = images?.data?.[0]?.attributes?.formats?.small?.url;
    return (
        <Link href={`/${categorySlug}/${slug}`}>
            <a className={clsx('group select-none', { [className]: className })}>
                <div className="aspect-[7/8] w-full overflow-hidden rounded-lg ring-gray-200 md:aspect-[1/1] xs:aspect-[7/8] can-hover:group-hover:ring-1">
                    <img
                        src={imageSrc}
                        alt={name}
                        className="h-full w-full object-cover object-center transition-opacity can-hover:group-hover:opacity-80"
                    />
                </div>
                <h3 className="mt-4 mb-1 text-sm font-medium text-clr-text">
                    {name ?? 'Sản phẩm không xác định'}
                </h3>
                <div className="flex flex-wrap-reverse items-baseline">
                    <p className="mr-3 text-lg font-medium text-primary-dark xs:text-base">
                        <PriceFomater>{salePrice ?? ''}</PriceFomater>
                    </p>
                    {listPrice && listPrice > salePrice && (
                        <p className=" text-sm line-through xs:text-xs">
                            <PriceFomater>{listPrice ?? ''}</PriceFomater>
                        </p>
                    )}
                </div>
            </a>
        </Link>
    );
}
