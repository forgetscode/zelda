import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import Image from 'next/image'
import Link from 'next/link'

interface pageProps{
    image:string,
    w:number, 
    h:number,  
    id:string,
    link:string,
    text?:string,
    header:string,
    prev?: string,
    next?: string,
    setState?: Dispatch<SetStateAction<string>>,
}


const PageScrollLink: React.FC<pageProps> = ({image, w, h, id, link, text, header, prev, next, setState}) => {

    if (!prev) {
        prev = String(Number(id) -1)
    }

    if (!next) {
        next = String(Number(id) + 1)
    }

    return (
        <React.Fragment>
            <div className="mt-24 flex h-screen flex-col items-center space-y-8 pt-8">

                { setState ?
                    <div className='absolute p-12 w-5/6 -mt-24 text-white opacity-0 hover:opacity-100 cursor-pointer'  onClick={()=>(setState(prev!))}>
                        <HiChevronUp className="flex chevron mt-16 w-full motion-safe:animate-bounce transition duration-700 ease-in-out"/>
                    </div>
                    : <></>
                }

                <div className="w-full flex flex-col items-center pb-8 md:pb-24" id={id}>
                    <div className="space-y-8">
                        <p className="text-xl md:text-4xl font-extrabold text-white mb-16"> {header}</p>
                        <div className="flex flex-row space-x-4 md:space-x-16 items-center">
                            <div className="flex border-gradient shadow-lg shadow-purple-500/50">
                                <span className="h-full w-full">
                                    <Image 
                                    src={image}
                                    loading="lazy" 
                                    placeholder="blur"
                                    blurDataURL={image}
                                    width={w} height={h} 
                                    />
                                </span>
                            </div>
                            <div className="flex flex-col justify-center space-y-3  pr-4">
                                <span className="flex flex-row items-end"> 
                                    <header className=" text-white text-xl sm:text-3xl md:text-5xl font-bold">
                                        Click
                                    </header>
                                    <Link href={link}>
                                        <a target="_blank">
                                            <p className="text-purple-500 text-xl md:text-4xl  underline cursor-pointer
                                                            hover:bg-emerald-500 hover:text-black transition-all rounded ml-2">
                                                Here
                                            </p>
                                        </a>
                                    </Link>
                                </span>
                                { 
                                    text ? 
                                    <p className="flex border-gradient text-white p-2 font-bold text-xs md:text-lg mx-auto text-wrap animate-text ">
                                        {text}
                                    </p>
                                    :
                                    <p></p>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                { setState ?
                <HiChevronDown className="chevron motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setState(next!))}/>
                    : <></>
                }

            </div>
        </React.Fragment>
    )
}

export default PageScrollLink