import {
    HiMail,
    HiCloud, 
    HiOutlineQuestionMarkCircle, 
    HiRefresh, 
} from "react-icons/hi";
import React from 'react'
import Link from 'next/link';

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRecoilState } from 'recoil';
import { openChatState } from '../atoms/Atom';

const SideBar = () => {
    const [ chatBarState, setChatBarState] = useRecoilState(openChatState);
    return (
        <>
            <div className ="fixed top-0 left-0 h-screen w-16 
                            flex flex-col
                            bg-gray-900 text-white shadow-lg mt-16 z-50">
                <hr  className =" self-center w-12 border-gray-500"/>

                <Link href="/messages">
                    <a onClick={() => setChatBarState(true)}>
                        <SideBarIcon icon = {<HiMail className='h-7 w-7' />} text="Messages"/>
                    </a>
                </Link>
                <Link href="/airdrop">
                    <a>
                        <SideBarIcon icon = {<HiCloud className="h-7 w-7"/>} text="Airdrop"/>
                    </a>
                </Link>
                
                <Link href="/reclaim">
                    <a>
                        <SideBarIcon icon = {<HiRefresh className="h-7 w-7"/>} text="Reclaim"/>
                    </a>
                </Link>
                <hr  className ="self-center w-12 border-gray-500" />
                <Link href="/help">
                    <a>
                        <SideBarIcon icon = {<HiOutlineQuestionMarkCircle className='h-7 w-7'/>} text="Help"/>
                    </a>
                </Link>
                
            </div>

            <div className ="fixed top-0 h-16 w-screen 
                            flex flex-row
                            bg-gray-900 shadow-lg p-2 z-50">

                {/* Homepage button*/}
                <div className='group flex justify-center'>
                    <Link href="/">
                        <div className='text-teal-500 flex flex-row group'>

                            <div className='flex flex-row bg-gray-800 p-2 h-12 rounded-2xl hover:rounded-xl transition-all 
                                            duration-300 ease-linear cursor-pointer hover:scale-110 hover:bg-teal-600
                                            hover:text-white
                                            '>
                                <p className='my-auto italic text-xl'> Zelda</p>
                                <p className='mt-3 not-italic text-xs'> sms</p>
                            </div>

                            <span className="absolute flex items-center ml-11 mt-2 my-auto h-8 w-auto p-2 min-w-max left-14 rounded-md shadow-md
                                text-white bg-gray-900 
                                text-xs font-bold 
                                transition-all duration-100 scale-0 origin-left group-hover:scale-100">
                                Home
                            </span>
                        
                        </div>
                    </Link>
                </div>
                {/* End of Homepage button*/}

                {/* Wallet button*/}
                <div className='my-auto ml-auto'>
                <WalletMultiButton className='!bg-gray-800
                            hover:scale-110
                            !p-2
                            !text-sm
                            !text-teal-500 
                            !rounded-xl !hover:rounded-xl !hover:text-white !hover:bg-teal-600
                            !transition-all !duration-300 !ease-linear !h-12 
                            ' />
                </div>
                {/* End of Wallet button*/}
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
