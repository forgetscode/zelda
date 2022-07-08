import { useState } from "react";
import LoadingSpinner from "../UtilityComponents/LoadingSpinner";

const ChatList = () => {
    const [ loading, setLoading ] = useState(false);
    
    
    if (!loading){
        return (
            <>
                <div className='flex bg-gray-800 w-full h-full'> 
                    <div className="flex items-center justify-center h-full w-full">
                        <LoadingSpinner sizeOf ={'small'}></LoadingSpinner>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className='flex bg-gray-800 w-full h-full'> 
                <div className="flex items-center justify-center h-full m-auto">
                    chat box
                </div>
            </div>
        </>
    );
};


export default ChatList;