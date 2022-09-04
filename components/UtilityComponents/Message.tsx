import { CloseIcon } from '@chakra-ui/icons';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js'
import React from 'react'
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { messageListState } from '../../atoms/Atom';
import * as sms from '../../utility/smsTools';
import { CreateWorkspace } from './CreateWorkspace';
import { notifyFailure, notifyPending, notifySuccess } from './Notifications';

interface MessageData {
    PDA:PublicKey,
    data: {
        bump:number,
        initializer:PublicKey,
        masterId: PublicKey,
        message: string,
        messageId: number
    }
}


const Message = ({PDA, data}:MessageData) => {
    const {publicKey} = useWallet();
    const [reloadMessageList, setReloadMessageList] = useRecoilState(messageListState);
    const workspace = CreateWorkspace();
    
    const onDelete = async () => {
        const pendingTransction = notifyPending()
        try{
            const tx = await sms.closeMessage(PDA, publicKey!, workspace)
            const confirmation = await workspace.connection.confirmTransaction(tx, 'processed');
            if(!confirmation.value.err){
                toast.dismiss(pendingTransction)
                setReloadMessageList(!reloadMessageList)
                notifySuccess("Message Deleted")
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

    if (data.initializer.toBase58() != publicKey!.toBase58()){
        return (
            <div className="flex p-1 pl-7">
                <div className="message-received">
                    {data.message}
                </div>
            </div> 
            
        )
    }
    else{
        return(
            <div className=" flex p-1 pr-7 justify-end">
                <div className="message-sent group pr-1.5">
                    {data.message}
                    <div className=" z-10
                                rounded-xl -mt-4 -ml-1
                                text-red-500 cursor-pointer 
                                scale-0 group-hover:scale-100
                                "
                        onClick={() => onDelete()}
                        >
                        <CloseIcon w={8} h={8}/>
                    </div>
                </div> 
            </div> 
        )
    }
}

export default Message