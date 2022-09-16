import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import Image from 'next/image'

interface pageProps{
    image:string,
    w:number, 
    h:number,  
    id:string,
    header:string,
    prev?: string,
    next?: string,
    setState: Dispatch<SetStateAction<string>>,
}


const PageScrollImage: React.FC<pageProps> = ({image, w, h, id, header, prev, next, setState}) => {

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

                <div className="w-full flex flex-col items-center pb-8 md:pb-24" id={id}>
                    <div className="space-y-8">
                        <p className="text-xl md:text-4xl font-extrabold text-white mb-16"> {header}</p>
                        <div className="flex flex-row space-x-4 md:space-x-16 items-center">
                            <div className="flex border-gradient shadow-lg shadow-purple-500/50">
                                <span className="h-full w-full">
                                    <Image 
                                    src= {image}
                                    loading="lazy" 
                                    placeholder="blur"
                                    blurDataURL={image}
                                    width={w} height={h} 
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                { setState ?
                    <HiChevronDown className="chevron motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setState(next!))}/>
                    :
                        <></>
                }

            </div>
        </React.Fragment>
    )
    
}

export default PageScrollImage