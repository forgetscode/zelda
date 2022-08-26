import { useEffect, useState } from "react";
import LoadingSpinner from "../UtilityComponents/LoadingSpinner";
import ChatItem from "../UtilityComponents/ChatItem";
import AddChatItem from "../UtilityComponents/AddChatItem";
import { useWallet } from "@solana/wallet-adapter-react";
import { CreateWorkspace } from "../UtilityComponents/CreateWorkspace";
import * as sms from '../../utility/smsTools';
import { PublicKey } from "@solana/web3.js";
import { useRecoilState } from "recoil";
import { chatListState } from "../../atoms/Atom";
import { Collapse } from "@chakra-ui/react";

interface ChatData {
    chatPDA:PublicKey,
    data:{
        bump:number,
        chatId:number,
        initializer:PublicKey,
        masterId:PublicKey,
        messageCount:number,
        otherchatId:number,
        receiver:PublicKey
    }
}

const ChatList = () => {
    const [ loading, setLoading ] = useState(true);
    const [chats, setChats] = useState<ChatData[]>();
    const { publicKey, connected } = useWallet();
    const [ reloadChatList, setReloadChatList ] = useRecoilState(chatListState);
    const [ chatBarState, setChatBarState] = useState(true);
    const workspace = CreateWorkspace();

    
    const fetchAccountChats = async () =>{
        const AccountChats = await sms.getAccountChats(publicKey!, workspace)
        setChats(AccountChats)
    }

    useEffect(() => {
        fetchAccountChats().then(() => {
            setLoading(false)
        });
    }, [reloadChatList]);


 
    if (loading){
        return (
            <>
            <div className={`bg-gray-800 lg:w-64 w-32 -mt-16 h-screen flex origin-left transition-all ${chatBarState ?"ml-0" : "lg:-ml-64 -ml-32"}`}> 
                <div className="relative flex items-center justify-center h-screen w-full border border-gray-900 shadow-lg z-10">
                    <LoadingSpinner sizeOf ={'medium'}></LoadingSpinner>
                </div>
                <div className='flex flex-row group'>
                    <button onClick={() => setChatBarState(!chatBarState)} className="absolute h-12 
                        top-1/2 -translate-y-1/2 bg-gray-800 p-1 rounded-r-lg transition-all 
                        duration-300 ease-linear cursor-pointer hover:bg-teal-600
                    hover:text-white text-teal-500 italic text-sm border-l-0 border-gray-900 shadow-lg z-20 -ml-1
                        ">
                        <p>{ chatBarState ? "<" :  ">"}</p>
                        <span className="absolute top-1/2 -translate-y-1/2 h-8 w-auto p-2 min-w-max left-5 rounded-md shadow-md
                                            text-white bg-gray-900 
                                            text-xs font-bold
                                            transition-all duration-100 scale-0 origin-left group-hover:scale-100">
                                            { !chatBarState ? "Expand" :  "Collapse"}
                        </span>
                    </button>
                </div>
            </div>

            </>
        );
    }


    return (
        <>
        <div className={`bg-gray-800 lg:w-64 w-32 -mt-16 h-screen flex origin-left transition-all ${chatBarState ?"ml-0" : "lg:-ml-64 -ml-32"}`}> 
            <div className="z-10 origin-top pt-16 flex flex-col w-full pr-1 space-y-6 overflow-y-scroll overflow-x-hidden !scrollbar-thin 
            !scrollbar-thumb-teal-600 transition-all duration-300 border border-gray-900 shadow-lg">
                {   
                    (chats!.length > 0) ?
                    chats?.map((chat) =>(
                        <ChatItem ID = 
                        {
                            chat.data.receiver.toBase58() == publicKey?.toBase58() ? 
                            chat.data.initializer.toBase58(): chat.data.receiver.toBase58()
                            
                        }></ChatItem>
                    )) : <div className="mt-4 h-12"/>
                }
                <AddChatItem ></AddChatItem>
            </div>
            <div className='flex flex-row group'>
                <button onClick={() => setChatBarState(!chatBarState)} className="absolute h-12 
                    top-1/2 -translate-y-1/2 bg-gray-800 p-1 rounded-r-lg transition-all 
                    duration-300 ease-linear cursor-pointer hover:bg-teal-600
                hover:text-white text-teal-500 italic text-sm border-l-0 border-gray-900 shadow-lg z-20 -ml-1
                    ">
                    <p>{ chatBarState ? "<" :  ">"}</p>
                    <span className="absolute top-1/2 -translate-y-1/2 h-8 w-auto p-2 min-w-max left-5 rounded-md shadow-md
                                        text-white bg-gray-900 
                                        text-xs font-bold
                                        transition-all duration-100 scale-0 origin-left group-hover:scale-100">
                                        { !chatBarState ? "Expand" :  "Collapse"}
                    </span>
                </button>
            </div>
        </div>
        </>
    );

};


export default ChatList;
