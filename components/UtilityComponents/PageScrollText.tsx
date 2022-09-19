import React, { Dispatch, SetStateAction } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

interface pageProps{
    id:string,
    text:string,
    header:string,
    prev?: string,
    next?: string,
    setState: Dispatch<SetStateAction<string>>,
    variant?: string,
    down?: boolean,
    links?: boolean,
}

const PageScrollText: React.FC<pageProps> = ({ id, text, header, prev, next, setState, variant, down, links}) => {

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
                    <p className="flex justify-center text-4xl md:text-6xl font-extrabold text-white text-center" > {header}</p>
                    <div className="flex flex-col space-y-6 md:space-y-24">
                            <p className="w-4/6 md:w-3/6 flex text-transparent bg-clip-text bg-teal-500 text-sm sm:text-md md:text-xl mx-auto md:font-semibold text-wrap text-center">
                                {text}
                            </p>
                    </div>
                    { !down ?
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
                    <p className="flex justify-center text-4xl md:text-6xl font-extrabold text-white text-center" > {header}</p>
                    <div className="flex flex-col space-y-6 md:space-y-24">
                            <p className="w-4/6 md:w-3/6 flex text-transparent bg-clip-text border-gradient text-sm sm:text-md md:text-xl mx-auto md:font-semibold text-wrap text-center">
                                {text}
                            </p>
                    </div>
                    { !down ?
                        <HiChevronDown className="chevron motion-safe:animate-bounce transition duration-700 ease-in-out" onClick={()=>(setState(next!))}/>
                        :
                            <></>
                    }
                </div>
            </React.Fragment>
        )
    }

    else if (variant == "white") {
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
                    <p className="flex justify-center text-4xl md:text-6xl font-extrabold text-white text-center" > {header}</p>
                    <div className="flex flex-col space-y-6 md:space-y-24">
                            <p className="w-4/6 md:w-3/6 flex text-white text-sm sm:text-md md:text-xl mx-auto md:font-semibold text-wrap text-center">
                                {text}
                            </p>
                    </div>
                    {
                        links ?
                        <div className='flex flex-col items-center space-y-6'>
                            <p className='text-white font-bold text-2xl'>
                                References
                            </p>
                            <div className='flex flex-row items-center space-x-8'>
                                <a target="_blank" href="https://github.com/metaplex-foundation/metaplex-program-library/discussions/648" rel="noopener noreferrer">
                                    <div className=' bg-white p-3 text-black font-bold rounded-md transition-all hover:text-white hover:bg-[#141414]'>
                                        Cost Reference
                                    </div>
                                </a>
                                <a target="_blank" href="https://metaplex.notion.site/Compression-for-NFTs-Public-94f9faa25f034110b513414a11a85bbe" rel="noopener noreferrer">
                                    <div className=' bg-white p-3 text-black font-bold rounded-md transition-all hover:text-white hover:bg-[#141414]'>
                                        Compression
                                    </div>
                                </a>
                            </div>
                        </div>
                        :
                        <></>
                    }
                    { !down  ?
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

export default PageScrollText