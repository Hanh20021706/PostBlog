import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppPropsWithLayout } from './../models/layout';
import layoutClient from '../components/layout/clientLayout';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Router from 'next/router';
import { useState } from 'react';
// import NProgress from 'nprogress';
// import Head from 'next/head'
// import Loading from '../components/Loading';

// NProgress.configure({ trickle: false });


function MyApp({ Component, pageProps }: AppPropsWithLayout) {

    // const [loading , setLoading] = useState(false)
    const LayoutWrapper = Component.Layout ?? layoutClient;

    // Router.events.on("routeChangeStart" , (url) => {
    //     console.log("route is changing ....");
    //     NProgress.start();
    //     setLoading(true)
        
        
    // })
    // Router.events.on("routeChangeComplete" , (url) => {
    //     console.log("route is changing is complete ....");
    //     NProgress.done();
    //     setLoading(false)
        
    // })
    return (
       
    <LayoutWrapper>

        <Provider store={store}>
            {/* <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="/>
            </Head>
            {loading && <Loading/>} */}
            <Component {...pageProps} />
        </Provider>
    </LayoutWrapper>)
}
export default MyApp