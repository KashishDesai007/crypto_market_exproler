import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import Providers from 'src/providers/Providers';
import Layout from '@/components/Layout';
import 'antd/dist/reset.css';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/CME.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/CME.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/CME.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/CME.png" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <Providers>
        <div className={`${inter.className} min-h-screen`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </Providers>
    </>
  );
}


