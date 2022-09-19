import { ArrowUpIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';

export default function GoToTopButton() {
    const [isShow, setIsShow] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
        });
    };
    useEffect(() => {
        const toggleVisible = () => {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                setIsShow(true);
            } else {
                setIsShow(false);
            }
        };
        window.addEventListener('scroll', toggleVisible);

        return () => {
            window.removeEventListener('scroll', toggleVisible);
        };
    }, []);
    return (
        <Button
            primary
            contain
            className={clsx(
                'z-go-to-top-btn fixed right-4 bottom-8 h-[3.5rem] min-w-[3.5rem]  rounded-full transition-all duration-500',
                { 'translate-x-0': isShow, 'translate-x-[150%]': !isShow }
            )}
            onClick={scrollToTop}
        >
            <ArrowUpIcon className="h-6 w-6" />
        </Button>
    );
}
