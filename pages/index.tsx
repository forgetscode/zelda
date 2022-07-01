import type { NextPage } from 'next'
import Link from 'next/link';
import ParticleBackground from '../components/ParticleBackground';

const Index: NextPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen scale-75  md:scale-100">
        <Link href="https://github.com/forgetscode/zelda">
          <a target="_blank">
              <div className='text-teal-500 flex flex-row group'>
                <div className='flex flex-row bg-gray-900 p-4  rounded-xl transition-all 
                                duration-300 ease-linear cursor-pointer hover:scale-110 hover:bg-teal-600
                              hover:text-white
                              '>
                  <p className='italic text-4xl'> Zelda</p>
                  <p className='mt-auto not-italic text-sm'> sms</p>
                </div>
                <span className="flex items-center ml-3 my-auto h-8 w-auto p-2 min-w-max left-14 rounded-md shadow-md
                              text-white bg-gray-900 
                              text-xs font-bold 
                              transition-all duration-100 scale-0 origin-left group-hover:scale-100">
                              Code
                </span>
              </div>
            </a>
          </Link>
        <p className='mt-8 text-3xl text-white font-bold'>Serverless On-chain messaging protocol on Solana</p>
      </div>
      <ParticleBackground/>
    </>
  );
}

export default Index

