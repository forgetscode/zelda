import { useState } from "react";
import LoadingSpinner from "../UtilityComponents/LoadingSpinner";

const ChatMessages = () => {
    const [ loading, setLoading ] = useState(false);
    

    {/* Display if loading*/}
    if (loading){
        return (
            <>

            {/* Message Box*/}
            <div className='flex bg-gray-600 w-full h-full z-1'> 
                <div className="flex items-center justify-center mt-10 h-full w-full">
                    <LoadingSpinner sizeOf ={"large"}></LoadingSpinner>
                </div>
            </div>
            {/* End of Message Box*/}

            </>
        );
    }
    return (
        <>

        {/* Message Box*/}
        <div className='flex bg-gray-600 w-full h-full z-1'> 

            {/* Message Span*/}
            <div className="flex items-center justify-center h-full w-full">
            </div>
            {/* End of Message Span*/}

        </div>
        {/* End of Message Box*/}

        </>
    );
    {/* Display if not loading*/}

};


export default ChatMessages;