import { ArrowForwardIcon, RepeatIcon } from "@chakra-ui/icons";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { activeChatState, chatListState, messageListState } from "../../atoms/Atom";
import { updateMessageCookie } from "../../utility/cookies";
import * as sms from '../../utility/smsTools';
import { CreateWorkspace } from "../UtilityComponents/CreateWorkspace";
import LoadingSpinner from "../UtilityComponents/LoadingSpinner";
import Message from "../UtilityComponents/Message";
import { notifyFailure, notifyPending, notifySuccess } from "../UtilityComponents/Notifications";

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

interface Input {
    input:string
  }

const ChatMessages = () => {
    const [loading, setLoading ] = useState(false);
    const [count, setCount] = useState(0);
    const {publicKey} = useWallet();
    const [activeChat, setActiveChat] = useRecoilState(activeChatState)
    const [reloadMessageList, setReloadMessageList] = useRecoilState(messageListState);
    const [reloadChatList, setReloadChatList] = useRecoilState(chatListState);
    const [messages, setMessages] = useState<MessageData[] | null>();
    const workspace = CreateWorkspace();

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
      } = useForm<Input>();

    const fetchChatMessages= async () =>{
        setLoading(true)
        if(activeChat != null){
            try{
                const data= await sms.getMessagesByChat(activeChat?.chatPDA!, workspace)
                setMessages(data)
            }
            catch{
                setActiveChat(null)
                setReloadMessageList(!reloadMessageList)
                setReloadChatList(!reloadChatList)
            }
        }
        else{
            return
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetchChatMessages().then(() => {
            setLoading(false)
            signal: signal
        });
        return () => {
            controller.abort();
        };
    }, [activeChat, reloadMessageList]);


    useEffect(()=> {
        const element = document.getElementById("scroll-bottom")
        element?.scrollIntoView(false)
    }, [messages]);
    
    
    //solana web socket
    useEffect(()=> {
        let isApiSubscribed = true;
        if (activeChat) {
            const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
            connection.onAccountChange(
                activeChat.chatPDA,
                (updatedAccountInfo, context) =>
                setReloadMessageList(!reloadMessageList),
                "confirmed"
            );
        }
        return () => {
            isApiSubscribed = false;
        }
    }, [activeChat]);


     
    const onSubmit: SubmitHandler<Input> = async ({input}) => {
        if (activeChat == null) return
        const pendingTransction = notifyPending()
        try{
            const tx = await sms.initializeMessage(activeChat?.chatPDA!, publicKey!, input, workspace)
            const confirmation = await workspace.connection.confirmTransaction(tx, 'processed')
            if(!confirmation.value.err){
                toast.dismiss(pendingTransction)
                notifySuccess("Message sent.")
                const textarea =(document.getElementById('message-area') as HTMLInputElement)
                textarea.value = ''
                setCount(0)
                updateMessageCookie(activeChat?.chatPDA!, activeChat?.data.messageCount + 1) 
                setReloadMessageList(!reloadMessageList)
            }
            else{
                toast.dismiss(pendingTransction)
                notifyFailure("Transaction Error: "+confirmation.value.err.toString())
            }
        }
        catch(err:any){
            toast.dismiss(pendingTransction)
            const errorType = sms.handleChainError(err)
            notifyFailure("Error: " + errorType)
        }
      }
      
    
    if (!messages && loading){
        return (
            <>
            <div className="absolute h-full w-full -ml-16 -mt-16 flex flex-col">
                <div className = "pl-16 pt-16 h-full w-full bg-gray-600">
                    {
                        activeChat !=  null
                        ? 
                            <div className=" text-sm
                            p-2 font-mono text-white
                            bg-gray-800 h-16 mb-2 bg-opacity-80 flex-col items-center justify-center ">

                                    <p className="text-teal-500 font-mono">Chat with: </p>
                                    <p className=" "> {activeChat.ID} </p>
                            </div>
                        :
                        ""
                    }
                    <div className="flex -ml-16 -mt-16 h-full items-center justify-center">
                        <LoadingSpinner sizeOf ={"large"}></LoadingSpinner>
                    </div>
                    <div id={"scroll-bottom"}></div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-row pl-[88px] p-6 bg-gray-900 w-full mx-auto'>
                    <textarea id ="message-area" className='relative p-2 bg-gray-800 w-full text-white focus:outline focus:outline-teal-500 
                    transition-all resize scrollbar-hide ' 
                    {...register("input", {required: true, minLength: 1, maxLength:212})}
                    onChange={e => setCount(e.target.value.length)}
                    />
                    <p className={`relative right-10 top-30 text-[11px] ${ count< 213 ? "text-teal-500" : "text-red-500"} "`}>{count}/212</p>
                    <button className=" h-13 w-12 -ml-6 
                        bg-gray-800 p-1 px-5 text-bold mtext-md flex items-center justify-center 
                        text-teal-500 font-mono transition-all cursor-pointer 
                        hover:text-black hover:bg-teal-500">
                            <ArrowForwardIcon/>
                    </button>
                </form>
            </div>
            </>
        );
    }
    return (
        <>
        <div className="absolute h-full w-full -ml-16 -mt-16 flex flex-col">
            <div className ="pl-16 pt-16 h-full w-full bg-gray-600 overflow-y-scroll
             overflow-x-hidden !scrollbar-thin !scrollbar-thumb-teal-600"
             >
                {
                    activeChat != null 
                    ? 
                        <div className="fixed w-full text-sm
                         p-2 text-white flex z-20
                        bg-gray-800 h-16 mb-2 md:bg-opacity-50 flex-col">
                                <p className="text-teal-500 ">Chat with: </p>
                                <div className="flex flex-row justify-between">
                                    <p className="w-24 pt-0.5 text-xs sm:w-full truncate ..."> {activeChat.ID} </p>
                                    <div className="text-teal-500 -mt-1 mr-20 cursor-pointer group"
                                        onClick={() => setReloadMessageList(!reloadMessageList)}
                                        >
                                        <RepeatIcon className="hover:animate-spin" h={24} w={24}></RepeatIcon> 
                                    
                                        <span className="absolute -ml-11 -mt-7 h-8 p-2 rounded-md shadow-md
                                            text-white bg-gray-900 
                                            text-md z-auto
                                            transition-all duration-100 scale-0 origin-bottom group-hover:scale-100 ">
                                            Reload
                                        </span>
                                    </div>
                                </div>
                        </div>
                    :
                    ""
                }
                <div className="pb-[68px]"/>
                {
                    messages?.map((message) => (
                        <React.Fragment key={message.PDA.toBase58()}>
                            <Message PDA={message.PDA} data={message.data}/>
                        </React.Fragment>
                    ))
                }
                <div id={"scroll-bottom"}>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-row pl-[88px] p-6 bg-gray-900 w-full mx-auto'>
                <textarea onSubmit={handleSubmit(onSubmit)}  id ="message-area" className='relative p-2 bg-gray-800 w-full text-white focus:outline focus:outline-teal-500 
                transition-all resize scrollbar-hide ' 
                {...register("input", {required: true, minLength: 1, maxLength:212})}
                onChange={e => setCount(e.target.value.length)}
                />
                <p className={`relative right-10 top-30 text-[11px] ${ count< 213 ? "text-teal-500" : "text-red-500"} "`}>{count}/212</p>
                <button className=" h-13 w-12 -ml-6 
                    bg-gray-800 p-1 px-5 text-bold mtext-md flex items-center justify-center 
                    text-teal-500 font-mono transition-all cursor-pointer 
                    hover:text-black hover:bg-teal-500">
                        <ArrowForwardIcon/>
                </button>
            </form>
        </div>
        </>
    );

};


export default ChatMessages;