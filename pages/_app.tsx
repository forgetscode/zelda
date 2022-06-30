import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SideBar from '../components/SideBar';

function MyApp({ Component, pageProps }: AppProps) {
    return (
      <>
        <SideBar></SideBar>
        <div className='ml-20'>
          <Component {...pageProps}   />
        </div>
      </>
    );
}

export default MyApp
