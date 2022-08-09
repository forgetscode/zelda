import { useState } from "react";
import LoadingSpinner from "../UtilityComponents/LoadingSpinner";
import ChatItem from "../UtilityComponents/ChatItem";
import AddChatItem from "../UtilityComponents/AddChatItem";


const ChatList = () => {
    const [ loading, setLoading ] = useState(false);
    
    
    {/* Display if loading*/}
    if (loading){
        return (
            <>

            {/* ListBox*/}
            <div className='bg-gray-800 w-full h-full flex'> 
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
            <div className='bg-gray-800 w-full h-full flex'> 
                {/* ItemsList*/}
                <div className="flex flex-col w-full mt-16 ml-16 p-2">
                    <ChatItem ID = {"First chat ID loooooooooooooong"}></ChatItem>
                    <ChatItem ID = {"Secont chat ID"}></ChatItem>
                    <AddChatItem ></AddChatItem>
                </div>
                {/* End of ItemsList*/}
                {/* ItemsList*/}
            </div>
            {/* End of ListBox*/}

        </>
    );
    {/* Display if not loading*/}

};


export default ChatList;
