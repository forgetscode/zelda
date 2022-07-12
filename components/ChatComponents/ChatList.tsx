import { useState } from "react";
import LoadingSpinner from "../UtilityComponents/LoadingSpinner";


const ChatList = () => {
    const [ loading, setLoading ] = useState(false);
    
    
    {/* Display if loading*/}
    if (!loading){
        return (
            <>

            {/* ListBox*/}
            <div className='bg-gray-700 w-full h-full flex ml-10'> 
                <div className="flex items-center justify-center h-screen w-full">
                    <LoadingSpinner sizeOf ={'medium'}></LoadingSpinner>
                </div>
            </div>
            {/* End of ListBox*/}

            </>
        );
    }
    {/* End of Display if loading*/}
    

    {/* Display if not loading*/}
    return (
        <>
            {/* ListBox*/}
            <div className='bg-gray-700 w-full h-full flex ml-10'> 

                {/* ItemsList*/}
                <div className="flex items-center justify-center h-screen w-full">
                    chat list
                </div>
                {/* End of ItemsList*/}

            </div>
            {/* End of ListBox*/}

        </>
    );
    {/* Display if not loading*/}

};


export default ChatList;