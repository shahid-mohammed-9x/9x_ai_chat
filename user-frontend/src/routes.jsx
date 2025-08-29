import Home from '@/views/pages/Home';
import Chat from './views/pages/Chat';
import AuthWrapper from './views/wrappers/AuthWrapper';
import ChatWrapper from './views/wrappers/ChatWrapper';
import Login from './views/pages/login';
import NewChat from './views/pages/NewChat';
const allRoutesMapper = [
  {
    path: '/',
    component: <Home />,
  },
  {
    path: '/login',
    component: <Login />,
  },
  {
    path: '/chat',
    component: (
      <ChatWrapper>
        <Chat />
      </ChatWrapper>
    ),
  },
  {
    path: '/new-chat',
    component: (
      <ChatWrapper>
        <NewChat />
      </ChatWrapper>
    ),
  },
];

export default allRoutesMapper;
