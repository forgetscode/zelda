import { PublicKey } from "@solana/web3.js";

interface ChatData {
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

interface ChatDataNotified extends ChatData {
    newStatus: boolean
}

export function setCookie(cname:string, cvalue:ChatData[], exdays:number) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
  }

export function getCookie(cname:string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return JSON.parse(c.substring(name.length, c.length));
      }
    }
    return "";
  }

export function checkCookie(data:ChatData[]) {
    let chats = getCookie("chats");
    if (chats != "") {
        return chats
    } 
    else {
        setCookie("chats", data, 4);
        return chats
    }
}

function appendCookie(entry:ChatData){
    let chats = getCookie("chats");
    chats.push(
        {
            chatPDA:entry.chatPDA,
            data:entry.data,
        }
    )
    setCookie("chats", chats, 4);
}


function delFromCookie(index:number){
    let chats = getCookie("chats");
    chats.splice(index)
    setCookie("chats", chats, 4);
}

export function updateMessageCookie(entry:PublicKey, count:number){
    let chats = getCookie("chats");
    for (let i=0 ; i < chats.length ; i++) {
        if (chats![i].chatPDA == entry.toBase58()) {
            chats![i].data.messageCount = count
        }
    }
    setCookie("chats", chats, 4);
}

export function compareCookie(data:ChatData[], dataChats:ChatData[]) {
    let chatDataNotified:ChatDataNotified[] = []
    let result = data.filter(cookieItem => dataChats?.some(chatItem => 
        cookieItem.chatPDA == chatItem.chatPDA
        &&
        cookieItem.data.messageCount < chatItem.data.messageCount
    ))

    for (let k=data!.length-1; k > -1 ; k--) {
        let found = false
        for (let i=0 ; i < dataChats!.length ; i++) {
            if (dataChats![i].chatPDA == data![k].chatPDA) {
                found = true
            }
        }
        if (!found){
            delFromCookie(k)
        }
    }
    for (let i=0 ; i < dataChats!.length ; i++) {
        let found = false
        let inCookie = false
        for (let k=0 ; k < data!.length ; k++) {
            if (dataChats![i].chatPDA == data![k].chatPDA) {
                inCookie = true
                break
            }
        }
        if (!inCookie){
            appendCookie(
                {
                    chatPDA:dataChats![i].chatPDA,
                    data:dataChats![i].data,

                }
            )
        }
        if(result.length > 0){
            for (let j=0 ; j < result!.length ; j++) {
                if (dataChats![i].chatPDA == result![j].chatPDA) {
                    found = true
                    break
                }
            }
        }
        if (found) {
            chatDataNotified.push(
                {
                    chatPDA:dataChats![i].chatPDA,
                    data:dataChats![i].data,
                    newStatus:true
                }
            )
        }
        else {
            if (inCookie) {
                chatDataNotified.push(
                    {
                        chatPDA:dataChats![i].chatPDA,
                        data:dataChats![i].data,
                        newStatus:false
                    }
                )
            }
            else{
                chatDataNotified.push(
                    {
                        chatPDA:dataChats![i].chatPDA,
                        data:dataChats![i].data,
                        newStatus:true
                    }
                )
            }
        }
        
    }
    return chatDataNotified
}

