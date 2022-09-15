import { NextPage } from "next"
import Head from "next/head"
import Image from 'next/image'
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiChevronDown, HiTerminal } from "react-icons/hi";
import PageScroll from "../components/UtilityComponents/PageScroll";

const Help: NextPage = () => {
    const [selected, setSelected] = useState("")
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
                
                <div className="-mt-16" id={"start"}/>

 
                { isScrolled ?
                    <div className="fixed transition-all bg-teal-500 cursor-pointer hover:bg-teal-400 text-white rounded-full p-4 right-0 mr-3 md:mr-8 bottom-0 mb-16 z-40"
                        onClick={()=>(setSelected("start"))}>
                        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-0.5">
                            ^
                        </p>
                    </div> 
                    : 
                        <></>
                    
                }


                <div className=" pt-16">    

                    <div className="h-screen flex flex-col space-y-8 items-center mr-2"> 
                        <div className="flex flex-row">
                            
                            <p className="text-6xl font-semibold text-transparent p-3 bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 animate-text" id={"Legend"}> Legend</p>
                            <HiTerminal className=" mt-auto  h-20 w-20 text-white"></HiTerminal>
                        </div>
                        <div className="flex rounded-md bg-gradient-to-r from-teal-600 via-cyan-300 to-sky-600 pt-1 px-1 pb-1 shadow-outer">
                            <div className="w-full h-full">
                                <div className="w-[350px] h-[420px] transition-all bg-black flex items-center justify-center">
                                    <span className="relative flex flex-col space-y-3 text-white text-lg font-medium">
                                        <p className="hover:text-teal-300 cursor-pointer" onClick={()=>(setSelected("Introduction"))}> 1. Introduction</p>
                                        <p className="hover:text-sky-300 cursor-pointer" onClick={()=>(setSelected("DownloadPhantom"))}> 2. Getting started with Phantom</p>
                                        <p className="hover:text-purple-300 cursor-pointer" onClick={()=>(setSelected("SelectWallet"))}> 3. Connect your wallet</p>
                                        <p className="hover:text-teal-300 cursor-pointer" onClick={()=>(setSelected("Devnet"))}> 4. Switching to devnet</p>
                                        <p className="hover:text-sky-300 cursor-pointer" onClick={()=>(setSelected("Fees"))}> 5. Understanding fees</p>
                                        <p className="hover:text-purple-300 cursor-pointer" onClick={()=>(setSelected("Airdrop"))}> 6. Airdrop</p>
                                        <p className="hover:text-teal-300 cursor-pointer" onClick={()=>(setSelected("Message"))}> 7. Using Zelda</p>
                                        <p className="hover:text-purple-300 cursor-pointer" onClick={()=>(setSelected("Message6"))}> 8. Troubleshooting</p>
                                        <p className="hover:text-purple-300 cursor-pointer" onClick={()=>(setSelected("start"))}> 9. Reclaiming fees</p>
                                        <p className="hover:text-teal-300 cursor-pointer" onClick={()=>(setSelected("start"))}> 10. About Web3 messaging</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <HiChevronDown className="chevron motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Introduction"))}/>
                    </div>

                    <div className="h-screen flex flex-col space-y-8 md:space-y-24 items-center pt-36" id={"Introduction"}>   
                        <p className="flex justify-center text-4xl md:text-6xl font-extrabold text-white" > Introduction</p>
                        <div className="flex flex-col space-y-6 md:space-y-24">
                                <p className="w-3/6 flex text-transparent bg-clip-text border-gradient-variant text-md md:text-xl mx-auto text-wrap text-center">
                                    Zelda utilizes the Solana blockchain in the place of a server for the backend of a chat messaging application. 
                                    By using Zelda you will be familiarized with Web3 basics as well as both the advantages and limitations of blockchain infrastructure.
                                    Fundamental differences start with the authentication system. Authentication is baked into Web3 and to get started you will need your Web3 passport, your first wallet.
                                </p>
                        </div>
                            <HiChevronDown className="chevron motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("DownloadPhantom"))}/>
                    </div>


                    <div className="h-screen w-full flex flex-col items-center pt-36" id={"DownloadPhantom"}>
                        <div className="space-y-8">
                            <p className="text-xl md:text-4xl font-extrabold text-white mb-16"> Download Phantom</p>
                            <div className="flex flex-row space-x-4 md:space-x-16 items-center">
                                <div className="flex border-gradient">
                                    <span className="h-full w-full">
                                        <Image 
                                        src="/download_phantom.png"
                                        loading="lazy" 
                                        placeholder="blur"
                                        blurDataURL="/download_phantom.png" 
                                        width={550} height={550} 
                                        />
                                    </span>
                                </div>
                                <div className="flex flex-col justify-center space-y-3  pr-4">
                                    <span className="flex flex-row items-end"> 
                                        <header className=" text-white text-xl sm:text-3xl md:text-5xl font-bold">
                                            Click
                                        </header>
                                        <Link href="https://phantom.app/download">
                                            <a target="_blank">
                                                <p className="text-purple-500 text-xl md:text-4xl  underline cursor-pointer
                                                                hover:bg-emerald-500 hover:text-black transition-all rounded ml-2">
                                                    Here
                                                </p>
                                            </a>
                                        </Link>
                                    </span>
                                    <p className="flex border-gradient text-white p-2 font-bold text-xs md:text-lg mx-auto text-wrap">
                                        Select the extension based on your browser.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <HiChevronDown className="chevron mt-8 md:mt-24 motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("CreateWallet"))}/>
                    </div>

                    <div className="h-screen w-full flex flex-col items-center pt-36" id={"CreateWallet"}>
                        <div className="space-y-8">
                            <p className="text-xl md:text-4xl font-extrabold text-white mb-16"> Create your wallet</p>
                            <div className="flex flex-row space-x-4 md:space-x-16 items-center">
                                <div className="flex border-gradient">
                                    <span className="h-full w-full">
                                        <Image 
                                        src="/create_wallet.png"
                                        loading="lazy" 
                                        placeholder="blur"
                                        blurDataURL="/create_wallet.png" 
                                        width={350} height={400} 
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <HiChevronDown className="chevron mt-8 md:mt-24 motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Secret"))}/>
                    </div>

                    <div className="h-screen w-full flex flex-col items-center pt-36" id={"Secret"}>
                        <div className="space-y-8 ">
                            <p className="text-xl md:text-4xl font-extrabold text-white mb-16 mx-auto text-center"> Your Secret Key</p>
                            <div className="flex flex-col space-y-4 md:space-y-16 items-center">
                                <div className="flex border-gradient pb-1">
                                    <span className="flex h-full w-full">
                                        <Image 
                                        src="/secret_key.png"
                                        loading="lazy" 
                                        placeholder="blur"
                                        blurDataURL="/secret_key.png" 
                                        width={275} height={300} 
                                        />
                                    </span>
                                </div>
                                <div className="space-y-3 pr-4 flex max-w-[400px]">
                                    <p className="rounded text-white p-2 md:p-3 border-gradient text-xs md:text-md lg:text-lg mx-auto text-center">
                                        The secret key is your real password and is unique to you. 
                                        You may recover your wallet from anywhere with this phrase and your phrase should never be shown to anyone if you plan on keeping your data and assets secure. If you lose your secret phrase you will lose your ability to recover and port your wallet from devices.

                                    </p>
                                </div>
                            </div>
                        </div>
                        <HiChevronDown className="chevron mt-8 motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("SelectWallet"))}/>
                    </div>
            
                    <div className="mt-24 flex h-screen flex-col items-center">
                        <PageScroll 
                            image = "/select_wallet.png" 
                            w= {500} 
                            h= {400} 
                            id = "SelectWallet"
                            text="Hit “Select Wallet” in the top right of the Navigation bar."
                            header="Select your wallet"
                        />
                        <HiChevronDown className="chevron -mt-24 md:mt-0 motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("ConnectWallet"))}/>
                    </div>

                    
                    <div className="flex h-screen flex-col items-center">
                        <PageScroll 
                            image = "/connect_wallet.png" 
                            w= {500} 
                            h= {400} 
                            id = "ConnectWallet"
                            text="From the modal that pops up confirm your Phantom wallet by clicking on it on the modal."
                            header="Connect your wallet"
                        />
                        <HiChevronDown className="chevron -mt-24 md:mt-0 motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("AllowZelda"))}/>
                    </div>

                    <div className="flex h-screen flex-col items-center">
                        <PageScroll 
                            image = "/allow_zelda.png" 
                            w= {350} 
                            h= {550} 
                            id = "AllowZelda"
                            text="Approve the Zelda application to interact with your wallet by hitting connect. 
                            The following permission will give read access from your wallet to the app and allow the app to request transactions from your wallet."
                            header="Allow Zelda"
                        />
                        <p className="pb-16 -mt-16 text-white text-lg mx-auto text-center font-bold">
                            Congratulations, you are connected!
                        </p>
                        <HiChevronDown className="chevron mt-0 motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Devnet"))}/>
                    </div>

                    <div className="h-screen flex flex-col space-y-8 md:space-y-24 items-center pt-36" id={"Devnet"}>   
                        <p className="flex justify-center text-4xl md:text-6xl font-extrabold text-white" > Switching to Devnet</p>
                        <div className="flex flex-col space-y-6 md:space-y-24">
                                <p className="w-3/6 flex text-transparent bg-clip-text border-gradient-variant  text-md md:text-xl mx-auto text-wrap text-center">
                                This step is optional but will help make sense of the experience. 
                                Blockchain is new and exciting and in order to simulate test work in a proper environment Devnet exists. 
                                Devnet is analogous to main-net, the real network, with the key difference being that the funds of Devnet do not have real world value and can be printed on a whim. 
                                </p>
                        </div>
                            <HiChevronDown className="chevron motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Devnet1"))}/>
                    </div>

                    <div className="mt-16 flex h-screen flex-col items-center">
                        <PageScroll 
                            image = "/devnet_1.png" 
                            w= {225} 
                            h= {300} 
                            id = "Devnet1"
                            text="Click on your wallet and hit the cog icon in the bottom right corner."
                            header="Configure your wallet"
                        />
                        <HiChevronDown className="chevron -mt-24 md:mt-0 motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Devnet2"))}/>
                    </div>

                    <div className="mt-16 flex h-screen flex-col items-center">
                        <PageScroll 
                            image = "/devnet_2.png" 
                            w= {225} 
                            h= {300} 
                            id = "Devnet2"
                            text="Scrolldown and select “Change Network”."
                            header="Configuring your wallet..."
                        />
                        <HiChevronDown className="chevron -mt-24 md:mt-0 motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Devnet3"))}/>
                    </div>

                    <div className="mt-16 flex h-screen flex-col items-center">
                        <PageScroll 
                            image = "/devnet_3.png" 
                            w= {225} 
                            h= {300} 
                            id = "Devnet3"
                            text="Select Devnet."
                            header="Wallet configued"
                        />
                        <p className="pb-16 -mt-16 text-white text-lg mx-auto text-center font-bold ">
                            Congratulations, you are connected to devnet!
                        </p>
                        <HiChevronDown className="chevron mt-0 motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Fees"))}/>
                    </div>

                    <div className="h-screen flex flex-col space-y-8 md:space-y-24 items-center pt-36" id={"Fees"}>   
                        <p className="flex justify-center text-4xl md:text-6xl font-extrabold text-white" > Understanding Fees</p>
                        <div className="flex flex-col space-y-6 md:space-y-24">
                                <p className="w-4/6 flex text-transparent bg-clip-text border-gradient-variant sm:text-sm md:text-md lg:text-xl mx-auto text-wrap text-center">
                                In order to utilize the blockchain, you must pay for transactions. 
                                A blockchain is as strong as its weakest unit and by requiring performant hardware for each node, Solana is fast and transactions take a low percentage of the network's resources allowing the transactions to be cheap for the user. 
                                Typically it will cost a hundredth of a cent to perform an action. 
                                However, when an action requires storing data, there is extra cost associated. Storage 
                                is not infinite and you must pay a proportionate rent for the space you are borrowing. 
                                When you have released your storage, the extra funds will be returned to you making the cost of storage temporary.
                                </p>

                        </div>
                            <HiChevronDown className="chevron motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Fees2"))}/>
                    </div>

                    <div className="h-screen flex flex-col space-y-8 md:space-y-24 items-center pt-36" id={"Fees2"}>   
                        <p className="flex justify-center text-4xl md:text-6xl font-extrabold text-white" > What this means</p>
                        <div className="flex flex-col space-y-6 md:space-y-24">
                        <p className="w-4/6 flex text-transparent bg-clip-text border-gradient sm:text-sm md:text-md lg:text-xl mx-auto text-wrap text-center">
                                Sending funds will be close to free but creating accounts to store that data will cost a few cents for “rent”.
                                 You may have your rent be returned by closing those accounts. Space is not infinite so it needs to have a cost which for now is the effort in closing the account. 
                                 As hardware improves and better tools are created on the network, space will have lower cost and become more of an automatic process.
                                </p>
                        </div>
                            <HiChevronDown className="chevron motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Airdrop"))}/>
                    </div>


                    <div className="mt-16 flex h-screen flex-col items-center">
                        <PageScroll 
                            image = "/Airdrop.png" 
                            w= {500} 
                            h= {400} 
                            id = "Airdrop"
                            text="To get some devnet funds click on the airdrop page from the sidebar and hit the Aidrop button to collect some devnet sol."
                            header="Airdrop"
                        />
                        <HiChevronDown className="chevron -mt-24 md:mt-0 motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Airdrop2"))}/>
                    </div>

                    <div className="mt-16 flex h-screen flex-col items-center">
                        <PageScroll 
                            image = "/airdrop2.png" 
                            w= {300} 
                            h= {500} 
                            id = "Airdrop2"
                            text="After the app notifies you the airdrop was successful, check your wallet and you should have 1 Sol. Make sure you are on devnet and not main-net if you wish to see your funds."
                            header="Check your Airdrop"
                        />
                        <HiChevronDown className="chevron -mt-24 md:mt-0 motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Message"))}/>
                    </div>

                    
                    <div className="mt-16 flex h-screen flex-col items-center">
                        <PageScroll 
                            image = "/messages.png" 
                            w= {300} 
                            h= {400} 
                            id = "Message"
                            text="After connecting and funding your wallet, select the messages Icon from the sidebar and you will be introduced to the messaging application."
                            header="Using Zelda"
                        />
                        <HiChevronDown className="chevron -mt-24 md:mt-0 motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Message2"))}/>
                    </div>

                    <div className="mt-16 flex h-screen flex-col items-center">
                        <PageScroll 
                            image = "/messages2.png" 
                            w= {300} 
                            h= {400} 
                            id = "Message2"
                            text="Most likely you currently have no chats. Let’s change that! Hit the add chat icon to start your first chat."
                            header="Chats"
                        />
                        <HiChevronDown className="chevron -mt-24 md:mt-0 motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Message3"))}/>
                    </div>

                    <div className="mt-16 flex h-screen flex-col items-center">
                        <PageScroll 
                            image = "/messages3.png" 
                            w= {500} 
                            h= {250} 
                            id = "Message3"
                            text="Enter the public key of someone you want to chat with. This can be almost anyone but there are a few rules.
                                         
                            1. You cannot start a chat with yourself. This constraint at the program level on the blockchain and there is no way to circumvent this.

                            2. You cannot have more than 6 outgoing chats and 6 receiving chats at the same time. This constraint was created at the client level and can be arbitrarily adjusted by another programmer. This is a lazy way to address spam.
                            "
                            header="Adding a chat"
                        />
                        <HiChevronDown className="chevron -mt-24 md:mt-0 motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Message4"))}/>
                    </div>

                    <div className="mt-16 flex h-screen flex-col items-center">
                        <PageScroll 
                            image = "/messages4.png" 
                            w= {400} 
                            h= {400} 
                            id = "Message4"
                            text="Hit the approve button to sign the transaction. 
                            This will send the request to create a chat to the blockchain just like how you would normally send the request to a server."
                            header="First transaction"
                        />
                        <HiChevronDown className="chevron -mt-24 md:mt-0 motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Message5"))}/>
                    </div>

                    <div className="mt-16 flex h-screen flex-col items-center">
                        <PageScroll 
                            image = "/messages5.png" 
                            w= {400} 
                            h= {400} 
                            id = "Message5"
                            text="If everything went correctly you should see a chat created notification and your first chat."
                            header="Success!"
                        />
                        <HiChevronDown className="chevron -mt-24 md:mt-0 motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Message6"))}/>
                    </div>

                    <div className="h-screen flex flex-col space-y-8 md:space-y-24 items-center pt-36" id={"Message6"}>   
                        <p className="flex justify-center text-4xl md:text-6xl font-extrabold text-white" > Troubleshooting</p>
                        <div className="flex flex-col space-y-6 text-center">

                        </div>
                            <HiChevronDown className="chevron motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setSelected("Message7"))}/>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Help

