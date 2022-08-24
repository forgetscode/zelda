import { PublicKey } from '@solana/web3.js'
import * as anchor from "@project-serum/anchor";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { Sms2 } from '../target/types/sms2';

  
type Workspace =  {
    wallet: WalletContextState;
    programID: PublicKey;
    network: string;
    connection: Connection;
    provider: anchor.Provider;
    program: anchor.Program<Sms2>;
}

    export const GetPDAInitializer = async(initializer:PublicKey, chat_id:number, workspace:Workspace) => {

        console.log(initializer)
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
    return index
  }

  export const getIndexReceiver = async(account:PublicKey, workspace:Workspace) => {
    let index = 0;
    for (let i = 1; i < 7; i++) { 
      let cursor = await GetPDAReceiver(account, i, workspace);
      try{
        let data = await workspace.program.account.chat.fetch(cursor);
      }
      catch{
        index = i - 1;
        break
      }
    }
    return index
  }

  export const getInitializerChats = async(account:PublicKey, workspace:Workspace) => {
    let InitializerChats = []
    for (let i = 1; i < 7; i++) { 
      let cursor = await GetPDAInitializer(account, i, workspace);
      try{
         await workspace.program.account.chat.fetch(cursor);
        InitializerChats.push(cursor);
      }
      catch{
        continue
      }
    }
    return InitializerChats
  }

  export const getReceiverChats = async(account:PublicKey, workspace:Workspace) => {
    let receiverChats = []
    for (let i = 1; i < 7; i++) { 
      let cursor = await GetPDAReceiver(account, i, workspace);
      try{
        await workspace.program.account.chat.fetch(cursor);
        receiverChats.push(cursor);
      }
      catch{
        continue
      }
    }
    return receiverChats
  }

  export const getAccountChats = async(account:PublicKey, workspace:Workspace) => {
    const initializeChats = await getInitializerChats(account, workspace);
    const ReceiverChats = await getReceiverChats(account, workspace);

    return initializeChats.concat(ReceiverChats);
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

  export const initializeChatDynamic = async(initializer:anchor.web3.Keypair, receiver:PublicKey, workspace:Workspace) => {
    const indexInitializer = await getIndexInitializer(initializer.publicKey, workspace) + 1;
    const indexReceiver = await getIndexReceiver(receiver, workspace) + 1;

    const initializerChat = await GetPDAInitializer(initializer.publicKey, indexInitializer, workspace);
    const receiverChat = await GetPDAReceiver(receiver, indexReceiver, workspace);

    const master_id = anchor.web3.Keypair.generate();

    const tx = await workspace.program.methods.initializeChat(indexInitializer, indexReceiver, master_id.publicKey)
    .accounts(
      {
        chatInitializer: initializerChat,
        chatReceiver: receiverChat,
        initializer: initializer.publicKey,
        receiver: receiver,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
    ).signers([initializer]).rpc();

    return tx;
  }

  export const initializeMessage = async( chatAccountPDA:PublicKey, initializer:anchor.web3.Keypair, text:string, workspace:Workspace) => {
    let initializerChat:PublicKey;
    let receiverChat:PublicKey;
    let receiver:PublicKey;

    const chatAccount = await workspace.program.account.chat.fetch(chatAccountPDA);

    if (initializer.publicKey.toBase58() == chatAccount.initializer.toBase58()){
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
        initializer: initializer.publicKey,
        receiver: receiver,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
    ).signers([initializer]).rpc();

    return tx;
    
  }

