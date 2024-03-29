import '../styles/globals.css'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider,  } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { AppProps } from 'next/app';
// Use require instead of import since order matters
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

import SideBar from '../components/SideBar';
import { useMemo } from 'react';
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {

    const network = (process.env.NEXT_PUBLIC_NETWORK === "devnet") ? WalletAdapterNetwork.Devnet : WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new LedgerWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network }),
        ],
        [network]
    );

    return (
      <>
      {/* All pages*/}

        {/* Wallet adapter*/}
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
            <RecoilRoot>
                {/* Navigation and sidebar overlayed onto page*/}
                <SideBar></SideBar>

                {/* Screen*/}
                <div className='h-screen'>
                  <Component {...pageProps}/>
                </div>
                {/*End of Screen*/}
            </RecoilRoot>
         </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      {/* End of Wallet adapter*/}

      {/* End of All pages*/}
      </>
    );
}

export default MyApp
