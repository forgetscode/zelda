import { useState } from "react";
import LoadingSpinner from "../UtilityComponents/LoadingSpinner";

const ChatMessages = () => {
    const [ loading, setLoading ] = useState(false);
    
    
    if (!loading){
        return (
            <>
                <div className='flex bg-gray-600 w-full h-full'> 
                    <div className="flex items-center justify-center mt-10 h-full w-full">
                        <LoadingSpinner sizeOf ={"large"}></LoadingSpinner>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className='flex bg-gray-600 w-full h-full'> 
                <div className="flex items-center justify-center h-full w-full">
                    Messages
                </div>
            </div>
        </>
    );
};


export default ChatMessages;