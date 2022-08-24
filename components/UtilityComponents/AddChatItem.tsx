import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as sms from '../../utility/smsTools';
import { CreateWorkspace } from './CreateWorkspace';
import { PublicKey } from '@solana/web3.js'

interface Input {
    input:string
  }

const AddChatItem = () => {
    const [ formState, setFormState] = useState(false);
    const { publicKey, connected } = useWallet();
    const workspace = CreateWorkspace();

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
      } = useForm<Input>();

    const onSubmit: SubmitHandler<Input> = async ({input}) => {
        const receiver = await new PublicKey(input)
        const tx = await sms.initializeChatDynamic(publicKey!, receiver, workspace)
        console.log(tx)
      }
    
    if (formState) {
        return (
            <>
            <div className="group self-center text-teal-500 p-3 bg-gray-900 rounded-full border-teal-500 border 
            border-opacity-50 z-1 scale-75 hover:bg-teal-500 hover:text-white hober:border-white transition-all">
                <button 
                        onClick={() => setFormState(true)}>
                        <AddIcon w={22} h={16} className="-mt-1"/>
                </button>
                <span className="absolute ml-4 -mt-4 h-8 text-center pt-1 w-24 rounded-md shadow-md
                                text-white bg-gray-900  font-bold 
                                z-30
                                transition-all duration-100 scale-0 origin-left group-hover:scale-100 ">
                                Add Chat
                </span>
            </div>

            <div className='fixed -top-7 left-0 w-screen h-screen bg-gray-900 bg-opacity-80' >
                <div className='z-40 w-screen h-screen' onClick={() => setFormState(false)}></div>
                <form onSubmit={handleSubmit(onSubmit)} className='absolute top-1/4 lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                 bg-gray-900 flex p-6 pl-7 rounded-xl scale-75 md:scale-100 z-50'>
                    <div className='flex flex-col'>
                        <p className='py-2 italic text-lg text-teal-500'>
                        Enter PublicKey
                        </p>
                        {errors.input && (
                                <p className="p-1 text-[13px] font-light  text-red-500">
                                    Please enter a valid publickey.
                                </p>
                                )}
                        <div className='flex flex-row pt-2 '>
                            <input className="flex flex-row px-2 w-72 h-12 border-2 rounded-xl 
                                border-teal-500 
                                shadow-xl bg-gray-800
                                 text-white !focus:border-gray-900
                                transition-all duration-300 ease-linear cursor-pointer
                                " {...register("input", {required: true, minLength: 28})}>
                            </input>
                            <button className="h-12 w-20 p-2 ml-5 mt-auto flex-row rounded-lg transition-all
                                duration-300 ease-linear cursor-pointer
                                bg-teal-600
                                text-white hover:text-teal-500 
                                hover:bg-gray-900 hover:scale-105
                                "> 
                                Submit 
                            </button>
                        </div>
                    </div>

                    <button className="
                                flex flex-row text-white 
                                rounded-xl
                                hover:text-teal-500 cursor-pointer  transition-all duration-100
                                group
                                "
                            onClick={() => setFormState(false)}>
                        <CloseIcon w={16} h={16}/>
                        <span className="absolute ml-6 -mt-2 h-8 p-2 rounded-md shadow-md
                                    text-white bg-gray-900 
                                    text-xs font-bold 
                                    z-20
                                    transition-all duration-100 scale-0 origin-left group-hover:scale-100 ">
                                    Close
                    </span>
                    </button>

                </form>
            </div>

            </>
        );
    }

    return (
        <>
        <div className="group self-center text-teal-500 p-3 bg-gray-900 rounded-full border-teal-500 border 
        border-opacity-50 z-1 scale-75 hover:bg-teal-500 hover:text-white hober:border-white transition-all cursor-pointer"
        onClick={() => setFormState(true)}>
                    <AddIcon w={22} h={16} className="-mt-1"/>
            <span className="absolute ml-4 -mt-1 h-8 text-center pt-1 w-24 rounded-md shadow-md
                              text-white bg-gray-900  font-bold 
                              z-30
                              transition-all duration-100 scale-0 origin-left group-hover:scale-100 ">
                              Add Chat
              </span>
        </div>
        </>
    );
};


export default AddChatItem;
