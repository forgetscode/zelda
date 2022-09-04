import { PublicKey } from '@solana/web3.js'
import * as anchor from "@project-serum/anchor";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { Sms2 } from '../target/types/sms2';

interface ChatData {
  bump:number,
  chatId:number,
  initializer:PublicKey,
  masterId:PublicKey,
  messageCount:number,
  otherChatId:number,
  receiver:PublicKey
}

interface Data {
  account: any,
  pubkey: PublicKey,
}

interface Message {
  bump: number,
  initializer:PublicKey,
  masterId: PublicKey,
  message:string,
  messageId:number,
}
  
type Workspace =  {
    wallet: WalletContextState;
    programID: PublicKey;
    network: string;
    connection: Connection;
    provider: anchor.Provider;
    program: anchor.Program<Sms2>;
}

  export const MakePublicKey = async(key:string | PublicKey) => {
    try{
      key = await new PublicKey(key)
    }
    catch{
      return false
    }
    return key
  }

  export const checkMessage = async (programData:Data[], workspace:Workspace) => {
    type MessageData = {
      PDA: PublicKey, 
      data: Message
    }
    let messages:MessageData[] = []
    try{
        for (let i = 0; i < programData.length; i++) { 
            try{
                const result = await workspace.program.account.message.fetch(programData[i].pubkey)
                let obj = {
                  PDA:programData[i].pubkey,
                  data:result,
                }
                messages.push(obj)
            }
            catch{
                continue
            }
        }
     }
    catch(err:any){
        return err
    }
    return messages
  }

  export const GetPDAInitializer = async(initializer:PublicKey, chat_id:number, workspace:Workspace) => {
        const [chat_initializer, _ ] = await PublicKey.findProgramAddress(
        [
            anchor.utils.bytes.utf8.encode("chat_initializer"),
            initializer.toBuffer(),
            Buffer.from([chat_id]),
        ],
        workspace.program.programId
        )

        return chat_initializer;
  }

  export const GetPDAReceiver = async(receiver:PublicKey, chat_id:number, workspace:Workspace) => {
    const [chat_receiver, _ ] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("chat_receiver"),
        receiver.toBuffer(),
        Buffer.from([chat_id]),
      ],
      workspace.program.programId
    )
    return chat_receiver;
  }

  export const GetPDAMessage = async(master_id:PublicKey, message_id:number, workspace:Workspace) => {

    const [ message, _ ] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("message"),
        master_id.toBuffer(),
        Buffer.from([message_id]),
      ],
      workspace.program.programId
    )

    return message;
  }

  const resolveInitializerChatIndex= async(account:PublicKey, index:number, workspace:Workspace) => {
    try{
      let cursor = await GetPDAInitializer(account, index, workspace);
      let data = await workspace.program.account.chat.fetch(cursor);
      return {
        index:index,
        response:true,
      }
    }
    catch(err){
      return {
        index:index,
        response:false,
      }
    }
  }


  // first index missing -1 if none return err
  export const getIndexInitializer = async(account:PublicKey, workspace:Workspace) => {
    type IndexData = {
      index: number,
      response: boolean
    }
    const data: Promise<IndexData>[] = [];

    for (let i = 1; i < 7; i++) { 
      data.push(resolveInitializerChatIndex(account, i, workspace))
    }

    const resolvedData = (await Promise.all(data)).sort((a, b) => a.index < b.index ? -1 : 1)
    try{
      const index = resolvedData?.find(element => element.response === false)?.index! -1
      return index
    }
    catch{
      return 0
    }
  }

  const resolveReceiverChatIndex= async(account:PublicKey, index:number, workspace:Workspace) => {
    try{
      let cursor = await GetPDAReceiver(account, index, workspace);
      let data = await workspace.program.account.chat.fetch(cursor);
      return {
        index:index,
        response:true,
      }
    }
    catch(err){
      return {
        index:index,
        response:false,
      }
    }
  }


  // first index missing -1 if none return err
  export const getIndexReceiver= async(account:PublicKey, workspace:Workspace) => {
    type IndexData = {
      index: number,
      response: boolean
    }
    const data: Promise<IndexData>[] = [];

    for (let i = 1; i < 7; i++) { 
      data.push(resolveReceiverChatIndex(account, i, workspace))
    }

    const resolvedData = (await Promise.all(data)).sort((a, b) => a.index < b.index ? -1 : 1)
    try{
      const index = resolvedData?.find(element => element.response === false)?.index! -1
      return index
    }
    catch{
      return 0
    }
  }

  const resolveChatsInitializer = async(account:PublicKey, index:number,  workspace:Workspace) => {
    try{
      let chatPDA = await GetPDAInitializer(account, index, workspace);
      const chatData = await workspace.program.account.chat.fetch(chatPDA);
      return{
        chatPDA:chatPDA,
        data:chatData,
      }
    }
    catch(err){
      return index
    }
  }
  const resolveChatsReceiver = async(account:PublicKey, index:number,  workspace:Workspace) => {
    try{
      let chatPDA = await GetPDAReceiver(account, index, workspace);
      const chatData = await workspace.program.account.chat.fetch(chatPDA);
      return{
        chatPDA:chatPDA,
        data:chatData,
      }
    }
    catch(err){
      return index
    }
  }

  export const getInitializerChats = async(account:PublicKey, workspace:Workspace) => {
    type PDAChatData = {
      chatPDA: PublicKey,
      data: ChatData,
    }

    const data: Promise<PDAChatData| number >[] = [];


    for (let i = 1; i < 7; i++) { 
      data.push(resolveChatsInitializer(account, i, workspace));
    }
    const resolvedData = (await Promise.all(data)).filter((x): x is PDAChatData => typeof x !== "number")

    return resolvedData
  }

  export const getReceiverChats = async(account:PublicKey, workspace:Workspace) => {
    type PDAChatData = {
      chatPDA: PublicKey,
      data: ChatData,
    }

    const data: Promise<PDAChatData| number >[] = [];


    for (let i = 1; i < 7; i++) { 
      data.push(resolveChatsReceiver(account, i, workspace));
    }
    const resolvedData = (await Promise.all(data)).filter((x): x is PDAChatData => typeof x !== "number")

    return resolvedData
  }

  export const getAccountChats = async(account:PublicKey, workspace:Workspace) => {
    try{
      const initializeChats = await getInitializerChats(account, workspace);
      const ReceiverChats = await getReceiverChats(account, workspace);
      return initializeChats.concat(ReceiverChats);
    }
    catch(err:any){
      return(err)
    }
  }

  const resolvePDAMessage = async(masterId:PublicKey, index:number, workspace:Workspace) => {
    try{
      let messagePDA = await GetPDAMessage(masterId, index, workspace);
      let messageData = await workspace.program.account.message.fetch(messagePDA);
      return{
        index:index,
        PDA:messagePDA,
        data:messageData,
      }
    }
    catch(err){
      return index
    }
  }

  export const getMessagesByChat = async(chatAccountPDA:PublicKey, workspace:Workspace) => {
    type MessageData = {
      index: number, 
      PDA: PublicKey, 
      data: any
    }

    const chatAccount = await workspace.program.account.chat.fetch(chatAccountPDA);

    const data: Promise<MessageData | number >[] = [];

    for (let i=0; i <= chatAccount.messageCount; i++){
      data.push(resolvePDAMessage(chatAccount.masterId, i, workspace))
    }

    const resolvedData = (await Promise.all(data)).filter((x): x is MessageData => typeof x !== "number").sort((a, b) => a.index < b.index ? -1 : 1)

    return resolvedData
  }

  export const initializeChatDynamic = async(initializer:PublicKey, receiver:PublicKey, workspace:Workspace) => {
    const indexInitializer = await getIndexInitializer(initializer, workspace) + 1;
    const indexReceiver = await getIndexReceiver(receiver, workspace) + 1;

    const initializerChat = await GetPDAInitializer(initializer, indexInitializer, workspace);
    const receiverChat = await GetPDAReceiver(receiver, indexReceiver, workspace);

    const master_id = anchor.web3.Keypair.generate();

    const tx = await workspace.program.methods.initializeChat(indexInitializer, indexReceiver, master_id.publicKey)
    .accounts(
      {
        chatInitializer: initializerChat,
        chatReceiver: receiverChat,
        initializer: initializer,
        receiver: receiver,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
    ).rpc();

    return tx;
  }

  export const initializeMessage = async(chatAccountPDA:PublicKey, initializer:PublicKey, text:string, workspace:Workspace) => {
    let initializerChat:PublicKey;
    let receiverChat:PublicKey;
    let receiver:PublicKey;

    const chatAccount = await workspace.program.account.chat.fetch(chatAccountPDA);

    if (initializer.toBase58() == chatAccount.initializer.toBase58()){
      initializerChat = await GetPDAInitializer(chatAccount.initializer, chatAccount.chatId, workspace);
      receiverChat = await GetPDAReceiver(chatAccount.receiver, chatAccount.otherChatId, workspace);
      receiver = chatAccount.receiver;
    }
    
    else{
      initializerChat = await GetPDAReceiver(chatAccount.receiver, chatAccount.chatId, workspace);
      receiverChat = await GetPDAInitializer(chatAccount.initializer, chatAccount.otherChatId, workspace);
      receiver = chatAccount.initializer;
    }
    
    const message_id = await GetPDAMessage(chatAccount.masterId, chatAccount.messageCount, workspace);

    const tx = await workspace.program.methods.initializeMessage(chatAccount.masterId, chatAccount.messageCount, text)
    .accounts(
      {
        message: message_id,
        chatInitializer: initializerChat,
        chatReceiver: receiverChat,
        initializer: initializer,
        receiver: receiver,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
    ).rpc();

    return tx;
    
  }

  export const closeMessage = async(messagePDA:PublicKey, initializer:PublicKey, workspace:Workspace) => {
    const tx = await workspace.program.methods.closeMessage()
    .accounts(
      {
        message: messagePDA,
        initializer: initializer,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
    ).rpc();
    
    return tx
  }

  export const closeChat = async(otherID:PublicKey, chatPDA:PublicKey, chatData:ChatData, workspace:Workspace) => {
    let initializer:PublicKey
    let PDAInitializedChat:PublicKey
    let PDAReceivedChat:PublicKey

    if (otherID.toBase58() == chatData.initializer.toBase58()){
      initializer = chatData.receiver
      PDAInitializedChat = await GetPDAInitializer(chatData.initializer, chatData.otherChatId, workspace)
      PDAReceivedChat = chatPDA
    }

    else{
      initializer = chatData.initializer
      PDAInitializedChat = chatPDA
      PDAReceivedChat = await GetPDAReceiver(chatData.receiver, chatData.otherChatId, workspace)
    } 

    const tx =  await workspace.program.methods.closeChat()
    .accounts(
      {
        chatInitializer: PDAInitializedChat,
        chatReceiver: PDAReceivedChat,
        initializer: initializer,
        receiver: chatData.initializer,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
    ).rpc();

    return tx
  }

  export const handleChainError = (err:any) =>{
    if (err.toString().includes("0x1")){
        return("Insufficient funds.");
    }
    else if (err.toString().includes("User rejected the request.")){
        return("Transaction cancelled.");
    }
    else if (err.toString().includes("Error processing Instruction 0: custom program error: 0x0")){
      return("Maximum active chat accounts reached for either receiving(6) or initializing chats(6).")
    }
    else if (err.toString().includes("cancelledWalletSignTransactionError")){
      return("Wallet connection not found, check that you are connected.")
    }
    else if (err.toString().includes("2003")){
      return("You can already talk to yourself.")
    }
    else if (err.toString().includes("3012")){
      return("Account does not exist anymore")
    }
    else{   
        return("Transaction cancelled"+ err.toString());
    }
  }