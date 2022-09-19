export interface ChatData {
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

export interface MessageData {
    PDA:PublicKey,
    data: {
        bump:number,
        initializer:PublicKey,
        masterId: PublicKey,
        message: string,
        messageId: number
    }
}

export interface ChatInfo {
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

export type Workspace =  {
    wallet: WalletContextState;
    programID: PublicKey;
    network: string;
    connection: Connection;
    provider: anchor.Provider;
    program: anchor.Program<Sms2>;
}