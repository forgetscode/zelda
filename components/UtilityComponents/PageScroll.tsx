import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import Image from 'next/image'

interface sizes {
    w:number,
    h:number,
}

interface pageProps{
    image:string,
    size: sizes,   
    id:string,
    text:string,
    header:string,
    prev?: string,
    next?: string,
    setState: Dispatch<SetStateAction<string>>,
    extraText?: string,
}


const PageScroll: React.FC<pageProps> = ({image, size, id, text, header, prev, next, setState, extraText}) => {
    
    if (!prev) {
        prev = String(Number(id) -1)
    }

    if (!next) {
        next = String(Number(id) + 1)
    }

    return (
        <React.Fragment>
            <div className="mt-24 flex h-screen flex-col items-center space-y-8">

                { setState ?
                    <div className='absolute p-12 w-5/6 -mt-24 text-white opacity-0 hover:opacity-100 cursor-pointer'  onClick={()=>(setState(prev!))}>
                        <HiChevronUp className="flex chevron  w-full motion-safe:animate-bounce transition duration-700 ease-in-out"/>
                    </div>
                    :
                        <></>
                }

                <div className="w-full flex flex-col items-center pb-8 " id={id}>
                    <div className="space-y-8">
                        <p className="text-xl md:text-4xl font-extrabold text-white mb-16"> {header}</p>
                        <div className="flex flex-row space-x-4 md:space-x-16 items-center">
                            <div className="flex border-gradient-inverse shadow-lg shadow-purple-600/50">
                                <span className="h-full w-full">
                                    <Image 
                                    src= {image}
                                    loading="lazy" 
                                    placeholder="blur"
                                    blurDataURL={image}
                                    width={size.w} height={size.h} 
                                    />
                                </span>
                            </div>
                            <div className="space-y-3 pr-4 flex max-w-[400px]">
                                <p className="rounded text-white p-2 md:p-3 border-gradient text-xs md:text-lg font-semibold mx-auto text-center shadow-md shadow-sky-700/50 animate-text">
                                    {text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                { extraText ?
                    <p className=" -translate-16 text-white text-lg mx-auto text-center font-bold">
                        {extraText}
                    </p>
                    :
                    <div className='md:pb-16'/>
                }
                { setState ?
                    <HiChevronDown className="chevron motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setState(next!))}/>
                    :
                        <></>
                }

            </div>
        </React.Fragment>
    )
}

export default PageScroll