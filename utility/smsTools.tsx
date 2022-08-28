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
  
type Workspace =  {
    wallet: WalletContextState;
    programID: PublicKey;
    network: string;
    connection: Connection;
    provider: anchor.Provider;
    program: anchor.Program<Sms2>;
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

  export const getIndexInitializer = async(account:PublicKey, workspace:Workspace) => {
    let index = 0;
    try{
      for (let i = 1; i < 7; i++) { 
        let cursor = await GetPDAInitializer(account, i, workspace);
        try{
          let data = await workspace.program.account.chat.fetch(cursor);
        }
        catch{
          index = i -1;
          break
        }
      }
    }
    catch(err:any){
      return(err)
    }
    return index
  }

  export const getIndexReceiver = async(account:PublicKey, workspace:Workspace) => {
    let index = 0;
    try{
      for (let i = 1; i < 13; i++) { 
        let cursor = await GetPDAReceiver(account, i, workspace);
        try{
          let data = await workspace.program.account.chat.fetch(cursor);
        }
        catch{
          index = i - 1;
          break
        }
      }
    }
    catch(err:any){
      return(err)
    }
    return index
  }

  export const getInitializerChats = async(account:PublicKey, workspace:Workspace) => {
    let InitializerChats = []
    try{
      for (let i = 1; i < 7; i++) { 
        let cursor = await GetPDAInitializer(account, i, workspace);
        try{
          const chatData = await workspace.program.account.chat.fetch(cursor);
          InitializerChats.push({chatPDA: cursor, data:chatData});
        }
        catch{
          continue
        }
      }
    }
    catch(err:any){
      return(err)
    }
    return InitializerChats
  }

  export const getReceiverChats = async(account:PublicKey, workspace:Workspace) => {
    let receiverChats = []
    try{
      for (let i = 1; i < 13; i++) { 
        let cursor = await GetPDAReceiver(account, i, workspace);
        try{
          const chatData = await workspace.program.account.chat.fetch(cursor);
          receiverChats.push({chatPDA: cursor, data:chatData});
        }
        catch{
          continue
        }
      }
    }
    catch(err:any){
      return(err)
    }
    return receiverChats
  }

  export const getAccountChats = async(account:PublicKey, workspace:Workspace) => {
    try{
      const initializeChats = await getInitializerChats(account, workspace);
      const ReceiverChats = await getReceiverChats(account, workspace);
      return initializeChats.concat(ReceiverChats);
    }
    catch(err:any){
      return(424)
    }
  }

  export const getMessagesByChat = async(chatAccountPDA:PublicKey, workspace:Workspace) => {

    const chatAccount = await workspace.program.account.chat.fetch(chatAccountPDA);

    const data = [];

    for (let i=0; i <= chatAccount.messageCount; i++){
      try{
        let messagePDA = await GetPDAMessage(chatAccount.masterId, i, workspace);
        let messageData = await workspace.program.account.message.fetch(messagePDA);
        data.push({
          PDA:messagePDA,
          data:messageData,
        });
      }
      catch{
        continue;
      }
    }
    
    return data
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

    const tx = await workspace.program.methods.closeChat()
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
      return("Maximum active chat accounts reached for either receiving(12) or initializing chats(6).")
    }
    else if (err.toString().includes("cancelledWalletSignTransactionError")){
      return("Wallet connection not found, check that you are connected.")
    }
    else{   
        return("Transaction cancelled"+ err.toString());
    }
  }