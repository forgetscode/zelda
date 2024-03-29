import Head from "next/head";
import React from "react";
import { useEffect, useState } from "react";
import { HiChevronDown, HiChevronUp, HiTerminal } from "react-icons/hi";
import PageScrollLink from "../components/UtilityComponents/PageScrollLink";
import PageScroll from "../components/UtilityComponents/PageScroll";
import PageScrollImage from "../components/UtilityComponents/PageScrollImage";
import PageScrollText from "../components/UtilityComponents/PageScrollText";
import Image from 'next/image'
import { sizes, helpLength } from "../utility/constants";

function GetArray(n:number){
    return Array.from({length: n}, (x, i) => i).map(String)
}

interface Props {
    IDList:string[]
}

const Help = ({IDList}:Props) => {
    const [selected, setSelected] = useState<string>("")
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(()=> {
        const element = document.getElementById(selected)
        element?.scrollIntoView({behavior: "smooth" , block: "center"})
        setSelected("")
    }, [selected]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
    
        window.addEventListener("scroll", handleScroll)
    
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])


    return(
        <>
            <Head>
                <title>Zelda</title>
                <link rel='icon' href="https://icon-library.com/images/mms-icon/mms-icon-17.jpg"/>
                <meta name="description" content="Generated by create next app" />
            </Head>

            <div className="flex h-full w-full pt-16 pl-20">
                
                <div className="-mt-16" id={IDList[0]}/>
                { isScrolled ?
                    <div className="fixed transition-all bg-teal-500 cursor-pointer hover:bg-teal-400 text-white rounded-full p-4 right-0 mr-3 md:mr-8 bottom-0 mb-16 z-40 shadow-sm shadow-teal-300/50"
                        onClick={()=>(setSelected(IDList[0]))}>
                        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-0.5">
                            ^
                        </p>
                    </div> 
                    : 
                        <></>
                    
                }
                <div className=" pt-16">    

                    <div className="h-screen flex flex-col space-y-8 items-center "> 

                        <div className="flex flex-row">
                            <header className="text-6xl font-semibold text-transparent p-3 bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 animate-text"> Legend</header>


                                <a target="_blank" href="https://www.youtube.com/watch?v=XKThYf5cnqk" rel="noopener noreferrer">
                                    <div className="flex flex-row group">
                                        <HiTerminal className="h-20 w-20 text-white hover:text-sky-500 transition-all mt-1"/>
                                        <span className=" scale-0 group-hover:scale-100 flex items-center text-white bg-gray-900 
                                            text-xs font-bold transition-all duration-100 origin-left h-8 p-2 rounded-md shadow-md my-auto">
                                            Demo
                                        </span>
                                    </div>
                                </a>
                            
                        </div>
                            <div className="flex rounded-md bg-gradient-to-r from-teal-600 via-cyan-300 to-sky-600 pt-1 px-1 pb-1 shadow-lg shadow-sky-500/50">
                                <div className="w-full h-full">
                                    <div className="w-[350px] h-[460px] transition-all bg-black flex items-center justify-center">
                                        <span className="relative flex flex-col space-y-3 text-white text-lg font-medium">
                                            <p className="hover:text-teal-300 cursor-pointer" onClick={()=>(setSelected(IDList[1]))}> 1. Introduction</p>
                                            <p className="hover:text-sky-300 cursor-pointer" onClick={()=>(setSelected(IDList[2]))}> 2. Getting started with Phantom</p>
                                            <p className="hover:text-purple-300 cursor-pointer" onClick={()=>(setSelected(IDList[5]))}> 3. Connect your wallet</p>
                                            <p className="hover:text-teal-300 cursor-pointer" onClick={()=>(setSelected(IDList[8]))}> 4. Switching to devnet</p>
                                            <p className="hover:text-sky-300 cursor-pointer" onClick={()=>(setSelected(IDList[12]))}> 5. Understanding fees</p>
                                            <p className="hover:text-purple-300 cursor-pointer" onClick={()=>(setSelected(IDList[14]))}> 6. Airdrop</p>
                                            <p className="hover:text-teal-300 cursor-pointer" onClick={()=>(setSelected(IDList[16]))}> 7. Using Zelda</p>
                                            <p className="hover:text-sky-300 cursor-pointer" onClick={()=>(setSelected(IDList[21]))}> 8. Troubleshooting</p>
                                            <p className="hover:text-purple-300 cursor-pointer" onClick={()=>(setSelected(IDList[23]))}> 9. Sending Messages</p>
                                            <p className="hover:text-teal-300 cursor-pointer" onClick={()=>(setSelected(IDList[28]))}> 10. Reclaiming fees</p>
                                            <p className="hover:text-sky-300 cursor-pointer" onClick={()=>(setSelected(IDList[31]))}> 11. About Web3 messaging</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <HiChevronDown className="mt-8 chevron motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected(IDList[1]))}/>
                        </div>

                        

                        <PageScrollText
                            id = {IDList[1]}
                            text= 
                            {`Zelda utilizes the Solana blockchain in the place of a server for the backend of a chat messaging application. 
                            By using Zelda you will be familiarized with Web3 basics as well as both the advantages and limitations of blockchain 
                            infrastructure. Fundamental differences start with the authentication system. Authentication is baked into Web3 and to get 
                            you started you will need your Web3 passport, your first wallet.`}

                            header= "Introduction"
                            setState={setSelected}
                        />

                        <PageScrollLink
                            image = "/download_phantom.png"
                            size={sizes.lg} 
                            link="https://phantom.app/download"
                            id = {IDList[2]}
                            text = "Select the extension based on your browser."
                            header= "Download Phantom"
                            setState={setSelected}
                        />

                        <PageScrollImage 
                            image = "/create_wallet.png"
                            size={sizes.md}  
                            id = {IDList[3]}
                            header= "Create your Wallet"
                            setState={setSelected}
                        />

                        <PageScroll 
                            image = "/secret_key.png" 
                            size={sizes.sm} 
                            id = {IDList[4]}

                            text= 
                            {`The secret key is your real password and is unique to you. 
                            You may recover your wallet from anywhere with this phrase and your phrase should never
                            be shown to anyone if you plan on keeping your data and assets secure. If you lose your 
                            secret phrase you will lose your ability to recover and port your wallet from devices.`}

                            header= "Your Secret Key"
                            setState={setSelected}
                        />

                        <PageScroll 
                            image = "/select_wallet.png" 
                            size={sizes.lg} 
                            id = {IDList[5]}
                            text= "Hit “Select Wallet” in the top right of the Navigation bar."
                            header= "Select your Wallet"
                            setState={setSelected}
                        />
                        
                        <PageScroll 
                            image = "/connect_wallet.png" 
                            size={sizes.lg} 
                            id = {IDList[6]}
                            text="From the modal that pops up confirm your Phantom wallet by clicking on it on the modal."
                            header="Connect your Wallet"
                            setState={setSelected}
                        />

                        <PageScroll 
                            image = "/allow_zelda.png" 
                            size={sizes.sm} 
                            id = {IDList[7]}
                            text=
                            {`Approve the Zelda application to interact with your wallet by hitting connect. 
                            The following permission will give read access from your wallet to the app and allow the 
                            app to request transactions from your wallet.`}

                            header="Allow Zelda"
                            setState={setSelected}
                            extraText="Congratulations, you are connected!"
                        />

                        <PageScrollText
                            id = {IDList[8]}

                            text= 
                            {`This step is optional but will help make sense of the experience. 
                            Blockchain is new and exciting and in order to simulate test work in a proper environment Devnet exists. 
                            Devnet is analogous to main-net, the real network, with the key difference being that the funds of Devnet do not 
                            have real world value and can be printed on a whim. `}

                            header= "Switching to Devnet"
                            setState={setSelected}
                        />

                        <PageScroll 
                            image = "/devnet_1.png" 
                            size={sizes.sm}  
                            id = {IDList[9]}
                            text="Click on your wallet and hit the cog icon in the bottom right corner."
                            header="Configure your Wallet"
                            setState={setSelected}
                        />

                        <PageScroll 
                            image = "/devnet_2.png" 
                            size={sizes.sm}  
                            id = {IDList[10]}
                            text="Scrolldown and select “Change Network”."
                            header="Configuring your wallet..."
                            setState={setSelected}
                        />


                        <PageScroll 
                            image = "/devnet_3.png" 
                            size={sizes.sm}  
                            id = {IDList[11]}
                            text="Select Devnet."
                            header="Wallet Configued"
                            setState={setSelected}
                            extraText="Congratulations, you are connected to devnet!"
                        />


                        <PageScrollText
                            id = {IDList[12]}

                            text= 
                            {`Blockchain transactions have fees. 
                            A blockchain is as strong as its weakest unit and by requiring performant hardware for each node, Solana is fast and transactions take a low percentage of the network's resources. 
                            Typically it will cost a hundredth of a cent to perform an action on Solana. 
                            However, when an action requires storing data, there is extra cost associated. Storage 
                            is not infinite and you must pay a proportionate rent for the space you are using. 
                           `}

                            header= "Understanding Fees"
                            setState={setSelected}
                        />


                        <PageScrollText
                            id = {IDList[13]}

                            text= 
                            {`Sending funds will be close to free but creating new accounts to store that data will cost a few cents for “rent”.
                            You may have your rent be returned by closing these accounts. 
                            Space is not infinite so it needs to have a cost which for now is the effort in closing the account. 
                            As hardware improves and better tools are created on the network, space will have lower cost 
                            and become more of an automatic process. `}

                            header= "What this means"
                            setState={setSelected}
                            variant="rainbow"
                        />


                        <PageScroll 
                            image = "/Airdrop.png" 
                            size={sizes.lg} 
                            id = {IDList[14]}
                            text="To get some devnet funds click on the airdrop page from the sidebar and hit the Aidrop button to collect some devnet sol."
                            header="Airdrop"
                            setState={setSelected}
                        />

                        <PageScroll 
                            image = "/airdrop2.png" 
                            size={sizes.sm} 
                            id = {IDList[15]}
                            text="After the app notifies you the airdrop was successful, check your wallet and you should have 1 Sol. Make sure you are on devnet and not main-net if you wish to see your funds."
                            header="Check your Airdrop"
                            setState={setSelected}
                        />


                        <PageScroll 
                            image = "/messages.png" 
                            size={sizes.sm} 
                            id = {IDList[16]}
                            text="After connecting and funding your wallet, select the messages Icon from the sidebar and you will be introduced to the messaging application."
                            header="Using Zelda"
                            setState={setSelected}
                        />

                        <PageScroll 
                            image = "/messages2.png" 
                            size={sizes.sm}  
                            id = {IDList[17]}
                            text="Most likely you currently have no chats. Let’s change that! Hit the add chat icon to start your first chat."
                            header="Chats"
                            setState={setSelected}
                        />

                        <div className="mt-24 flex h-screen flex-col items-center space-y-8">
                            <div className='absolute p-12 w-5/6 -mt-24 text-white opacity-0 hover:opacity-100 cursor-pointer'  onClick={()=>(setSelected("17"))}>
                                <HiChevronUp className="flex chevron  w-full motion-safe:animate-bounce transition duration-700 ease-in-out"/>
                            </div>
                            <div className="w-full flex flex-col items-center pb-8 " id={"18"}>
                                <div className="space-y-8">
                                    <p className="text-xl md:text-4xl font-extrabold text-white mb-16"> {"Adding a chat"}</p>
                                    <div className="flex flex-row space-x-4 md:space-x-16 items-center">
                                        <div className="flex border-gradient-inverse shadow-lg shadow-purple-600/50">
                                            <span className="h-full w-full">
                                                <Image 
                                                src= "/messages3.png" 
                                                loading="lazy" 
                                                placeholder="blur"
                                                blurDataURL="/messages3.png" 
                                                width={400} 
                                                height={200} 
                                                />
                                            </span>
                                        </div>
                                        <div className="space-y-6 pr-4 flex flex-col max-w-[500px]">
                                            <p className="rounded text-white p-2 md:p-3 border-gradient text-xs md:text-lg font-semibold mx-auto text-center shadow-md shadow-sky-700/50 animate-text">
                                                {"Enter the public key of someone you want to chat with. This can be almost anyone but there are a few rules."}
                                            </p>
                                            <p className="text-white text-xs md:text-lg font-semibold mx-auto text-center">
                                                {"You cannot start a chat with yourself. This constraint is at the program level on the blockchain and there is no way to circumvent this."}
                                            </p>
                                            <p className="text-white text-xs md:text-lg font-semibold mx-auto text-center">
                                                {`You cannot have more than 6 outgoing chats and 6 receiving chats at the same time. 
                                                This constraint was created at the client level and can be arbitrarily adjusted by another programmer. This is a lazy way to address spam.`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='md:pb-16'/>
                            <HiChevronDown className="chevron motion-safe:animate-bounce transition duration-700 ease-in-out"  onClick={()=>(setSelected("19"))}/>
                        </div>



                        <PageScroll 
                            image = "/messages4.png" 
                            size={sizes.lg}  
                            id = {IDList[19]}
                            text="Hit the approve button to sign the transaction. 
                            This will send the request to create a chat to the blockchain just like how you would normally send the request to a server."
                            header="First Transaction"
                            setState={setSelected}
                        />


                        <PageScroll 
                            image = "/messages5.png" 
                            size={sizes.lg}  
                            id = {IDList[20]}
                            text="If everything went correctly you should see a chat created notification and your first chat."
                            header="Success!"
                            setState={setSelected}
                        />


                        <div className="mt-24 flex h-screen flex-col items-center space-y-8">
                            <div className='absolute p-12 w-5/6 -mt-24 text-white opacity-0 hover:opacity-100 cursor-pointer'  onClick={()=>(setSelected("20"))}>
                                <HiChevronUp className="flex chevron  w-full motion-safe:animate-bounce transition duration-700 ease-in-out"/>
                            </div>
                            <div className="w-full flex flex-col items-center pb-8 " id={"21"}>
                                <div className="space-y-16">
                                    <p className="flex justify-center text-4xl md:text-6xl font-extrabold text-white" > Troubleshooting</p>
                                    <div className="flex flex-col space-y-12 text-center max-w-[800px]">
                                        <p className="text-teal-300 text-xs sm:text-sm md:text-md lg:text-lg font-semibold">
                                        {`1. Check your DEVNET funds. 
                                        The transaction should cost roughly 0.003 Sol or 9.3 cents in today's conversion. 
                                        If you do not have enough funds, claim an airdrop from the airdrop page`}
                                        </p>
                                        <p className="text-sky-300 text-xs sm:text-sm md:text-md lg:text-xl font-semibold">
                                        {`2. You are breaking a constraint. Likely the person you are trying to chat with already has 6 receiving chats. Confirm the error notification.`}
                                        </p>
                                        <p className="text-purple-300 text-xs sm:text-sm md:text-md lg:text-xl font-semibold">
                                        {`3. The transaction is timing out. If you have waited too long to confirm your transaction after initializing it(or there were latency issues) 
                                        the blockhash being used may have timed out. The error message will be very clear so just resend your transaction.`}
                                        </p>
                                        <p className="text-teal-300 text-xs sm:text-sm md:text-md lg:text-xl font-semibold">
                                        {`4. The devnet is undergoing maintenance. An easy way to check this out is by verifying the transaction from your wallet(below).`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <HiChevronDown className="chevron motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("22"))}/>
                        </div>

                        
                        <PageScroll 
                            image = "/messages6.png" 
                            size={sizes.lgMisfit}  
                            id = {IDList[22]}
                            text={`You can see details regarding the flow of your transaction by opening your wallet, 
                            clicking the lightning icon at the bottom, then clicking on your most recent transaction. 
                            This should open up the explorer and give you details regarding the flow of your transaction 
                            as well as if there was an error or if there are network issues.`}
                            header="Transaction Details"
                            setState={setSelected}
                        />

                        <PageScroll 
                            image = "/messages7.png" 
                            size={sizes.lg}  
                            id = {IDList[23]}
                            text={`The selected chat will appear highlighted. Click on a chat to select it. You may add more or refresh the chat list 
                            to see if someone has started a chat with you.
                            Data is queried fast. As the blockchain stores accounts in a hashmap,
                            whether there are 5 messages or 200 they will be retrieved in O(1) time!`}
                            header="Open the chat"
                            setState={setSelected}
                            extraText={"Collapse the chat list to get a better view before sending a message."}
                        />

                        <PageScroll 
                            image = "/messages8.png" 
                            size={sizes.lg}  
                            id = {IDList[24]}
                            text={`Just type in the text field and hit the arrow to send your message. This is a transaction like creating or deleting a chat.
                            There is an arbitrary max message length of 212 characters.`}
                            header="Your First Message"
                            setState={setSelected}
                        />

                        <PageScroll
                            image = "/messages9.png" 
                            size={sizes.lg}  
                            id = {IDList[25]}
                            header={`Message Sent`}
                            text={`After approving the transaction you should see your message in the chat list.`}
                            setState={setSelected}
                        />

                        
                        <PageScroll
                            image = "/messages10.png" 
                            size={sizes.lg}  
                            id = {IDList[26]}
                            header={`Receiving Messages`}
                            text={`Messages will appear automatically if received, there is no need to refresh. This is working through a websocket with the blockchain.`}
                            setState={setSelected}
                        />

                        <PageScroll
                            image = "/messages11.png" 
                            size={sizes.lg}  
                            id = {IDList[27]}
                            header={`Deleteing Messages`}
                            text={`Messages you have sent and only your messages may be individually deleted by hovering your message and clicking the red X. 
                            This is a transaction like before.`}
                            setState={setSelected}
                        />

                        <PageScrollText
                            id = {IDList[28]}
                            header={`Reclaim`}
                            text={`It is inconvenient to manually delete messages to reclaim your Sol. To make the process easier, the Reclaim tool was created.
                            It works by gathering all existing accounts you have and then selecting message accounts that no longer have a corresponding chat account.
                            If there are chats that have been deleted but not all of the messages were deleted you can delete them with the Reclaim tool to reclaim your Sol.
                            If you have a chat account with a lot of messages and you want to reclaim your Sol then delete the chat account and use this tool to delete the messages in one go.
                            `}
                            setState={setSelected}
                            variant={"rainbow"}
                        />

                        <PageScroll
                            image = "/reclaim1.png" 
                            size={sizes.lgMisfit}  
                            id = {IDList[29]}
                            header={`Reclaiming`}
                            text={`From the Reclaim page, hit the "Load" button to load your data.`}
                            setState={setSelected}
                        />

                        <PageScroll
                            image = "/reclaim2.png" 
                            size={sizes.lg}  
                            id = {IDList[30]}
                            header={`Reclaiming...`}
                            text={`The load button will turn into a ready button. Approve the transaction and your messages will be deleted and your sol will be reclaimed.`}
                            setState={setSelected}
                            extraText="Check your updated blance in your wallet!"
                        />

                        <PageScrollText
                            id = {IDList[31]}
                            header={`About the future of Web3 messaging`}
                            text={`While new technology is cool, there are mountains to be moved going forwards. 
                            The UX for messaging on blockchain is more cumbersome than traditional messaging apps but it does not have to be.
                            The main burden here is not actually the approval of transactions at every step, it is actually the cost of storing data on the blockchain. 
                            If the costs were not so high, intermediary wallets could handle transaction approval with similar costs to a data center and the UX would 
                            be equivalent to traditional messaging.
                            `}
                            setState={setSelected}
                            variant={"rainbow"}
                        />

                        <PageScrollText
                            id = {IDList[32]}
                            header={`Compressing On-Chain data`}
                            text={`By compressing On-chain data, costs can be greatly reduced. By implementing a merkle tree On-chain and utilizing off-chain indexers to serve proofs,
                             we can achieve costs at an expected fraction of 1/2400 of the current cost. 1/2400 was the cost fraction reduction 
                             for NFT’s and allows 1 million NFT’s to be created for 5 sol or roughly 150$ USD at current value.
                            `}
                            setState={setSelected}
                            variant={"white"}
                            links={true}
                        />

                        
                        <PageScrollText
                            id = {IDList[33]}
                            header={`Compressing Message data`}
                            text={`For a messaging protocol like Zelda, the cost reduction can be even greater. 
                            To achieve O(1) indexing, zelda requires extra data to be stored in message accounts in order to map what data goes where. 
                            Approximately 26% of the data in a max length message is for indexing. In shorter messages over 90% of the data might be just for indexing. 
                            By taking this part off-chain, blockchain messaging becomes a serious option for a disruptive technology.
                            `}
                            setState={setSelected}
                            variant={"rainbow"}
                        />

                        <PageScrollText
                            id = {IDList[34]}
                            header={`Benefits of On-Chain Messaging`}
                            text={`
                            Blockchain technologies are at the base, permissionless.
                            If I want to message someone on Youtube but I have Facebook, I cannot do so without creating a Youtube account and now that chat
                            is seperated from the rest of my messages on Facebook. 
                            If I want to message someone on Magic Eden, an NFT marketplace on Solana, I can send them a message through Zelda and both exist on Solana, 
                            the user base is shared. 
                            They still need to open Zelda to see the message, but no new account had to be made because the interfacing layer is present. 
                            The user base is open, connected, and secured through the Wallet infrastructure.
                            `}
                            setState={setSelected}
                        />

                        <PageScrollText
                            id = {IDList[35]}
                            header={`Composability`}
                            text={`
                            The main implication of this is composability. 
                            By sharing the same authentication layer, on-chain applications are naturally integrated with one another.
                            Integrating a traditional server API into another app requires con-joining database resolvers which is time consuming, and error prone. 
                            On-chain applications can still be tweaked client side if desired but can also be integrated to work with your user base with essentially 0 friction. 
                            `}
                            setState={setSelected}
                            variant={"rainbow"}
                        />

                        <PageScrollText
                            id = {IDList[36]}
                            header={`Conclusion`}
                            text={`
                            If a web3 app like the NFT marketplace Magic Eden wanted a messaging service they could include a 
                            page on their website which used The Exact Same Code as the Zelda messaging page without ANY edits and work flawlessly.
                            Compare this process with how you might integrate a chat app on your site and have to include new interfacing in your 
                            backend and the entire landscape and programming barrier of scaling services into future applications has just been shifted permanently.
                            `}
                            setState={setSelected}
                            variant={"white"}
                            down={true}
                        />
                </div>
            </div>
        </>
    )
}

export default Help

export async function getStaticProps() {
    const IDList = GetArray(helpLength)
    return {
      props: {IDList}
    }
  }
  