import React from 'react'
import { HiChevronDown } from 'react-icons/hi'
import Image from 'next/image'

interface pageProps{
    image:string,
    w:number, 
    h:number,  
    id:string,
    text:string,
    header:string,
}

function PageScroll({image, w, h, id, text, header}:pageProps) {
  return (
    <div className="w-full flex flex-col items-center pb-32" id={id}>
        <div className="space-y-8">
            <p className="text-xl md:text-4xl font-extrabold text-white mb-16"> {header}</p>
            <div className="flex flex-row space-x-4 md:space-x-16 items-center">
                <div className="flex border-gradient-inverse">
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
                <div className="space-y-3 pr-4 flex max-w-[400px]">
                    <p className="text-transparent bg-clip-text border-gradient-variant2 text-xs md:text-sm lg:text-lg mx-auto text-center">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PageScroll