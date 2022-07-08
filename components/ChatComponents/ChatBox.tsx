import { useState } from "react";
import LoadingSpinner from "../UtilityComponents/LoadingSpinner";

const ChatList = () => {
    const [ loading, setLoading ] = useState(false);
    
    
    if (loading){
        return (
            <>
                <div className='flex bg-gray-900 w-full h-full'> 
                    <div className="flex items-center justify-center h-full w-full">
                        <LoadingSpinner sizeOf ={'small'}></LoadingSpinner>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className='flex bg-gray-900 w-full h-full'> 
        
                    <textarea className="flex my-auto ml-6 p-2 w-4/6 h-4/6 border-2 rounded-xl 
                        border-teal-500 
                        shadow-xl bg-gray-600
                        lg:ml-24 text-white resize-none !focus:border-gray-900
                        transition-all duration-300 ease-linear cursor-pointer
                        ">
                    </textarea>
                    <button className= "w-1/6 mx-auto md:ml-12 my-auto h-4/6 bg-teal-600 p-2 rounded-xl text-white italic text-bold md:text-xl flex items-center justify-center transition-all duration-300 ease-linear cursor-pointer hover:scale-105 hover:bg-gray-900 hover:text-teal-500"> Send </button>
            </div>
        </>
    );
};


export default ChatList;