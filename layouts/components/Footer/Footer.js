import Link from 'next/link';
import { PhoneIcon } from '@heroicons/react/24/outline';
import { FacebookOutlineIcon } from '../../../components/Icons';

export default function Footer() {
    return (
        <div className="mt-20 flex flex-col items-center border-t border-gray-200 p-p-body py-10">
            <img className="h-8" src="/logo.svg" />
            <nav className="mt-5 flex flex-wrap justify-center">
                <Link href="/">
                    <a className="px-3 py-1 font-light hover:text-clr-text-dark">Trang chủ</a>
                </Link>
                <Link href="/shop">
                    <a className="px-3 py-1 font-light hover:text-clr-text-dark">Shop</a>
                </Link>
                <Link href="/">
                    <a className="px-3 py-1 font-light hover:text-clr-text-dark">Giới thiệu</a>
                </Link>
            </nav>
            <div className="mt-5 flex flex-wrap justify-center">
                <Link href="/">
                    <a className="flex items-center px-2 py-2 text-sm font-medium hover:text-clr-text-dark">
                        <PhoneIcon className="h-6 w-6" />
                        <span className="ml-2.5">0123456789</span>
                    </a>
                </Link>
                <Link href="/">
                    <a className="flex items-center px-2 py-2 text-sm font-medium hover:text-clr-text-dark">
                        <FacebookOutlineIcon className="h-6 w-6 " />
                        <span className="ml-2.5">fb.com/vuonnhoshop</span>
                    </a>
                </Link>
            </div>
            <div className="mt-5 w-full border-t border-gray-200 pt-3 text-center text-sm font-light">
                Bản quyền thuộc về Vườn nhỏ
            </div>
        </div>
    );
}
