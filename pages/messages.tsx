import type { NextPage } from 'next'
import ChatBox from '../components/ChatComponents/ChatBox';
import ChatList from '../components/ChatComponents/ChatList';
import ChatMessages from '../components/ChatComponents/ChatMessages';
import ParticleBackground from '../components/ParticleBackground';


const Messages: NextPage = () => {
  return (
    <>                    
      <div className='w-full flex'>
        <div className="flex-row w-80 h-screen">
          <ChatList />
        </div>
        <div className="flex-row w-full h-screen">
          <div className='flex-col w-full h-full'>
            <div className = "h-5/6 w-full">
              <ChatMessages />
            </div>
            <div className = "h-1/6 w-full">
              <ChatBox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages