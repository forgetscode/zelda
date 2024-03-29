import { CloseIcon, CopyIcon } from '@chakra-ui/icons';
import { PublicKey } from '@solana/web3.js';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { chatListState, activeChatState, messageListState} from '../../atoms/Atom';
import { notifyFailure, notifyPending, notifySuccess } from './Notifications';
import * as sms from '../../utility/smsTools';
import { CreateWorkspace } from './CreateWorkspace';
import { updateMessageCookie } from '../../utility/cookies';
import { useState } from 'react';

interface ChatInfo {
    ID: string,
    chatPDA:PublicKey,
    data:{
        bump:number,
        chatId:number,
        initializer:PublicKey,
        masterId:PublicKey,
        messageCount:number,
        otherChatId:number,
        receiver:PublicKey
    },
    newStatus:boolean
}

const ChatItem:React.FC<ChatInfo> =({ID, chatPDA, data, newStatus}: ChatInfo) => {
    
    const [reloadChatList, setReloadChatList] = useRecoilState(chatListState)
    const [activeChat, setActiveChat] = useRecoilState(activeChatState)
    const [reloadMessageList, setReloadMessageList] = useRecoilState(messageListState)
    const [display, setDisplay] = useState(true)
    const workspace = CreateWorkspace();

    const chatData = {
        ID,
        chatPDA,
        data
    }
    
    const onDelete = async () => {
        const otherID = await sms.MakePublicKey(ID)
        if(otherID == false){
            notifyFailure("Error: Invalid PublicKey");
            return
        }
        const pendingTransction = notifyPending()
        try{
            const tx = await sms.closeChat(otherID, chatPDA, data, workspace)
            const confirmation = await workspace.connection.confirmTransaction(tx, 'processed');
            if(!confirmation.value.err){
                toast.dismiss(pendingTransction)
                setActiveChat(null)
                setReloadMessageList(!reloadMessageList)
                setReloadChatList(!reloadChatList)
                notifySuccess("Chat Deleted")
            }
            else{
                toast.dismiss(pendingTransction)
                notifyFailure("Transaction Error: "+confirmation.value.err.toString());
            }
        }
        catch(err:any){
            toast.dismiss(pendingTransction)
            const errorType = sms.handleChainError(err)
            notifyFailure("Error: " + errorType);
        }
    }

    return (
        <>
        <div className={`flex flex-row self-center items-center w-5/6 p-2 mt-4 h-12 text-center space-x-1
        rounded-xl   hover:bg-teal-600 transition-all hover:text-white justify-between
        ${activeChat?.chatPDA == chatData.chatPDA ? "bg-teal-600 text-white" : "bg-gray-900 text-teal-500 "}`}>
            <div className="group mb-1
                    ">
                <CopyIcon w={14} h={14} className='cursor-pointer hover:scale-110 hover:text-black'
                onClick={() => {navigator.clipboard.writeText(ID)}}/>
                <span className="absolute -ml-6 -mt-7 h-8 p-2 rounded-md shadow-md
                    text-white bg-gray-900 
                    text-xs font-bold z-auto
                    transition-all duration-100 scale-0 origin-left group-hover:scale-100 ">
                    Copy
                </span>
            </div>
            <div className="
                        w-12 text-sm md:w-36 truncate ... 
                        rounded-xl p-1
                        cursor-pointer"
                        onClick={() => {
                            setActiveChat(chatData), 
                            newStatus ? updateMessageCookie(chatData?.chatPDA!, chatData?.data.messageCount): null,
                            setDisplay(false)
                        }}
                        >
                {ID}
            </div>
            <div className="
                        top-1/2 translate-y-1/2 flex flex-row
                        rounded-xl
                        hover:text-black cursor-pointer 
                        group pl-2 mb-1
                        "
                onClick={() => onDelete()}
                >
                <span className='flex flex-col'>
                    { 
                        newStatus && display
                        ?
                        <div className='absolute h-3 w-3'>
                            <span className="absolute -mt-5 animate-ping rounded-full h-2.5 w-2.5 bg-teal-400 z-10 opacity-75"></span>
                            <span className='absolute -mt-5 rounded-full h-2.5 w-2.5 bg-teal-500 z-10'/>
                        </div>
                        :
                        ""
                    }
                    <CloseIcon w={8} h={8}/>
                    <span className="absolute -ml-6 -mt-9 h-8 p-2 rounded-md shadow-md
                                text-white bg-gray-900 
                                text-xs font-bold z-20
                                transition-all duration-100 scale-0 origin-left group-hover:scale-100 ">
                                Delete
                </span>
              </span>
            </div>
        </div>
        </>
    );
};


export default ChatItem;
