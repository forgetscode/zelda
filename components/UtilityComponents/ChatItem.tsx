import { CloseIcon, CopyIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import toast, { Toaster } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { chatListState } from '../../atoms/Atom';
import { notifyFailure, notifyPending, notifySuccess } from './Notifications';
import * as sms from '../../utility/smsTools';
import { workspace } from '@project-serum/anchor';
import { CreateWorkspace } from './CreateWorkspace';

interface ChatInfo {
    ID: string
    chatPDA:PublicKey,
    data:{
        bump:number,
        chatId:number,
        initializer:PublicKey,
        masterId:PublicKey,
        messageCount:number,
        otherChatId:number,
        receiver:PublicKey
    }
}

const ChatItem:React.FC<ChatInfo> =({ID, chatPDA, data}: ChatInfo) => {
    
    const [ reloadChatList, setReloadChatList ] = useRecoilState(chatListState)
    const { publicKey, connected } = useWallet();
    const workspace = CreateWorkspace();
    
    const onDelete = async () => {
        const otherID = await new PublicKey(ID)
        const pendingTransction = notifyPending()
        try{
            const tx = await sms.closeChat(otherID, chatPDA, data, workspace)
            const confirmation = await workspace.connection.confirmTransaction(tx, 'processed');
            if(!confirmation.value.err){
                toast.dismiss(pendingTransction)
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
        <Toaster/>
        <div className="flex flex-row self-center items-center w-5/6 p-2 mt-4 h-12 text-center space-x-1
        rounded-xl text-teal-500  bg-gray-900 hover:bg-teal-600 transition-all hover:text-white justify-between">
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
                        cursor-pointer">
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
                <CloseIcon w={8} h={8}/>
                <span className="absolute -ml-6 -mt-9 h-8 p-2 rounded-md shadow-md
                              text-white bg-gray-900 
                              text-xs font-bold z-auto
                              transition-all duration-100 scale-0 origin-left group-hover:scale-100 ">
                              Delete
              </span>
            </div>

        </div>
        </>
    );
};


export default ChatItem;
