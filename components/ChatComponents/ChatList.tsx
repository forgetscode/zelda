import { useState } from "react";
import LoadingSpinner from "../UtilityComponents/LoadingSpinner";
import ChatItem from "../UtilityComponents/ChatItem";
import AddChatItem from "../UtilityComponents/AddChatItem";


const ChatList = () => {
    const [ loading, setLoading ] = useState(false);
    
    if (loading){
        return (
            <>
            <div className='bg-gray-800 w-full h-full flex'> 
                <div className="flex items-center justify-center h-screen w-full">
                    <LoadingSpinner sizeOf ={'medium'}></LoadingSpinner>
                </div>
            </div>

            </>
        );
    }

    return (
        <>
            <div className='bg-gray-800 w-full h-full flex'> 
                <div className="flex flex-col w-full mt-20 ml-16 space-y-6">
                    <ChatItem ID = {"DfT3LJ75YTamopdp9grXpUv3ZrtqGfsDiJghBKn5DJbB"}></ChatItem>
                    <ChatItem ID = {"8FXZC9g4GXc8wRDDxr65ToFyJAdTt12KGvbucmD8cKuQ"}></ChatItem>
                    <AddChatItem ></AddChatItem>
                </div>
            </div>
        </>
    );

};


export default ChatList;
