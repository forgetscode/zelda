import { useWallet } from '@solana/wallet-adapter-react';
import type { NextPage } from 'next'
import { useState } from 'react';
import ChatList from '../components/ChatComponents/ChatList';
import ChatMessages from '../components/ChatComponents/ChatMessages';
import LoadingSpinner from '../components/UtilityComponents/LoadingSpinner';

const Messages: NextPage = () => {

  const { publicKey, connected } = useWallet();

  if (!publicKey){
    return(
        <div className="flex flex-col w-screen h-screen items-center justify-center bg-gray-600 space-y-6 pl-16 ">
          
          <p className='md:text-2xl text-md text-teal-400 font-bold font-mono'>
            Please connect your wallet
          </p>
          <LoadingSpinner sizeOf ={'large'}></LoadingSpinner>
        </div>
    )
  }
  {/* Message area if ChatList hidden*/}

  return (
    <> 
    {/* Message area Layout if hidden*/}                   
    <div className='pl-16 pt-16'>
      <div className="absolute z-30">
        <ChatList/>
      </div>

      <div className='w-full h-full z-10'>
          <ChatMessages/>
      </div>

      
    </div>
      </>
  );
}

export default Messages
