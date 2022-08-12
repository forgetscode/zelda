import { AddIcon } from '@chakra-ui/icons';

const AddChatItem = () => {
    
    return (
        <>
        <div className="flex flex-row w-full group z-1">
            <div className='p-2 w-full transition-all 
                            duration-300 ease-linear cursor-pointer
                            hover:text-white text-teal-500 
                            hover:bg-teal-600
                            text-2xl
                            flex items-center justify-center
                            ui-monospace
                            '>
                    <AddIcon w={16} h={16}/>
            </div>
            <span className="absolute -mt-1 ml-2 left-48 md:left-64 md:ml-7 h-8 p-2 rounded-md shadow-md
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
