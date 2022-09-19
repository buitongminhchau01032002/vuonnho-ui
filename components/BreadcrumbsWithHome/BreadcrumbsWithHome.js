import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';

export default function BreadcrumbsWithHome({ values }) {
    return (
        <div className="flex flex-wrap items-center">
            <Link href="/">
                <a className="-mr-5 flex pr-3 hover:text-clr-text-dark xs:pr-2">
                    <HomeIcon className="h-6 w-6 xs:h-5 xs:w-5" />
                </a>
            </Link>
            {values.map((breadcrumbItem) => (
                <div key={breadcrumbItem.href} className="ml-5 -mr-5 flex items-baseline">
                    {/* <ChevronRightIcon className="h-4 w-4" /> */}
                    <span className="text-clr-text-light xs:text-sm">{'/'}</span>
                    <Link href={breadcrumbItem.href}>
                        <a className="flex px-3 hover:text-clr-text-dark xs:px-2 xs:text-sm">
                            {breadcrumbItem.title}
                        </a>
                    </Link>
                </div>
            ))}
        </div>
    );
}
