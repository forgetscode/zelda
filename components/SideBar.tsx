import { EmailIcon,
         MoonIcon,
         QuestionIcon,
         Search2Icon,
         SettingsIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import React from 'react'
import Link from 'next/link';

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const SideBar = () => {
    return (
        <>
        <div className ="fixed top-0 left-0 h-screen w-16 m-0
                        flex flex-col
                        bg-gray-900 text-white shadow-lg mt-20">
            <hr  className ="w-[%100] border-gray-600"/>
            <Link href="/messages">
                <a>
                    <SideBarIcon icon = {<EmailIcon boxSize={26}/>} text="Messages"/>
                </a>
            </Link>
            <SideBarIcon icon = {<QuestionIcon boxSize={26}/>} text="Help"/>
            <SideBarIcon icon = {<Search2Icon boxSize={26}/>} text="Search"/>
            <SideBarIcon icon = {<MoonIcon boxSize={26}/>} text="Moon"/>
            <hr  className ="self-center w-12 border-gray-600" />
            <SideBarIcon icon = {<SettingsIcon boxSize={26}/>} text="Settings"/>
        </div>
            <div className='flex flex-col'>
                <div className ="fixed top-0 h-20 w-screen m-0
                                flex flex-row
                                bg-gray-900 shadow-lg p-2">
                    <Link href="/">
                        <div className=' ml-1 p-2 flex flex-row my-auto bg-gray-700 hover:bg-teal-600
                                hover:scale-110
                                text-teal-500 
                                hover:text-white
                                rounded-3xl hover:rounded-xl
                                transition-all duration-300 ease-linear
                                cursor-pointer'>
                            <p className=' italic text-3xl'> Zelda</p>
                            <p className='mt-auto not-italic font-thin'> sms</p>
                        </div>
                    </Link>
                    <div className='my-auto ml-auto py-1 px-1 mr-5'>
                        <WalletMultiButton/>
                    </div>
            </div>
        </div>
        </>
    );
};

const SideBarIcon = ({ icon, text = 'tooltip'}: any ) => (
    <div className='mb-1'>
        <div className= "sidebar-icon group">
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100">
                { text }
            </span>
        </div>
    </div>
)

export default SideBar;
