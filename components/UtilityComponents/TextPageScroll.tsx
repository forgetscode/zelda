import React, { Dispatch, SetStateAction } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import Image from 'next/image'

interface pageProps{
    id:string,
    text:string,
    header:string,
    prev?: string,
    next?: string,
    setState?: Dispatch<SetStateAction<string>>,
    variant?: string,
}

const TextPageScroll: React.FC<pageProps> = ({ id, text, header, prev, next, setState, variant}) => {

    if (!prev) {
        prev = String(Number(id) -1)
    }

    if (!next) {
        next = String(Number(id) + 1)
    }

    if (!variant) {
        return (
            <React.Fragment>
                <div className="h-screen flex flex-col space-y-8 md:space-y-24 items-center pt-36" id={id}>
                    { setState ?
                        <div className='absolute p-12 w-5/6 -mt-12 text-white opacity-0 hover:opacity-100 cursor-pointer'  onClick={()=>(setState(prev!))}>
                            <HiChevronUp className="flex chevron  w-full motion-safe:animate-bounce transition duration-700 ease-in-out"/>
                        </div>
                        :
                            <></>
                    }
                    <p className="flex justify-center text-4xl md:text-6xl font-extrabold text-white" > {header}</p>
                    <div className="flex flex-col space-y-6 md:space-y-24">
                            <p className="w-4/6 md:w-3/6 flex text-transparent bg-clip-text border-gradient-variant text-md md:text-xl mx-auto font-semibold text-wrap text-center">
                                {text}
                            </p>
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

    else if (variant == "rainbow") {
        return (
            <React.Fragment>
                <div className="h-screen flex flex-col space-y-8 md:space-y-24 items-center pt-36" id={id}>
                    { setState ?
                        <div className='absolute p-12 w-5/6 -mt-24 text-white opacity-0 hover:opacity-100 cursor-pointer'  onClick={()=>(setState(prev!))}>
                            <HiChevronUp className="flex chevron  w-full motion-safe:animate-bounce transition duration-700 ease-in-out"/>
                        </div>
                        :
                            <></>
                    }
                    <p className="flex justify-center text-4xl md:text-6xl font-extrabold text-white" > {header}</p>
                    <div className="flex flex-col space-y-6 md:space-y-24">
                            <p className="w-4/6 md:w-3/6 flex text-transparent bg-clip-text border-gradient text-md md:text-xl mx-auto font-semibold text-wrap text-center">
                                {text}
                            </p>
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

    else{
        return(<>No matching variant</>)
    }
}

export default TextPageScroll