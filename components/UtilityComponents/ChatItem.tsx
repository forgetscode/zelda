import { CloseIcon, ChatIcon, CopyIcon } from '@chakra-ui/icons';


interface ChatInfo {
    ID: string
}

const ChatItem = (props:ChatInfo) => {
    
    return (
        <>
        <div className="flex flex-row w-full pl-1 mt-1 h-12 text-center">

            <div className='mt-3 flex flex-row items-center justify-center rounded-3xl bg-gray-900 h-8 w-8 text-white
                            hover:scale-110 hover:bg-teal-600 transition-all duration-100 cursor-pointer group'>
            <CopyIcon></CopyIcon>
            <span className="absolute left-9 h-8 p-2 rounded-md shadow-md
                              text-white bg-gray-900 
                              text-xs font-bold 
                              z-20
                              transition-all duration-100 scale-0 origin-left group-hover:scale-100 ">
                              Copy
              </span>
            </div>

            <div className="
                        ml-1 mt-2 w-12 text-sm md:w-36 truncate ... 
                        rounded-xl p-2
                        text-teal-500 cursor-pointer transition-all duration-100 hover:bg-gray-900">
                {props.ID}
            </div>

            <div className="
                        flex flex-row ml-3 mt-6 pr-3 text-white 
                        rounded-xl
                        hover:text-teal-500 cursor-pointer  transition-all duration-100
                        group
                        ">
                <CloseIcon w={8} h={8}/>
                <span className="absolute ml-4 -mt-3 h-8 p-2 rounded-md shadow-md
                              text-white bg-gray-900 
                              text-xs font-bold 
                              z-20
                              transition-all duration-100 scale-0 origin-left group-hover:scale-100 ">
                              Delete
              </span>
            </div>

        </div>
        </>
    );
};


export default ChatItem;
