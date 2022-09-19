import SlideDesktop from './SlideDesktop';
import SlideMobile from './SlideMobile';

export default function HighlightProductSlide({ products }) {
    return (
        <>
            <SlideDesktop products={products} />
            <SlideMobile products={products} />
        </>
    );
}
