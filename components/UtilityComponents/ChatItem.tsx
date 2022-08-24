import { CloseIcon, CopyIcon } from '@chakra-ui/icons';

interface ChatInfo {
    ID: string
}

const ChatItem = (props:ChatInfo) => {
    
    return (
        <>
        <div className="flex flex-row self-center items-center w-5/6 p-2 mt-1 h-12 text-center space-x-1
        rounded-xl text-teal-500  bg-gray-900 hover:bg-teal-600 transition-all hover:text-white justify-between">
            <CopyIcon w={14} h={14} className='cursor-pointer hover:scale-110 hover:text-black'
            onClick={() => {navigator.clipboard.writeText(props.ID)}}/>
            <div className="
                        w-12 text-sm md:w-36 truncate ... 
                        rounded-xl p-1
                        cursor-pointer">
                {props.ID}
            </div>
            <div className="
                        top-1/2 translate-y-1/2 flex flex-row
                        rounded-xl
                        hover:text-black cursor-pointer 
                        group pl-2
                        ">
                <CloseIcon w={8} h={8}/>
                <span className="absolute ml-4 -mt-3 h-8 p-2 rounded-md shadow-md
                              text-white bg-gray-900 
                              text-xs font-bold z-auto
                              transition-all duration-100 scale-0 origin-left group-hover:scale-100 ">
                              Delete
              </span>
            </div>

        </div>
        </>
    );
};


export default ChatItem;
