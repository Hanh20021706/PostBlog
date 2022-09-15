import '../styles/globals.css'
import { AppPropsWithLayout } from './../models/layout';
import layoutClient from '../components/layout/clientLayout';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

    
    const LayoutWrapper = Component.Layout ?? layoutClient;

    return (
       
    <LayoutWrapper>

        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    </LayoutWrapper>)
}
export default MyApp