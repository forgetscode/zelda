import type { NextPage } from 'next'
import { useState } from 'react';
import ChatBox from '../components/ChatComponents/ChatBox';
import ChatList from '../components/ChatComponents/ChatList';
import ChatMessages from '../components/ChatComponents/ChatMessages';

const Messages: NextPage = () => {
  const [ chatBar, setChatBarState ] = useState(false);

  if (!chatBar) {
    return (
      <>                    
        <div className='w-full flex'>
          <div className="flex-row w-full h-screen ml-16">

            <div className='text-teal-500 flex flex-row group'>
              <button onClick={() => setChatBarState(true)} className="absolute h-12 
                 top-1/2 -translate-y-1/2 bg-gray-700 p-1 rounded-r-lg transition-all 
                duration-300 ease-linear cursor-pointer hover:scale-110 hover:bg-teal-600
              hover:text-white text-teal-500 italic text-sm
                ">
                  <p>{">"}</p>
                  <span className="absolute top-1/2 -translate-y-1/2 h-8 w-auto p-2 min-w-max left-5 rounded-md shadow-md
                                      text-white bg-gray-900 
                                      text-xs font-bold 
                                      transition-all duration-100 scale-0 origin-left group-hover:scale-100">
                                      Expand
                  </span>
              </button>
            </div>

            <div className='flex-col w-full h-full'>
              <div className = "h-5/6 w-full">
                <ChatMessages/>
              </div>
              <div className = "h-1/6 w-full">
                <ChatBox/>
              </div>
            </div>

          </div>
        </div>
      </>
    );
  }

  return (
    <>                    
      <div className='w-full flex'>
        <div className="flex-row w-80 h-screen">
          <ChatList/>
        </div>
        <div className="flex-row w-full h-screen">
          
          <div className='text-teal-500 flex flex-row group'>
              <button onClick={() => setChatBarState(false)} className="absolute h-12
                    top-1/2 -translate-y-1/2 bg-gray-700 p-1 rounded-r-lg transition-all 
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

          <div className='flex-col w-full h-full'>
            <div className = "h-5/6 w-full">
              <ChatMessages/>
            </div>
            <div className = "h-1/6 w-full">
              <ChatBox/>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Messages