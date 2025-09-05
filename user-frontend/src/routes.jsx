import Home from '@/views/pages/Home';
import Chat from './views/pages/Chat';
import AuthWrapper from './views/wrappers/AuthWrapper';
import ChatWrapper from './views/wrappers/ChatWrapper';
import NewChat from './views/pages/NewChat';
import ProfilePage from './views/pages/ProfilePage';
import ChatHistory from './views/pages/ChatHistory';

const allRoutesMapper = [
  {
    path: '/',
    component: <Home />,
  },
  {
    path: '/chat/:chatId',
    component: (
      <ChatWrapper>
        <Chat />
      </ChatWrapper>
    ),
  },

  {
    path: '/new-chat',
    component: (
      <AuthWrapper roles={['user']}>
        <NewChat />
      </AuthWrapper>
    ),
  },
  {
    path: '/chat-history',
    component: (
      <AuthWrapper roles={['user']}>
        <ChatHistory />
      </AuthWrapper>
    ),
  },
  {
    path: '/profile',
    component: <ProfilePage />,
  },
];

export default allRoutesMapper;
