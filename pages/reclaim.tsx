import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';
import type { NextPage } from 'next'
import Head from 'next/head';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Typed from 'react-typed';
import { CreateWorkspace } from '../components/UtilityComponents/CreateWorkspace';
import LoadingSpinner from '../components/UtilityComponents/LoadingSpinner';
import { notifyFailure, notifyPending, notifySuccess } from '../components/UtilityComponents/Notifications';
import * as sms from '../utility/smsTools';
import * as anchor from "@project-serum/anchor";

interface MessageData {
    PDA:PublicKey,
    data:{
        bump: number,
        initializer:PublicKey,
        masterId: PublicKey,
        message:string,
        messageId:number,
    }
  }

const Reclaim: NextPage = () => {

    const [loading, setLoading ] = useState(false)
    const [data, setData] = useState<any>()
    const { publicKey, wallet} = useWallet();
    const workspace = CreateWorkspace();

    const fetchData = async () =>{
        if (publicKey){
            setLoading(true)
            const data = await workspace.connection.getProgramAccounts(
                workspace.programID
            )
            const messages:MessageData[] = await sms.checkMessage(data, workspace)
            const results = messages.filter(each => each.data.initializer.toBase58() == publicKey?.toBase58())
            setData(results)
            setLoading(false)
        }
        else{
            notifyFailure("No wallet connected")
        }
    }

    const reclaim = async () => {
        const pendingTransction = notifyPending()
        try{
            if (data.length !=0) {
                for(let i=0;i<data.length;i++){
                    const tx = await workspace.program.methods.closeMessage()
                    .accounts(
                    {
                        message: data[i].PDA,
                        initializer: data[i].data.initializer,
                        systemProgram: anchor.web3.SystemProgram.programId,
                    },
                    ).rpc();
                    const confirmation = await workspace.connection.confirmTransaction(tx, 'processed');
                    if(!confirmation.value.err){
                        toast.dismiss(pendingTransction)
                        notifySuccess("A messages was succesfully deleted")
                    }
                    else{
                        toast.dismiss(pendingTransction)
                        notifyFailure("Transaction Error: "+confirmation.value.err.toString());
                    }
                }
            }
            else{
                toast.dismiss(pendingTransction)
                notifySuccess("There are no messages to delete")
            }

        }
        catch(err:any){
            toast.dismiss(pendingTransction)
            const errorType = sms.handleChainError(err)
            notifyFailure("Error: " + errorType);
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
        
        <div className='bg-[#101010] flex h-full w-full'>
            <div className='flex flex-col mx-auto mt-16'>
        
                <div className='space-y-8 text-center pt-16 ml-16'>
                    <h1 className='transition-all w-full text-6xl md:text-8xl text-teal-500 font-bold text-center'>
                    Reclaim.
                    </h1>
                    <div className='flex flex-row w-full items-center justify-center'>
                        <p className='flex py-6 text-2xl md:text-4xl text-bold text-white font-manrope'>
                            {"Data "}
                        </p>
                        <Typed
                        className=' pl-1.5 flex py-6 text-2xl md:text-4xl text-bold font-manrope text-teal-500 transition-all '
                        strings={[' has a cost.', ' is time.', '', '',' is $.' ]} typeSpeed={100} backSpeed={100} loop/>
                    </div>
                    <p className='w-3/5 mx-auto text-teal-500 italic text-xs md:text-sm md:text-md'>
                        This tool is here to help you reclaim your Sol by closing old messages.
                        Reading and filtering all messages is a beefy call so click the button to load when you're ready to begin.
                    </p>
                    {
                        data
                        ?                    
                        <button className='mx-auto w-20 text-center bg-teal-600 flex p-6 rounded-lg hover:bg-teal-400 items-center justify-center transition-all'
                        onClick={()=> {reclaim()}}>
                            { !loading ? "Ready" :<LoadingSpinner sizeOf ={"small"}></LoadingSpinner>}
                        </button>
                        :
                        <button className='mx-auto w-20 text-center bg-teal-600 flex p-6 rounded-lg hover:bg-teal-400 items-center justify-center transition-all'
                        onClick={()=> {fetchData()}}>
                            { !loading ? "Load" :<LoadingSpinner sizeOf ={"small"}></LoadingSpinner>}
                        </button>

                    }
                </div>
            </div>
        </div>
    </>
    )
}

export default Reclaim