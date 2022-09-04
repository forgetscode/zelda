import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import type { NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image'
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CreateWorkspace } from '../components/UtilityComponents/CreateWorkspace';
import LoadingSpinner from '../components/UtilityComponents/LoadingSpinner';
import { notifyFailure, notifyPending, notifySuccess } from '../components/UtilityComponents/Notifications';
import * as sms from '../utility/smsTools';

const Airdrop: NextPage = () => {

    const { publicKey, sendTransaction } = useWallet();
    const [loading, setLoading ] = useState(false)
    const workspace = CreateWorkspace();

    const airdrop = async () => {
    if (publicKey){
        setLoading(true)
        const pendingTransction = notifyPending()
        try{
            console.log(publicKey.toBase58())
            const tx =  await workspace.provider.connection.requestAirdrop(publicKey, 1000000000)
            const confirmation = await workspace.connection.confirmTransaction(tx, 'processed');
            console.log(tx)
            if(!confirmation.value.err){
                toast.dismiss(pendingTransction)
                notifySuccess("Airdrop succesful.")
            }
            else{
                toast.dismiss(pendingTransction)
                notifyFailure("Transaction Error: "+confirmation.value.err.toString());
            }
            setLoading(false)
        }
        catch(err:any){
            toast.dismiss(pendingTransction)
            const errorType = sms.handleChainError(err)
            notifyFailure("Error: " + errorType);
            setLoading(false)
        }
    }
    else {
        notifyFailure("No wallet connected")
    }
    }

    return (
    <>
        <Head>
            <title>Zelda</title>
            <link rel='icon' href="https://icon-library.com/images/mms-icon/mms-icon-17.jpg"/>
            <meta name="description" content="Generated by create next app" />
        </Head>  
        <Toaster/>
        
        <div className='bg-gradient-to-b from-slate-800 to-teal-600/80 flex h-full w-full'>
            <div className='flex flex-col mx-auto mt-16'>
        
                <div className='space-y-8 text-center pt-16 ml-16'>
                    <h1 className='transition-all w-full text-6xl md:text-8xl text-teal-400 font-bold text-center'>
                    AirDrop.
                    </h1>
                    <div>
                        <Image 
                        src="/clouds2.png" 
                        width={312} height={312} 
                        />
                    </div>
                    <p className='w-3/5 mx-auto text-white italic text-xs md:text-sm md:text-md'>
                        This tool is here to send you some Sol. This is devnet Sol and not real Sol.
                    </p>
                    <button className='mx-auto w-20 text-center text-white bg-black flex p-4 rounded-lg hover:bg-gray-900 items-center justify-center transition-all'
                        onClick={() => airdrop()}>
                            { !loading ? "Airdrop" :<LoadingSpinner sizeOf ={"small"}></LoadingSpinner>}
                    </button>
                </div>
            </div>
        </div>
    </>
    )
}

export default Airdrop
