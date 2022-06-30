import { EmailIcon,
         MoonIcon,
         QuestionIcon,
         Search2Icon,
         SettingsIcon } from '@chakra-ui/icons';
import { Icon, Flex } from '@chakra-ui/react';
import { BiHome } from "react-icons/bi";
import React from 'react'
import Link from 'next/link';

const SideBar = () => {
    return (
        <div className ="fixed top-0 left-0 h-screen w-16 m-0
                        flex flex-col
                        bg-gray-900 text-white shadow-lg">
            <Link href="/">
                <a>
                    <SideBarIcon icon = {<Icon  as = {BiHome} boxSize={28}/>} text="Home"/>
                </a>
            </Link>
            <hr  className ="self-center w-12 border-gray-600"/>
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
