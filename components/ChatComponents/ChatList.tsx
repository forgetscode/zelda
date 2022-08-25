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
    const [ reloadChatList, setReloadChatList ] = useRecoilState(chatListState)
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
            <div className='bg-gray-800 w-full h-full flex'> 
                <div className="ml-16 relative flex items-center justify-center h-screen w-full">
                    <LoadingSpinner sizeOf ={'medium'}></LoadingSpinner>
                </div>
            </div>

            </>
        );
    }

    return (
        <>
            <div className='bg-gray-800 w-full h-full flex '> 
                <div className="flex flex-col w-full mt-16 ml-16 pr-1 space-y-6 overflow-y-scroll overflow-x-hidden !scrollbar-thin 
            !scrollbar-thumb-teal-600 transition-all duration-300">
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
            </div>
        </>
    );

};


export default ChatList;
