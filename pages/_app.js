import '../styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import { store } from '../redux/store';
import { Provider } from 'react-redux';

export default function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <>
                <NextNProgress
                    color="#0abd52"
                    startPosition={0.3}
                    stopDelayMs={200}
                    height={3}
                    showOnShallow={true}
                />
                <Component {...pageProps} />
            </>
        </Provider>
    );
}
