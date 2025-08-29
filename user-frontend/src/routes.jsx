import Home from '@/views/pages/Home';
import Chat from './views/pages/Chat';
import AuthWrapper from './views/wrappers/AuthWrapper';
import ChatWrapper from './views/wrappers/ChatWrapper';

const allRoutesMapper = [
  {
    path: '/',
    component: <Home />,
  },
  {
    path: '/chat',
    component: (
      <ChatWrapper>
        <Chat />
      </ChatWrapper>
    ),
  },
];

export default allRoutesMapper;
