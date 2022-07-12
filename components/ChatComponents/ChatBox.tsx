import { useState } from "react";
import LoadingSpinner from "../UtilityComponents/LoadingSpinner";

const ChatList = () => {
    const [ loading, setLoading ] = useState(false);
    
    {/* Display if loading*/}
    if (loading){
        return (
            <>

            {/* Loading ChatBox*/}
            <div className='flex bg-gray-900 w-full h-full'> 
                <div className="flex items-center justify-center h-full w-full">
                    <LoadingSpinner sizeOf ={'small'}></LoadingSpinner>
                </div>
            </div>
            {/* End of Loading ChatBox*/}

            </>
        );
    }
    {/* End of Display if loading*/}

    {/* Display if not loading*/}
    return (
        <>

        {/*ChatBox*/}
        <div className='flex bg-gray-900 w-full h-full'> 

            {/*InputBox*/}
            <div className="flex my-auto ml-6 p-2 w-4/6 h-4/5 border-2 rounded-xl 
                border-teal-500 
                shadow-xl bg-gray-700
                lg:ml-24 text-white resize-none !focus:border-gray-900
                transition-all duration-300 ease-linear cursor-pointer
                ">
            </div>
            {/*End of InputBox*/}

            {/*Send Button*/}
            <button className= "w-1/6 md:w-1/12 mx-auto md:ml-5 my-auto h-4/5 bg-teal-600 p-2 rounded-xl text-white italic text-bold md:text-md flex items-center justify-center transition-all duration-300 ease-linear cursor-pointer hover:scale-105 hover:bg-gray-900 hover:text-teal-500"> Send </button>
            {/*End of Send Button*/}

        </div>
        {/* End of ChatBox*/}

        </>
    );
    {/* End of Display if not loading*/}
};


export default ChatList;