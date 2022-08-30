import { PublicKey } from '@solana/web3.js'
import { atom } from 'recoil'

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

export const activeChatState = atom<ChatInfo | null>({
  key: 'activeChatState',
  default: null,
})


export const chatListState = atom({
  key: 'chatListState',
  default: false,
})

export const messageListState = atom({
  key: 'messageListState',
  default: false,
})

export const openChatState = atom({
  key: 'openChatState',
  default: false,
})