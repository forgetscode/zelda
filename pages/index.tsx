import type { NextPage } from 'next'
import Head from 'next/head';
import Link from 'next/link';
import ParticleBackground from '../components/UtilityComponents/ParticleBackground';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Zelda</title>
        <link rel='icon' href="https://icon-library.com/images/mms-icon/mms-icon-17.jpg"/>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="flex flex-col justify-center items-center h-screen ml-16">
        <div className='scale-75 md:scale-100'>
          <div className='flex justify-center'>
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
                                pointer-events-auto
                                transition-all duration-100 scale-0 origin-left group-hover:scale-100">
                                Github
                  </span>
          
                </div>
              </a>
            </Link>
          </div>
          <p className='mt-8 lg:text-3xl md:text-2xl sm:text-xl text-white font-bold'>Serverless On-chain messaging protocol on Solana</p>
        </div>
      </div>
    
      <ParticleBackground/> 

    </>
  );
}

export default Index

