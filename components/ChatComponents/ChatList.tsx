import { useState } from "react";
import LoadingSpinner from "../UtilityComponents/LoadingSpinner";


const ChatList = () => {
    const [ loading, setLoading ] = useState(false);
    
    
    if (!loading){
        return (
            <>
                <div className='bg-gray-700 w-full h-full flex ml-10'> 
                    <div className="flex items-center justify-center h-screen w-full">
                        <LoadingSpinner sizeOf ={'medium'}></LoadingSpinner>
                    </div>
                </div>
            </>
        );
    }

    else {
        return (
            <>
                <div className='bg-gray-700 w-full h-full flex ml-10'> 
                    <div className="flex items-center justify-center h-screen w-full">
                        chat list
                    </div>
                </div>
            </>
        );
    }
};


export default ChatList;