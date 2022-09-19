import '../styles/globals.css';
import { store } from '../redux/store';
import { Provider } from 'react-redux';

export default function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
