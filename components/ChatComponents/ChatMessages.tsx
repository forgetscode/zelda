import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import LoadingSpinner from "../UtilityComponents/LoadingSpinner";

interface Input {
    input:string
  }

const ChatMessages = () => {
    const [ loading, setLoading ] = useState(false);
    const [count, setCount] = useState(0);

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
      } = useForm<Input>();

    const onSubmit: SubmitHandler<Input> = async ({input}) => {
        console.log(input)
      }
    

    {/* Display if loading*/}
    if (loading){
        return (
            <>

            {/* Message Box*/}
            <div className='flex bg-gray-600 w-full h-full z-1'> 
                <div className="flex items-center justify-center mt-10 h-full w-full">
                    <LoadingSpinner sizeOf ={"large"}></LoadingSpinner>
                </div>
            </div>
            {/* End of Message Box*/}

            </>
        );
    }
    return (
        <>
        <div className="absolute h-full w-full -ml-16 -mt-16 flex flex-col">
            <div className = "pl-16 h-full w-full bg-gray-600">
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-row pl-[88px] p-6 bg-gray-900 w-full mx-auto'>
                <textarea className='relative p-2 bg-gray-800 w-full text-white focus:outline focus:outline-teal-500 
                transition-all resize scrollbar-hide' 
                {...register("input", {required: true, minLength: 1, maxLength:212})}
                onChange={e => setCount(e.target.value.length)}
                />
                <p className={`relative mt-1 right-10 top-30 text-xs ${ count< 213 ? "text-teal-500" : "text-red-500"} "`}>{count}/212</p>
                <button className=" h-13 w-12 -ml-6
                    bg-gray-800 p-1 px-5 text-bold mtext-md flex items-center justify-center 
                    text-teal-500 font-mono transition-all cursor-pointer 
                    hover:text-black hover:bg-teal-500">
                        <ArrowForwardIcon/>
                </button>
            </form>
        </div>
        </>
    );

};


export default ChatMessages;