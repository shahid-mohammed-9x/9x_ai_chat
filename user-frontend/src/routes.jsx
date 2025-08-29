import Home from '@/views/pages/Home';
import ChatLayout from './views/layouts/ChatLayout';
import AuthWrapper from './views/layouts/AuthWrapper';

const allRoutesMapper = [
  {
    path: '/',
    component: <Home />,
  },
  {
    path: '/chat',
    component: (
      <AuthWrapper roles={['user']}>
        <ChatLayout />
      </AuthWrapper>
    ),
  },
];

export default allRoutesMapper;
