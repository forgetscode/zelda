import { EmailIcon,
         MoonIcon,
         QuestionIcon,
         Search2Icon,
         SettingsIcon } from '@chakra-ui/icons';
import { Icon, Flex } from '@chakra-ui/react';
import { BiHome } from "react-icons/bi";
import React from 'react'
import Link from 'next/link';

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const SideBar = () => {
    return (
        <>
        <div className ="fixed top-0 left-0 h-screen w-16 m-0
                        flex flex-col
                        bg-gray-900 text-white shadow-lg mt-24">
            <hr  className ="w-[%100] border-gray-600"/>
            <Link href="/messages">
                <a>
                    <SideBarIcon icon = {<EmailIcon boxSize={28}/>} text="Messages"/>
                </a>
            </Link>
            <SideBarIcon icon = {<QuestionIcon boxSize={28}/>} text="Help"/>
            <SideBarIcon icon = {<Search2Icon boxSize={28}/>} text="Search"/>
            <SideBarIcon icon = {<MoonIcon boxSize={28}/>} text="Moon"/>
            <hr  className ="self-center w-12 border-gray-600" />
            <SideBarIcon icon = {<SettingsIcon boxSize={28}/>} text="Settings"/>
        </div>
            <div className='flex flex-col'>
                <div className ="fixed top-0 h-24 w-screen m-0
                                flex flex-row
                                bg-gray-900 shadow-lg p-2">
                    <Link href="/">
                        <div className='ml-4 p-2 flex flex-row my-auto bg-gray-700 hover:bg-teal-600
                                hover:scale-110
                                hover:text-white
                                rounded-3xl hover:rounded-xl
                                transition-all duration-300 ease-linear
                                cursor-pointer'>
                            <p className='text-teal-500  italic text-3xl hover:text-white'> Zelda</p>
                            <p className='mt-auto text-teal-500 not-italic font-thin'> sms</p>
                        </div>
                    </Link>
                    <div className='my-auto ml-auto mr-20 py-1 px-1'>
                        <WalletMultiButton/>
                    </div>
            </div>
        </div>
        </>
    );
};

const SideBarIcon = ({ icon, text = 'tooltip'}: any ) => (
    <Flex mb={10}>
        <div className= "sidebar-icon group">
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100">
                { text }
            </span>
        </div>
    </Flex>
)

export default SideBar;
