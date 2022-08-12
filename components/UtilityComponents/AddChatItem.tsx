import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from 'react';

const AddChatItem = () => {
    const [ formState, setFormState] = useState(false);
    

    if (formState) {
        return (
            <>
            <div className="flex flex-row w-full group z-1">
                <button className='p-2 w-full transition-all 
                                duration-300 ease-linear cursor-pointer
                                hover:text-white text-teal-500 
                                hover:bg-teal-600
                                text-2xl
                                flex items-center justify-center
                                ui-monospace
                                '
                        onClick={() => setFormState(true)}>
    
                        <AddIcon w={16} h={16}/>
                </button>
                <span className="absolute ml-2 left-48 md:left-64 md:ml-7 h-8 p-2 rounded-md shadow-md
                                  text-white bg-gray-900 
                                  text-xs font-bold 
                                  z-20
                                  transition-all duration-100 scale-0 origin-left group-hover:scale-100 ">
                                  Add Chat
                  </span>
            </div>

            <div className='-ml-16 -mt-16 absolute w-screen h-screen bg-gray-900 bg-opacity-70 z-40'>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                 bg-gray-900 flex p-6 pl-7 rounded-xl
                 '>
                    
                    <div className='flex flex-col'>
                        <p className='py-2 italic text-lg text-teal-500'>
                        Enter PublicKey
                        </p>
                        <div className='flex flex-row pt-2 '>
                            <input className="flex flex-row px-2 w-64 h-12 border-2 rounded-xl 
                                border-teal-500 
                                shadow-xl bg-gray-800
                                 text-white !focus:border-gray-900
                                transition-all duration-300 ease-linear cursor-pointer
                                ">
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

                </div>
            </div>

            </>
        );
    }

    return (
        <>
        <div className="flex flex-row w-full group z-1">
            <button className='p-2 w-full transition-all 
                            duration-300 ease-linear cursor-pointer
                            hover:text-white text-teal-500 
                            hover:bg-teal-600
                            text-2xl
                            flex items-center justify-center
                            ui-monospace
                            '
                    onClick={() => setFormState(true)}>

                    <AddIcon w={16} h={16}/>
            </button>
            <span className="absolute ml-2 left-48 md:left-64 md:ml-7 h-8 p-2 rounded-md shadow-md
                              text-white bg-gray-900 
                              text-xs font-bold 
                              z-20
                              transition-all duration-100 scale-0 origin-left group-hover:scale-100 ">
                              Add Chat
              </span>
        </div>
        </>
    );
};


export default AddChatItem;
