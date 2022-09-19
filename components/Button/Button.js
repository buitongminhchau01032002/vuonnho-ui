import clsx from 'clsx';
import Link from 'next/link';

function LinkPassComp({ className, children, ...passProps }) {
    return (
        <Link {...passProps}>
            <a className={className}>{children}</a>
        </Link>
    );
}

export default function Button({
    children,
    href,
    onClick,
    primary,
    secondary,
    contain,
    outline,
    text,
    sm,
    lg,
    md,
    disabled = false,
    className,
    ...passProps
}) {
    if (!contain && !outline && !text) {
        contain = true;
    }
    if (!primary && !secondary) {
        primary = true;
    }
    if (!sm && !md && !lg) {
        md = true;
    }
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (href) {
        props.href = href;
        Comp = LinkPassComp;
    }
    const classes = clsx(
        'rounded-lg',
        'min-w-[7rem]',
        'cursor-pointer',
        'transition-colors',
        'text-sm font-semibold',
        'inline-flex items-center justify-center',
        {
            'text-[#fff]': contain,
            'bg-primary hover:bg-primary-dark': contain && primary,
            'bg-secondary hover:bg-secondary-light': contain && secondary,

            'ring-1 ring-slate-900/10 hover:ring-slate-900/20': outline,

            'hover:shadow': text,
            'text-primary': (outline || text) && primary,
            'text-secondary': (outline || text) && secondary,

            'h-9 px-3': sm,
            'h-10 px-4': md,
            'h-11 px-4': lg,

            'pointer-events-none opacity-50': disabled,

            [className]: className,
        }
    );

    return (
        <Comp className={classes} {...props}>
            {children}
        </Comp>
    );
}
