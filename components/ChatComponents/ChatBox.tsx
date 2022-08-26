import { useState } from "react";
import LoadingSpinner from "../UtilityComponents/LoadingSpinner";
import {ArrowForwardIcon} from '@chakra-ui/icons';
import { SubmitHandler, useForm } from "react-hook-form";

interface Input {
    input:string
  }

const ChatList = () => {
    const [ loading, setLoading ] = useState(false);

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
      } = useForm<Input>();

    const onSubmit: SubmitHandler<Input> = async ({input}) => {

      }

    if (loading){
        return (
            <>
            <div className='flex bg-gray-900 w-full h-full'> 
                <div className="flex items-center justify-center h-full w-full">
                    <LoadingSpinner sizeOf ={'small'}></LoadingSpinner>
                </div>
            </div>
            </>
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex bg-gray-900 w-full h-full'">
                <input className="flex p-1 text-white my-auto ml-6 w-4/6 h-3/5 bg-gray-800 cursor-pointer
                " {...register("input", {required: true, minLength: 1, maxLength:212})}>
                </input>
                {errors.input && (
                                <p className="absolute ml-6 text-[13px]  text-red-500">
                                    Please enter text.
                                </p>
                                )}
                <button className="mx-auto md:ml-5 my-auto
                bg-gray-800 p-1 px-4 text-bold md:text-md items-center justify-center 
                text-teal-500 font-mono transition-all cursor-pointer hover:scale-105 
                hover:text-black hover:bg-teal-500">
                    <ArrowForwardIcon/>
                </button>
            </form>

        </>
    );
};


export default ChatList;
