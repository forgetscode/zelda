interface ChatInfo {
    ID: string
}

const ChatItem = (props:ChatInfo) => {
    
    return (
        <>
        <div className="flex flex-row w-full">
            <div className="h-12 w-12 md:w-24 truncate ...">
                {props.ID}
            </div>
            <div className="flex ml-auto pr-1">
                X
            </div>
        </div>
        </>
    );
};


export default ChatItem;
