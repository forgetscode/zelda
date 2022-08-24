import { useWallet } from '@solana/wallet-adapter-react';
import type { NextPage } from 'next'
import { useState } from 'react';
import ChatBox from '../components/ChatComponents/ChatBox';
import ChatList from '../components/ChatComponents/ChatList';
import ChatMessages from '../components/ChatComponents/ChatMessages';
import LoadingSpinner from '../components/UtilityComponents/LoadingSpinner';

const Messages: NextPage = () => {
  const [ chatList, setChatBarState ] = useState(true);
  const { publicKey, connected } = useWallet();

  if (!publicKey){
    return(
        <div className="flex flex-col w-screen h-screen items-center justify-center bg-gray-600 space-y-6">
          <p className='md:text-2xl sm:text-xl text-teal-500 font-bold'>
            Please connect your wallet
          </p>
          <LoadingSpinner sizeOf ={'large'}></LoadingSpinner>
        </div>
    )
  }
  {/* Message area if ChatList hidden*/}
  if (!chatList) {
    return (
      <> 

      {/* Message area Layout if hidden*/}                   
      <div className='w-full flex'>
        <div className="flex-row w-full h-screen ml-16">

            {/* ChatList toggle On*/}    
            <div className='flex flex-row group'>
              <button onClick={() => setChatBarState(true)} className="absolute h-12 
                top-1/2 -translate-y-1/2 bg-gray-800 p-1 rounded-r-lg transition-all 
                duration-300 ease-linear cursor-pointer hover:scale-110 hover:bg-teal-600
              hover:text-white text-teal-500 italic text-sm z-20
                ">
                <p>{">"}</p>
                <span className="absolute top-1/2 -translate-y-1/2 h-8 w-auto p-2 min-w-max left-5 rounded-md shadow-md
                                    text-white bg-gray-900 
                                    text-xs font-bold z-20
                                    transition-all duration-100 scale-0 origin-left group-hover:scale-100">
                                    Expand
                </span>
              </button>
            </div>
            {/* End of ChatList toggle On*/}  

            {/* ChatMessages and ChatBox if ChatList Hidden*/} 
            <div className='flex-col w-full h-full'>


              <div className = "flex h-full w-full -mt-16">
                <ChatMessages/>
              </div>

              <div className = "flex h-16 w-full z-auto">
                <ChatBox/>
              </div>

            </div>
            {/* End of ChatMessages and ChatBox if ChatList Hidden*/} 

          </div>
        </div>
        {/* End of Message area Layout if hidden*/}    

        </>
      );
  }
  {/* End of Message area if ChatList hidden*/}


  {/* Message area if ChatList displayed*/}
  return (
    <> 
    {/* Message area Layout if displayed*/}                        
    <div className='w-full h-full flex'>


      {/* ChatList*/} 
      <div className="flex-row w-80 h-full">
        <ChatList/>
      </div>
      {/* End of ChatList*/} 

      {/* ChatList toggle + ChatBox + ChatMessages*/} 
      <div className="flex-row w-full h-screen">
  
        {/* ChatList toggle off*/}   
        <div className='text-teal-500 flex flex-row group z-20'>
            <button onClick={() => setChatBarState(false)} className="absolute h-12
              top-1/2 -translate-y-1/2 bg-gray-800 p-1 rounded-r-lg transition-all 
              duration-300 ease-linear cursor-pointer hover:scale-110 hover:bg-teal-600
            hover:text-white text-teal-500 italic text-sm 
              ">
              <p>{"<"}</p>
              <span className="absolute top-1/2 -translate-y-1/2 h-8 w-auto p-2 min-w-max left-5 rounded-md shadow-md
                              text-white bg-gray-900 
                              text-xs font-bold
                              transition-all duration-100 scale-0 origin-left group-hover:scale-100">
                              Collapse
              </span>
            </button>
        </div>
        {/* End of ChatList toggle off*/}   

        {/* ChatMessages + ChatBox*/}   
        <div className='flex-col w-full h-full'>

          <div className = "flex h-full w-full -mt-16">
              <ChatMessages/>
            </div>

          <div className = "flex h-16 w-full z-auto">
            <ChatBox/>
          </div>

        </div>
        {/* End of ChatMessages + ChatBox*/}  

      </div>
      {/* End of ChatList toggle + ChatBox + ChatMessages*/} 

    </div>
    {/*End of Message area Layout if displayed*/}  
    </>
  );
  {/* Message area if ChatList displayed*/}

}

export default Messages
